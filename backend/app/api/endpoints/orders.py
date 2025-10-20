"""
Orders API Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
import random
import string
from app.core.database import get_db
from app.models.order import Order as OrderModel, OrderItem as OrderItemModel, OrderStatus, PaymentStatus
from app.models.product import Product as ProductModel
from app.schemas.order import Order, OrderCreate, OrderUpdate, OrderList

router = APIRouter()

def generate_order_number():
    """
    Generate unique order number
    """
    timestamp = datetime.now().strftime("%Y%m%d")
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"ORD-{timestamp}-{random_str}"

@router.get("/", response_model=OrderList)
def get_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    payment_status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all orders dengan filtering dan pagination
    """
    query = db.query(OrderModel)
    
    # Filters
    if status:
        query = query.filter(OrderModel.status == status)
    if payment_status:
        query = query.filter(OrderModel.payment_status == payment_status)
    
    # Order by created_at desc
    query = query.order_by(OrderModel.created_at.desc())
    
    # Count total
    total = query.count()
    
    # Get orders
    orders = query.offset(skip).limit(limit).all()
    
    # Calculate pages
    pages = (total + limit - 1) // limit
    
    return {
        "items": orders,
        "total": total,
        "page": skip // limit + 1,
        "page_size": limit,
        "pages": pages
    }

@router.get("/{order_id}", response_model=Order)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """
    Get order by ID
    """
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/number/{order_number}", response_model=Order)
def get_order_by_number(order_number: str, db: Session = Depends(get_db)):
    """
    Get order by order number
    """
    order = db.query(OrderModel).filter(OrderModel.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=Order)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db)
):
    """
    Create new order
    """
    # Calculate totals
    subtotal = 0
    order_items_data = []
    
    for item in order_data.items:
        product = db.query(ProductModel).filter(ProductModel.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")
        
        item_subtotal = product.price * item.quantity
        subtotal += item_subtotal
        
        order_items_data.append({
            "product_id": product.id,
            "product_name": product.name,
            "product_price": product.price,
            "quantity": item.quantity,
            "subtotal": item_subtotal
        })
        
        # Update stock
        product.stock -= item.quantity
    
    # Calculate shipping, tax, total
    shipping_cost = 0  # You can add logic here
    tax = 0  # You can add logic here
    total = subtotal + shipping_cost + tax
    
    # Create order
    db_order = OrderModel(
        order_number=generate_order_number(),
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        shipping_address=order_data.shipping_address,
        shipping_city=order_data.shipping_city,
        shipping_province=order_data.shipping_province,
        shipping_postal_code=order_data.shipping_postal_code,
        payment_method=order_data.payment_method,
        notes=order_data.notes,
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        tax=tax,
        discount=0,
        total=total,
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.PENDING
    )
    
    db.add(db_order)
    db.flush()
    
    # Create order items
    for item_data in order_items_data:
        db_item = OrderItemModel(order_id=db_order.id, **item_data)
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    
    return db_order

@router.put("/{order_id}", response_model=Order)
def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db)
):
    """
    Update order status (Admin only)
    """
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Update fields
    for key, value in order_update.model_dump(exclude_unset=True).items():
        setattr(db_order, key, value)
    
    # Update timestamps based on status
    if order_update.status == OrderStatus.SHIPPED and not db_order.shipped_at:
        db_order.shipped_at = datetime.utcnow()
    elif order_update.status == OrderStatus.DELIVERED and not db_order.delivered_at:
        db_order.delivered_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    """
    Cancel order
    """
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db_order.status = OrderStatus.CANCELLED
    db.commit()
    return {"message": "Order cancelled successfully"}

