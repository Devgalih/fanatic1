"""
Main API Router - menggabungkan semua endpoints
"""
from fastapi import APIRouter
from app.api.endpoints import products, orders, customers, auth, analytics, promotions

api_router = APIRouter()

# Include all routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(customers.router, prefix="/customers", tags=["Customers"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(promotions.router, prefix="/promotions", tags=["Promotions"])

