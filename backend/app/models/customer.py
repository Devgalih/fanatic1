"""
Customer Model - untuk tracking pelanggan
"""
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String)
    address = Column(Text)
    city = Column(String)
    province = Column(String)
    postal_code = Column(String)
    
    # Stats
    total_orders = Column(Integer, default=0)
    total_spent = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_order_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<Customer {self.name}>"

