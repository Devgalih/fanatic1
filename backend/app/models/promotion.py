"""
Promotion Model - untuk discount codes, promo banners, dll
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, Enum
from sqlalchemy.sql import func
import enum
from app.core.database import Base

class PromotionType(str, enum.Enum):
    PERCENTAGE = "percentage"
    FIXED_AMOUNT = "fixed_amount"
    FREE_SHIPPING = "free_shipping"

class Promotion(Base):
    __tablename__ = "promotions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    
    # Discount
    type = Column(Enum(PromotionType), nullable=False)
    value = Column(Float, nullable=False)  # percentage or fixed amount
    
    # Usage limits
    max_uses = Column(Integer)
    current_uses = Column(Integer, default=0)
    max_uses_per_customer = Column(Integer, default=1)
    
    # Conditions
    min_purchase = Column(Float, default=0)
    
    # Status & Dates
    is_active = Column(Boolean, default=True)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Promotion {self.code}>"

