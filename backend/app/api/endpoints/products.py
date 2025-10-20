"""
Products API Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.product import Product as ProductModel, Category as CategoryModel
from app.schemas.product import Product, ProductCreate, ProductUpdate, ProductList, Category, CategoryCreate

router = APIRouter()

# Categories
@router.get("/categories", response_model=List[Category])
def get_categories(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all categories
    """
    categories = db.query(CategoryModel).filter(CategoryModel.is_active == True).offset(skip).limit(limit).all()
    return categories

@router.get("/release-tags", response_model=List[str])
def get_release_tags(db: Session = Depends(get_db)):
    """
    Get all available release tags
    """
    release_tags = db.query(ProductModel.release_tag).filter(
        ProductModel.is_active == True,
        ProductModel.release_tag.isnot(None)
    ).distinct().all()
    return [tag[0] for tag in release_tags if tag[0]]

@router.post("/categories", response_model=Category)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    """
    Create new category (Admin only)
    """
    db_category = CategoryModel(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Products
@router.get("/", response_model=ProductList)
def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category_id: Optional[int] = None,
    is_featured: Optional[bool] = None,
    is_new_arrival: Optional[bool] = None,
    release_tag: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """
    Get all products dengan filtering dan pagination
    """
    query = db.query(ProductModel).filter(ProductModel.is_active == True)
    
    # Filters
    if category_id:
        query = query.filter(ProductModel.category_id == category_id)
    if is_featured is not None:
        query = query.filter(ProductModel.is_featured == is_featured)
    if is_new_arrival is not None:
        query = query.filter(ProductModel.is_new_arrival == is_new_arrival)
    if release_tag:
        query = query.filter(ProductModel.release_tag == release_tag)
    if search:
        query = query.filter(ProductModel.name.ilike(f"%{search}%"))
    if min_price:
        query = query.filter(ProductModel.price >= min_price)
    if max_price:
        query = query.filter(ProductModel.price <= max_price)
    
    # Count total
    total = query.count()
    
    # Get products
    products = query.offset(skip).limit(limit).all()
    
    # Calculate pages
    pages = (total + limit - 1) // limit
    
    return {
        "items": products,
        "total": total,
        "page": skip // limit + 1,
        "page_size": limit,
        "pages": pages
    }

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Get product by ID
    """
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/slug/{slug}", response_model=Product)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get product by slug
    """
    product = db.query(ProductModel).filter(ProductModel.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=Product)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """
    Create new product (Admin only)
    """
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=Product)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db)
):
    """
    Update product (Admin only)
    """
    db_product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update fields
    for key, value in product_update.model_dump(exclude_unset=True).items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Delete product (Admin only) - soft delete
    """
    db_product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db_product.is_active = False
    db.commit()
    return {"message": "Product deleted successfully"}

