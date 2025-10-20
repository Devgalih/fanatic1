"""
Order Schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    order_id: int
    product_name: str
    product_price: float
    subtotal: float
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    shipping_address: str
    shipping_city: str
    shipping_province: str
    shipping_postal_code: Optional[str] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    notes: Optional[str] = None

class Order(OrderBase):
    id: int
    order_number: str
    subtotal: float
    shipping_cost: float
    tax: float
    discount: float
    total: float
    status: str
    payment_status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    items: List[OrderItem] = []
    
    class Config:
        from_attributes = True

class OrderList(BaseModel):
    items: List[Order]
    total: int
    page: int
    page_size: int
    pages: int

