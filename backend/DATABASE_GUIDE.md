# Database Setup and Management Guide

## 📁 Quick Start

### For SQLite (Development - Recommended for Local)

#### Option 1: Automated Setup (Recommended)

```bash
# From project root
cd backend
python setup_database.py
```

This will automatically:
- ✓ Create all database tables (SQLite)
- ✓ Insert sample data (users, products, orders, etc.)
- ✓ Display a summary of created records

#### Option 2: Manual Setup

```bash
# From backend directory
cd backend
python database/init_db.py
```

#### Option 3: Using SQLite CLI

```bash
# Create schema
sqlite3 backend/database/ecommerce.db < backend/database/schema.sql

# Insert data
sqlite3 backend/database/ecommerce.db < backend/database/seed.sql
```

### For MySQL/MariaDB (Production or phpMyAdmin)

#### Using phpMyAdmin (Easiest)

1. **Create Database**
   - Open phpMyAdmin
   - Click "New" to create database
   - Database name: `darkchic_db`
   - Collation: `utf8mb4_unicode_ci`

2. **Import Schema**
   - Select your database
   - Click "Import" tab
   - Choose file: `backend/database/schema_mysql.sql`
   - Click "Go"

3. **Import Data**
   - Click "Import" tab again
   - Choose file: `backend/database/seed_mysql.sql`
   - Click "Go"

#### Using MySQL Command Line

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE darkchic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema
mysql -u root -p darkchic_db < backend/database/schema_mysql.sql

# Import seed data
mysql -u root -p darkchic_db < backend/database/seed_mysql.sql
```

#### Manual Copy-Paste Method

1. Open `backend/database/schema_mysql.sql` in a text editor
2. Copy all contents (Ctrl+A, Ctrl+C)
3. Go to phpMyAdmin → SQL tab
4. Paste and click "Go"
5. Repeat for `seed_mysql.sql`

## 📊 Database Files

| File | Description | Database Type |
|------|-------------|---------------|
| `database/schema.sql` | SQLite database schema | SQLite |
| `database/seed.sql` | SQLite sample data | SQLite |
| `database/schema_mysql.sql` | MySQL database schema | MySQL/MariaDB |
| `database/seed_mysql.sql` | MySQL sample data | MySQL/MariaDB |
| `database/init_db.py` | Python script (SQLite only) | SQLite |
| `database/queries.sql` | Common SQL queries reference | Both |
| `database/README.md` | Detailed database documentation | Both |
| `database/.gitignore` | Git ignore rules | Both |
| `setup_database.py` | Quick setup script (SQLite only) | SQLite |

### Key Differences: SQLite vs MySQL

| Feature | SQLite | MySQL |
|---------|--------|-------|
| **Auto Increment** | `INTEGER PRIMARY KEY AUTOINCREMENT` | `INT AUTO_INCREMENT PRIMARY KEY` |
| **Boolean** | `BOOLEAN` (stored as 0/1) | `TINYINT(1)` |
| **Decimal/Float** | `REAL` | `DECIMAL(15,2)` |
| **Enum Types** | `VARCHAR` with CHECK | `ENUM('val1', 'val2')` |
| **Timestamps** | `TIMESTAMP` | `TIMESTAMP` with auto-update |
| **Charset** | N/A | `utf8mb4_unicode_ci` |
| **Engine** | N/A | `InnoDB` |
| **Use Case** | Development/Testing | Production |

## 🗄️ Database Schema

### Tables Overview

```
users (8 columns)
├── id (PRIMARY KEY)
├── email (UNIQUE)
├── username (UNIQUE)
├── hashed_password
├── full_name
├── is_active
├── is_admin
└── created_at, updated_at

customers (11 columns)
├── id (PRIMARY KEY)
├── name
├── email (UNIQUE)
├── phone
├── address, city, province, postal_code
├── total_orders
├── total_spent
└── created_at, updated_at, last_order_at

