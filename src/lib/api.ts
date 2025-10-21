// API Configuration and HTTP Client
// ====================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    is_admin: boolean;
  };
}

// HTTP Client
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.detail || 'An error occurred',
        };
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);

// API Service Methods
// ===================

// Auth
export const authApi = {
  login: async (credentials: LoginRequest) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  adminLogin: async (credentials: AdminLoginRequest): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  me: () => api.get<LoginResponse['user']>('/auth/me'),
  
  logout: () => {
    api.clearToken();
    localStorage.removeItem('user');
  },
};

// Products
export const productsApi = {
  getAll: (params?: { category?: string; release_tag?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.release_tag) queryParams.append('release_tag', params.release_tag);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return api.get(`/products${query ? `?${query}` : ''}`);
  },

  getById: (id: number) => api.get(`/products/${id}`),

  create: (product: any) => api.post('/products', product),

  update: (id: number, product: any) => api.put(`/products/${id}`, product),

  delete: (id: number) => api.delete(`/products/${id}`),
};

// Orders
export const ordersApi = {
  getAll: (params?: { status?: string; payment_status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.payment_status) queryParams.append('payment_status', params.payment_status);
    
    const query = queryParams.toString();
    return api.get(`/orders${query ? `?${query}` : ''}`);
  },

  getById: (id: number) => api.get(`/orders/${id}`),

  create: (order: any) => api.post('/orders', order),

  update: (id: number, order: any) => api.put(`/orders/${id}`, order),

  updateStatus: (id: number, status: string) => 
    api.put(`/orders/${id}/status`, { status }),
};

// Customers
export const customersApi = {
  getAll: () => api.get('/customers'),

  getById: (id: number) => api.get(`/customers/${id}`),

  getStats: () => api.get('/customers/stats'),
};

// Promotions
export const promotionsApi = {
  getAll: () => api.get('/promotions'),

  getById: (id: number) => api.get(`/promotions/${id}`),

  create: (promotion: any) => api.post('/promotions', promotion),

  update: (id: number, promotion: any) => api.put(`/promotions/${id}`, promotion),

  delete: (id: number) => api.delete(`/promotions/${id}`),

  validate: (code: string) => api.post('/promotions/validate', { code }),
};

// Analytics Types
export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
  pending_orders: number;
  orders_this_month: number;
  revenue_this_month: number;
}

export interface TopProduct {
  id: number;
  name: string;
  price: string;
  thumbnail: string | null;
  total_sold: number;
  total_revenue: number;
}

export interface RecentOrder {
  id: number;
  tracking_number: string;
  customer_name: string;
  total: string;
  status: string;
  payment_status: string;
  created_at: string;
}

// Analytics
export const analyticsApi = {
  getDashboard: () => api.get<DashboardStats>('/analytics/dashboard'),

  getSales: (params?: { start_date?: string; end_date?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    
    const query = queryParams.toString();
    return api.get(`/analytics/sales${query ? `?${query}` : ''}`);
  },

  getProducts: () => api.get('/analytics/products'),
  
  getTopProducts: (limit: number = 10) => api.get<TopProduct[]>(`/analytics/top-products?limit=${limit}`),
  
  getRecentOrders: (limit: number = 10) => api.get<RecentOrder[]>(`/analytics/recent-orders?limit=${limit}`),
  
  getSalesChart: (days: number = 30) => api.get(`/analytics/sales-chart?days=${days}`),
};

// Categories
export const categoriesApi = {
  getAll: () => api.get('/categories'),

  getById: (id: number) => api.get(`/categories/${id}`),
};

export default api;

