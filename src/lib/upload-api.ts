/**
 * Image Upload API Service
 * Handles all image upload operations for admin dashboard
 */

import { API_CONFIG } from '@/config/api.config';

export interface UploadResponse {
  message: string;
  filename: string;
  urls: {
    original: string;
    medium: string;
    thumbnail: string;
  };
  uploaded_at: string;
}

export interface ImageInfo {
  filename: string;
  urls: {
    original: string;
    medium: string;
    thumbnail: string;
  };
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
  mode: string;
  created_at: string;
}

export interface ImageListResponse {
  total: number;
  files: ImageInfo[];
  page: number;
  page_size: number;
}

class UploadAPI {
  private baseURL = API_CONFIG.baseURL;
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private getFormHeaders() {
    const headers: Record<string, string> = {};

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Upload single image
   */
  async uploadImage(file: File, createThumbnail: boolean = true): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('create_thumbnail', createThumbnail.toString());

    const response = await fetch(`${this.baseURL}/upload/image`, {
      method: 'POST',
      headers: this.getFormHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(files: File[]): Promise<{
    message: string;
    uploaded: Array<{
      original_filename: string;
      urls: {
        original: string;
        medium: string;
        thumbnail: string;
      };
    }>;
    errors: Array<{
      filename: string;
      error: string;
    }>;
    uploaded_at: string;
  }> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${this.baseURL}/upload/images/multiple`, {
      method: 'POST',
      headers: this.getFormHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  }

  /**
   * Get list of uploaded images
   */
  async getImageList(skip: number = 0, limit: number = 50): Promise<ImageListResponse> {
    const response = await fetch(
      `${this.baseURL}/upload/images/list?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch images');
    }

    return response.json();
  }

  /**
   * Get image information
   */
  async getImageInfo(filename: string): Promise<ImageInfo> {
    const response = await fetch(`${this.baseURL}/upload/image/info/${filename}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch image info');
    }

    return response.json();
  }

  /**
   * Delete image
   */
  async deleteImage(filename: string): Promise<{
    message: string;
    filename: string;
    deleted_versions: string[];
    errors: Array<{
      size: string;
      error: string;
    }> | null;
  }> {
    const response = await fetch(`${this.baseURL}/upload/image/${filename}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete image');
    }

    return response.json();
  }

  /**
   * Get full image URL
   */
  getImageURL(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseURL.replace('/api/v1', '')}/${cleanPath}`;
  }
}

// Export singleton instance
export const uploadAPI = new UploadAPI();
export default uploadAPI;