categories (6 columns)
├── id (PRIMARY KEY)
├── name (UNIQUE)
├── slug (UNIQUE)
├── description
├── image
├── is_active
└── created_at

products (19 columns)
├── id (PRIMARY KEY)
├── name
├── slug (UNIQUE)
├── description
├── price, original_price, discount
├── stock
├── sku (UNIQUE)
├── category_id (FOREIGN KEY → categories)
├── thumbnail
├── brand
├── rating, reviews_count
├── release_tag
├── is_featured, is_active, is_new_arrival
└── created_at, updated_at

product_images (6 columns)
├── id (PRIMARY KEY)
├── product_id (FOREIGN KEY → products)
├── image_url
├── is_primary
├── sort_order
└── created_at

orders (20 columns)
├── id (PRIMARY KEY)
├── order_number (UNIQUE)
├── customer_name, customer_email, customer_phone
├── shipping_address, shipping_city, shipping_province, shipping_postal_code
├── subtotal, shipping_cost, tax, discount, total
├── status (pending|processing|shipped|delivered|cancelled)
├── payment_status (pending|paid|failed|refunded)
├── payment_method
├── notes
└── created_at, updated_at, shipped_at, delivered_at

order_items (7 columns)
├── id (PRIMARY KEY)
├── order_id (FOREIGN KEY → orders)
├── product_id (FOREIGN KEY → products)
├── product_name
├── product_price
├── quantity
└── subtotal

promotions (14 columns)
├── id (PRIMARY KEY)
├── name
├── code (UNIQUE)
├── description
├── type (percentage|fixed_amount|free_shipping)
├── value
├── max_uses, current_uses, max_uses_per_customer
├── min_purchase
├── is_active
├── start_date, end_date
└── created_at, updated_at
```

## 🔑 Sample Data

### Default Admin Accounts

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@darkchic.com | admin123 | Admin |
| manager | manager@darkchic.com | admin123 | Admin |
| staff | staff@darkchic.com | admin123 | Staff |

⚠️ **Important**: Change these passwords in production!

### Sample Data Summary

- **Users**: 3 accounts (2 admin, 1 staff)
- **Customers**: 10 customers with order history
- **Categories**: 4 categories (T-Shirts, Pants, Shoes, Accessories)
- **Products**: 18 products across 3 volumes (vol 1, vol 2, vol 3)
- **Orders**: 12 orders with various statuses
- **Order Items**: Multiple items per order
- **Promotions**: 8 promotional codes
- **Product Images**: Sample images for featured products

## 🔍 Common Operations

### View Data

```bash
# Open SQLite CLI
sqlite3 backend/database/ecommerce.db

# View tables
.tables

# View users
SELECT * FROM users;

# View products
SELECT name, price, stock FROM products;

# View recent orders
SELECT order_number, customer_name, total, status FROM orders ORDER BY created_at DESC LIMIT 5;

# Exit
.quit
```

### Reset Database

```bash
# Delete and recreate
python backend/database/init_db.py --force

# Or manually
rm backend/database/ecommerce.db
python backend/database/init_db.py
```

### Backup Database

```bash
# Create backup
cp backend/database/ecommerce.db backend/database/ecommerce_backup_$(date +%Y%m%d).db

# Or use SQLite command
sqlite3 backend/database/ecommerce.db ".backup 'backup.db'"
```

## 📈 Useful Queries

See `database/queries.sql` for a comprehensive list of queries including:

- User authentication
- Top customers by spending
- Best-selling products
- Low stock alerts
- Revenue reports
- Order analytics
- Promotion usage statistics
- Inventory management
- Customer segmentation

### Quick Examples

```sql
-- Top 5 best-selling products
SELECT 
    p.name,
    SUM(oi.quantity) as total_sold,
    SUM(oi.subtotal) as revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.payment_status = 'paid'
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 5;

-- Daily sales report
SELECT 
    DATE(created_at) as date,
    COUNT(*) as orders,
    SUM(total) as revenue
