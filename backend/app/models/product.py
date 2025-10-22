"""
Product Models - Product, Category, ProductImage
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    image = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    products = relationship("Product", back_populates="category")
    subcategories = relationship("Subcategory", back_populates="category")
    
    def __repr__(self):
        return f"<Category {self.name}>"

class Subcategory(Base):
    __tablename__ = "subcategories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    image = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    category = relationship("Category", back_populates="subcategories")
    products = relationship("Product", back_populates="subcategory")
    
    def __repr__(self):
        return f"<Subcategory {self.name}>"

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    short_description = Column(Text)  # Deskripsi singkat untuk listing
    
    # Pricing
    price = Column(Float, nullable=False)
    original_price = Column(Float)  # Harga asli sebelum diskon
    discount = Column(Float, default=0)  # Persentase diskon
    wholesale_price = Column(Float)  # Harga grosir
    cost_price = Column(Float)  # Harga pokok penjualan
    
    # Stock & Inventory
    stock = Column(Integer, default=0)
    min_stock = Column(Integer, default=0)  # Stok minimum
    sku = Column(String, unique=True, index=True)
    barcode = Column(String)  # Barcode produk
    
    # Category & Subcategory
    category_id = Column(Integer, ForeignKey("categories.id"))
    subcategory_id = Column(Integer, ForeignKey("subcategories.id"), nullable=True)
    
    # Media
    thumbnail = Column(String)  # Gambar utama
    video_url = Column(String)  # URL video produk
    
    # Product Info
    brand = Column(String)
    model = Column(String)  # Model produk
    rating = Column(Float, default=0)
    reviews_count = Column(Integer, default=0)
    release_tag = Column(String, index=True)  # e.g., "vol 1", "vol 2", "vol 3"
    
    # Product Variations
    has_variations = Column(Boolean, default=False)  # Apakah produk memiliki variasi
    
    # Shipping Info
    weight = Column(Float)  # Berat dalam gram
    length = Column(Float)  # Panjang dalam cm
    width = Column(Float)   # Lebar dalam cm
    height = Column(Float)  # Tinggi dalam cm
    
    # SEO
    meta_title = Column(String)  # Meta title untuk SEO
    meta_description = Column(Text)  # Meta description untuk SEO
    meta_keywords = Column(String)  # Keywords untuk SEO
    
    # Additional Info
    certification = Column(String)  # Sertifikasi (TKDN, SNI, dll)
    brand_registration = Column(String)  # Nomor pendaftaran merek
    is_preorder = Column(Boolean, default=False)  # Apakah pre-order
    preorder_date = Column(DateTime)  # Tanggal pre-order
    
    # Status
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    is_new_arrival = Column(Boolean, default=False)
    is_draft = Column(Boolean, default=False)  # Status draft
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    category = relationship("Category", back_populates="products")
    subcategory = relationship("Subcategory", back_populates="products")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    variations = relationship("ProductVariation", back_populates="product", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="product")
    
    def __repr__(self):
        return f"<Product {self.name}>"

class ProductImage(Base):
    __tablename__ = "product_images"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    image_url = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    product = relationship("Product", back_populates="images")
    
    def __repr__(self):
        return f"<ProductImage {self.id} for Product {self.product_id}>"

class ProductVariation(Base):
    __tablename__ = "product_variations"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    name = Column(String, nullable=False)  # e.g., "Red", "Large", "XL"
    type = Column(String, nullable=False)  # e.g., "color", "size", "style"
    sku = Column(String, unique=True, index=True)
    price = Column(Float)  # Harga khusus untuk variasi ini
    stock = Column(Integer, default=0)
    image_url = Column(String)  # Gambar khusus untuk variasi
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    product = relationship("Product", back_populates="variations")
    
    def __repr__(self):
        return f"<ProductVariation {self.name} for Product {self.product_id}>"

