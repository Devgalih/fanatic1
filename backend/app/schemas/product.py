"""
Product Schemas
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductImageBase(BaseModel):
    image_url: str
    is_primary: bool = False

class ProductImage(ProductImageBase):
    id: int
    product_id: int
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    discount: float = 0
    stock: int = 0
    sku: Optional[str] = None
    category_id: Optional[int] = None
    thumbnail: Optional[str] = None
    brand: Optional[str] = None
    release_tag: Optional[str] = None
    is_featured: bool = False
    is_new_arrival: bool = False

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    discount: Optional[float] = None
    stock: Optional[int] = None
    category_id: Optional[int] = None
    thumbnail: Optional[str] = None
    brand: Optional[str] = None
    release_tag: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None

class Product(ProductBase):
    id: int
    rating: float
    reviews_count: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[Category] = None
    images: List[ProductImage] = []
    
    class Config:
        from_attributes = True

class ProductList(BaseModel):
    items: List[Product]
    total: int
    page: int
    page_size: int
    pages: int