FROM orders
WHERE payment_status = 'paid'
GROUP BY DATE(created_at)
ORDER BY date DESC
LIMIT 7;

-- Active promotions
SELECT code, name, type, value, min_purchase
FROM promotions
WHERE is_active = 1 
AND end_date >= CURRENT_TIMESTAMP
ORDER BY created_at DESC;
```

## 🔧 Troubleshooting

### Database Locked Error

```bash
# Close all connections and remove lock
rm backend/database/ecommerce.db-journal
```

### Permission Denied

```bash
# On Unix/Linux/Mac
chmod +x backend/database/init_db.py
chmod +x backend/setup_database.py
```

### Tables Already Exist

```bash
# Use force flag to recreate
python backend/database/init_db.py --force
```

### Migration Issues

If you modify the models, you'll need to:

1. **Drop and recreate** (Development):
   ```bash
   python backend/database/init_db.py --force
   ```

2. **Use migrations** (Production):
   ```bash
   # Install Alembic
   pip install alembic
   
   # Initialize Alembic
   alembic init alembic
   
   # Create migration
   alembic revision --autogenerate -m "description"
   
   # Apply migration
   alembic upgrade head
   ```

## 🚀 Integration with FastAPI

The FastAPI application uses SQLAlchemy ORM:

```python
# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./database/ecommerce.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Dependency for endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Using in Endpoints

```python
from fastapi import Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.product import Product

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_active == True).all()
    return products
```

## 🌐 Database Configuration

### SQLite (Default)

```python
# backend/app/core/config.py
DATABASE_URL = "sqlite:///./database/ecommerce.db"
```

**Pros**: Easy setup, no server required  
**Cons**: Not suitable for production with high traffic

### PostgreSQL (Production)

```python
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/darkchic

# Install driver
pip install psycopg2-binary
```

### MySQL

```python
# .env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/darkchic

# Install driver
pip install pymysql
```

## 📝 Database Best Practices

### Development

✅ Use SQLite for quick development  
✅ Regular backups before schema changes  
✅ Use seed data for consistent testing  
✅ Reset database when models change

### Production

✅ Use PostgreSQL or MySQL  
✅ Implement proper migrations (Alembic)  
✅ Regular automated backups  
✅ Use connection pooling  
✅ Enable SSL/TLS connections  
✅ Monitor database performance  
✅ Implement proper indexing  
✅ Regular VACUUM/ANALYZE (PostgreSQL)

## 🔐 Security Considerations

1. **Passwords**: Always hash passwords (bcrypt, argon2)
2. **SQL Injection**: Use SQLAlchemy ORM (parameterized queries)
3. **Access Control**: Implement role-based access
4. **Environment Variables**: Store credentials in .env files
5. **Backups**: Encrypt backup files
6. **SSL/TLS**: Use encrypted connections in production
7. **Audit Logs**: Track database modifications

## 📚 Additional Resources

- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [FastAPI Database Guide](https://fastapi.tiangolo.com/tutorial/sql-databases/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Alembic Migrations](https://alembic.sqlalchemy.org/)

## 🆘 Getting Help

If you encounter issues:

1. Check `database/README.md` for detailed documentation
2. Review `database/queries.sql` for query examples
3. Check FastAPI logs for error messages
4. Verify database file permissions
5. Ensure SQLite3 is installed: `sqlite3 --version`

## ✅ Verification Checklist

After setup, verify:

- [ ] Database file exists: `backend/database/ecommerce.db`
- [ ] Can login with admin credentials
- [ ] Products are visible in the API
- [ ] Orders can be created
- [ ] Promotions are active
- [ ] FastAPI server starts without errors
- [ ] API documentation accessible: http://localhost:8000/docs

---

**Setup Complete!** 🎉

Your database is ready to use. Start the backend server and begin development!

```bash
cd backend
python run.py
```

Then visit:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

