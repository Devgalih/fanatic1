"""
Analytics API Endpoints
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models.order import Order as OrderModel, OrderStatus, PaymentStatus
from app.models.product import Product as ProductModel
from app.models.customer import Customer as CustomerModel

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """
    Get dashboard statistics
    """
    # Total revenue (completed & paid orders)
    total_revenue = db.query(func.sum(OrderModel.total)).filter(
        OrderModel.payment_status == PaymentStatus.PAID
    ).scalar() or 0
    
    # Total orders
    total_orders = db.query(func.count(OrderModel.id)).scalar() or 0
    
    # Total customers
    total_customers = db.query(func.count(CustomerModel.id)).scalar() or 0
    
    # Total products
    total_products = db.query(func.count(ProductModel.id)).filter(
        ProductModel.is_active == True
    ).scalar() or 0
    
    # Pending orders
    pending_orders = db.query(func.count(OrderModel.id)).filter(
        OrderModel.status == OrderStatus.PENDING
    ).scalar() or 0
    
    # Orders this month
    start_of_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    orders_this_month = db.query(func.count(OrderModel.id)).filter(
        OrderModel.created_at >= start_of_month
    ).scalar() or 0
    
    # Revenue this month
    revenue_this_month = db.query(func.sum(OrderModel.total)).filter(
        OrderModel.created_at >= start_of_month,
        OrderModel.payment_status == PaymentStatus.PAID
    ).scalar() or 0
    
    return {
        "total_revenue": float(total_revenue),
        "total_orders": total_orders,
        "total_customers": total_customers,
        "total_products": total_products,
        "pending_orders": pending_orders,
        "orders_this_month": orders_this_month,
        "revenue_this_month": float(revenue_this_month)
    }

@router.get("/sales-chart")
def get_sales_chart(days: int = 30, db: Session = Depends(get_db)):
    """
    Get sales data for chart (last N days)
    """
    start_date = datetime.now() - timedelta(days=days)
    
    # Get orders by date
    orders = db.query(
        func.date(OrderModel.created_at).label('date'),
        func.count(OrderModel.id).label('count'),
        func.sum(OrderModel.total).label('total')
    ).filter(
        OrderModel.created_at >= start_date,
        OrderModel.payment_status == PaymentStatus.PAID
    ).group_by(func.date(OrderModel.created_at)).all()
    
    return [{
        "date": str(order.date),
        "orders": order.count,
        "revenue": float(order.total or 0)
    } for order in orders]

@router.get("/top-products")
def get_top_products(limit: int = 10, db: Session = Depends(get_db)):
    """
    Get top selling products
    """
    from app.models.order import OrderItem as OrderItemModel
    
    top_products = db.query(
        ProductModel.id,
        ProductModel.name,
        ProductModel.price,
        ProductModel.thumbnail,
        func.sum(OrderItemModel.quantity).label('total_sold'),
        func.sum(OrderItemModel.subtotal).label('total_revenue')
    ).join(
        OrderItemModel, ProductModel.id == OrderItemModel.product_id
    ).group_by(
        ProductModel.id
    ).order_by(
        func.sum(OrderItemModel.quantity).desc()
    ).limit(limit).all()
    
    return [{
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "thumbnail": product.thumbnail,
        "total_sold": product.total_sold,
        "total_revenue": float(product.total_revenue or 0)
    } for product in top_products]

@router.get("/recent-orders")
def get_recent_orders(limit: int = 10, db: Session = Depends(get_db)):
    """
    Get recent orders
    """
    orders = db.query(OrderModel).order_by(
        OrderModel.created_at.desc()
    ).limit(limit).all()
    
    return orders

