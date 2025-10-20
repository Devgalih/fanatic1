# Dark Chic Emporium Backend API

Backend API untuk Dark Chic Emporium E-commerce menggunakan FastAPI.

## 🚀 Features

- ✅ **FastAPI** - Modern, fast Python web framework
- ✅ **SQLAlchemy** - ORM untuk database management
- ✅ **JWT Authentication** - Secure authentication system
- ✅ **RESTful API** - Standard REST endpoints
- ✅ **Pydantic** - Data validation
- ✅ **CORS** - Cross-Origin Resource Sharing enabled
- ✅ **Auto Documentation** - Swagger UI & ReDoc

## 📋 Requirements

- Python 3.8+
- pip

## 🛠️ Installation

### 1. Clone repository
```bash
git clone <your-repo-url>
cd dark-chic-emporium-1/backend
```

### 2. Create virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Setup environment variables
```bash
# Copy .env.example to .env
copy .env.example .env  # Windows
# atau
cp .env.example .env    # Linux/Mac

# Edit .env dan sesuaikan konfigurasi
```

### 5. Create database folder
```bash
mkdir database
mkdir uploads
```

### 6. Run the application
```bash
# Development mode (dengan auto-reload)
python -m app.main

# atau gunakan uvicorn directly
uvicorn app.main:app --reload --port 8000
```

Server akan berjalan di `http://localhost:8000`

## 📚 API Documentation

Setelah server berjalan, buka:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user baru
- `POST /api/v1/auth/login` - Login dan dapatkan token
- `GET /api/v1/auth/me` - Get current user info

### Products
- `GET /api/v1/products/` - Get all products (dengan filtering & pagination)
- `GET /api/v1/products/{id}` - Get product by ID
- `GET /api/v1/products/slug/{slug}` - Get product by slug
- `POST /api/v1/products/` - Create product (Admin only)
- `PUT /api/v1/products/{id}` - Update product (Admin only)
- `DELETE /api/v1/products/{id}` - Delete product (Admin only)

### Categories
- `GET /api/v1/products/categories` - Get all categories
- `POST /api/v1/products/categories` - Create category (Admin only)

### Orders
- `GET /api/v1/orders/` - Get all orders
- `GET /api/v1/orders/{id}` - Get order by ID
- `GET /api/v1/orders/number/{order_number}` - Get order by number
- `POST /api/v1/orders/` - Create new order
- `PUT /api/v1/orders/{id}` - Update order status (Admin only)
- `DELETE /api/v1/orders/{id}` - Cancel order

### Customers
- `GET /api/v1/customers/` - Get all customers
- `GET /api/v1/customers/{id}` - Get customer by ID
- `POST /api/v1/customers/` - Create customer

### Analytics (Admin only)
- `GET /api/v1/analytics/dashboard` - Get dashboard statistics
- `GET /api/v1/analytics/sales-chart` - Get sales chart data
- `GET /api/v1/analytics/top-products` - Get top selling products
- `GET /api/v1/analytics/recent-orders` - Get recent orders

### Promotions
- `GET /api/v1/promotions/` - Get all promotions
- `GET /api/v1/promotions/{id}` - Get promotion by ID
- `GET /api/v1/promotions/code/{code}` - Validate promo code
- `POST /api/v1/promotions/` - Create promotion (Admin only)
- `PUT /api/v1/promotions/{id}` - Update promotion (Admin only)
- `DELETE /api/v1/promotions/{id}` - Delete promotion (Admin only)

## 🗄️ Database Models

### User
- Authentication & Admin users

### Product
- Product information
- Category
- Images
- Stock management

### Order
- Order details
- Order items
- Status tracking
- Payment tracking

### Customer
- Customer information
- Order history

### Promotion
- Discount codes
- Usage tracking

## 🔐 Authentication

API menggunakan JWT (JSON Web Token) untuk authentication.

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Menggunakan Token
```bash
GET /api/v1/auth/me
Authorization: Bearer <your-access-token>
```

## 📦 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── orders.py
│   │   │   ├── customers.py
│   │   │   ├── analytics.py
│   │   │   └── promotions.py
│   │   └── api.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── customer.py
│   │   └── promotion.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── customer.py
│   │   └── promotion.py
│   └── main.py
├── database/
├── uploads/
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## 🚢 Deployment

### Production Settings

1. Ubah `DEBUG=False` di `.env`
2. Generate secret key yang kuat
3. Gunakan production database (PostgreSQL/MySQL)
4. Setup HTTPS
5. Configure CORS origins

### Run in Production

```bash
# Gunakan production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker (Optional)

```bash
# Build image
docker build -t darkchic-api .

# Run container
docker run -d -p 8000:8000 darkchic-api
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Dark Chic Emporium Team

## 🙏 Acknowledgments

- FastAPI
- SQLAlchemy
- Pydantic
- uvicorn

---

**Happy Coding!** 🎉

