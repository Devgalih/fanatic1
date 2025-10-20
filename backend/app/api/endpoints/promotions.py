"""
Promotions API Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.core.database import get_db
from app.models.promotion import Promotion as PromotionModel
from app.schemas.promotion import Promotion, PromotionCreate

router = APIRouter()

@router.get("/", response_model=List[Promotion])
def get_promotions(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    active_only: bool = True,
    db: Session = Depends(get_db)
):
    """
    Get all promotions
    """
    query = db.query(PromotionModel)
    
    if active_only:
        query = query.filter(PromotionModel.is_active == True)
        # Check if within date range
        now = datetime.utcnow()
        query = query.filter(
            (PromotionModel.start_date == None) | (PromotionModel.start_date <= now)
        ).filter(
            (PromotionModel.end_date == None) | (PromotionModel.end_date >= now)
        )
    
    promotions = query.order_by(PromotionModel.created_at.desc()).offset(skip).limit(limit).all()
    return promotions

@router.get("/{promotion_id}", response_model=Promotion)
def get_promotion(promotion_id: int, db: Session = Depends(get_db)):
    """
    Get promotion by ID
    """
    promotion = db.query(PromotionModel).filter(PromotionModel.id == promotion_id).first()
    if not promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    return promotion

@router.get("/code/{code}", response_model=Promotion)
def get_promotion_by_code(code: str, db: Session = Depends(get_db)):
    """
    Get promotion by code
    """
    promotion = db.query(PromotionModel).filter(PromotionModel.code == code.upper()).first()
    if not promotion:
        raise HTTPException(status_code=404, detail="Promotion code not found")
    
    # Check if active
    if not promotion.is_active:
        raise HTTPException(status_code=400, detail="Promotion is not active")
    
    # Check dates
    now = datetime.utcnow()
    if promotion.start_date and promotion.start_date > now:
        raise HTTPException(status_code=400, detail="Promotion has not started yet")
    if promotion.end_date and promotion.end_date < now:
        raise HTTPException(status_code=400, detail="Promotion has expired")
    
    # Check usage limit
    if promotion.max_uses and promotion.current_uses >= promotion.max_uses:
        raise HTTPException(status_code=400, detail="Promotion usage limit reached")
    
    return promotion

@router.post("/", response_model=Promotion)
def create_promotion(
    promotion: PromotionCreate,
    db: Session = Depends(get_db)
):
    """
    Create new promotion (Admin only)
    """
    # Check if code already exists
    existing = db.query(PromotionModel).filter(PromotionModel.code == promotion.code.upper()).first()
    if existing:
        raise HTTPException(status_code=400, detail="Promotion code already exists")
    
    # Create promotion
    promotion_data = promotion.model_dump()
    promotion_data['code'] = promotion_data['code'].upper()
    
    db_promotion = PromotionModel(**promotion_data)
    db.add(db_promotion)
    db.commit()
    db.refresh(db_promotion)
    
    return db_promotion

@router.put("/{promotion_id}", response_model=Promotion)
def update_promotion(
    promotion_id: int,
    promotion_update: PromotionCreate,
    db: Session = Depends(get_db)
):
    """
    Update promotion (Admin only)
    """
    db_promotion = db.query(PromotionModel).filter(PromotionModel.id == promotion_id).first()
    if not db_promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    
    # Update fields
    for key, value in promotion_update.model_dump().items():
        setattr(db_promotion, key, value)
    
    db.commit()
    db.refresh(db_promotion)
    return db_promotion

@router.delete("/{promotion_id}")
def delete_promotion(promotion_id: int, db: Session = Depends(get_db)):
    """
    Delete promotion (Admin only)
    """
    db_promotion = db.query(PromotionModel).filter(PromotionModel.id == promotion_id).first()
    if not db_promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    
    db_promotion.is_active = False
    db.commit()
    return {"message": "Promotion deleted successfully"}

