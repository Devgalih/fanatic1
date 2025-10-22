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

class SubcategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image: Optional[str] = None
    category_id: int

class SubcategoryCreate(SubcategoryBase):
    pass

class Subcategory(SubcategoryBase):
    id: int
    is_active: bool
    created_at: datetime
    category: Optional[Category] = None
    
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
    short_description: Optional[str] = None
    
    # Pricing
    price: float
    original_price: Optional[float] = None
    discount: float = 0
    wholesale_price: Optional[float] = None
    cost_price: Optional[float] = None
    
    # Stock & Inventory
    stock: int = 0
    min_stock: int = 0
    sku: Optional[str] = None
    barcode: Optional[str] = None
    
    # Category & Subcategory
    category_id: Optional[int] = None
    subcategory_id: Optional[int] = None
    
    # Media
    thumbnail: Optional[str] = None
    video_url: Optional[str] = None
    
    # Product Info
    brand: Optional[str] = None
    model: Optional[str] = None
    release_tag: Optional[str] = None
    
    # Product Variations
    has_variations: bool = False
    
    # Shipping Info
    weight: Optional[float] = None
    length: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    
    # SEO
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    
    # Additional Info
    certification: Optional[str] = None
    brand_registration: Optional[str] = None
    is_preorder: bool = False
    preorder_date: Optional[datetime] = None
    
    # Status
    is_featured: bool = False
    is_new_arrival: bool = False
    is_draft: bool = False

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

class ProductVariationBase(BaseModel):
    name: str
    type: str
    sku: Optional[str] = None
    price: Optional[float] = None
    stock: int = 0
    image_url: Optional[str] = None

class ProductVariationCreate(ProductVariationBase):
    pass

class ProductVariation(ProductVariationBase):
    id: int
    product_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductList(BaseModel):
    items: List[Product]
    total: int
    page: int
    page_size: int
    pages: int

