"""
Customer Schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    total_orders: int
    total_spent: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_order_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

