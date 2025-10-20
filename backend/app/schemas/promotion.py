"""
Promotion Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PromotionBase(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    type: str  # percentage, fixed_amount, free_shipping
    value: float
    max_uses: Optional[int] = None
    max_uses_per_customer: int = 1
    min_purchase: float = 0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class PromotionCreate(PromotionBase):
    pass

class Promotion(PromotionBase):
    id: int
    current_uses: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

