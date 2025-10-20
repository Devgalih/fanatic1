# Database Setup Guide

This directory contains SQL scripts and utilities for setting up and seeding the Dark Chic Emporium database.

## Files

### SQLite (Default - Development)
- `schema.sql` - SQLite database schema with all table definitions
- `seed.sql` - SQLite sample data for testing and development
- `init_db.py` - Python script to initialize and seed SQLite database
- `ecommerce.db` - SQLite database file (created after initialization)

### MySQL/MariaDB (Production)
- `schema_mysql.sql` - MySQL-compatible database schema
- `seed_mysql.sql` - MySQL-compatible sample data
- Use phpMyAdmin or MySQL CLI to execute these files

### Other Files
- `queries.sql` - Common SQL queries reference (works with both)
- `.gitignore` - Git ignore rules (excludes .db files)
- `README.md` - This documentation file

## Quick Start

### For SQLite (Development)

#### Option 1: Using Python Script (Recommended)

```bash
# From the backend directory
cd backend
python database/init_db.py
```

This will:
1. Create all tables from `schema.sql`
2. Populate tables with sample data from `seed.sql`
3. Display a summary of created records

#### Option 2: Using SQLite CLI

```bash
# Create database and run schema
sqlite3 backend/database/ecommerce.db < backend/database/schema.sql

# Insert sample data
sqlite3 backend/database/ecommerce.db < backend/database/seed.sql
```

### For MySQL/MariaDB (Production)

#### Option 1: Using phpMyAdmin

1. Open phpMyAdmin
2. Create a new database (e.g., `darkchic_db`)
3. Click on "Import" tab
4. Select `schema_mysql.sql` and execute
5. Select `seed_mysql.sql` and execute

#### Option 2: Using MySQL CLI

```bash
# Create database
mysql -u your_username -p -e "CREATE DATABASE darkchic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema
mysql -u your_username -p darkchic_db < backend/database/schema_mysql.sql

# Import seed data
mysql -u your_username -p darkchic_db < backend/database/seed_mysql.sql
```

#### Option 3: Copy and Paste

1. Open phpMyAdmin or any MySQL client
2. Open `schema_mysql.sql` in a text editor
3. Copy the entire contents
4. Paste into the SQL tab and execute
5. Repeat for `seed_mysql.sql`

### Option 3: Using SQLAlchemy (via FastAPI app)

The FastAPI application can automatically create tables using SQLAlchemy:

```python
from app.core.database import Base, engine
from app.models import user, customer, product, order, promotion

# Create all tables
Base.metadata.create_all(bind=engine)
```

## Database Schema

### Tables Overview

1. **users** - Admin and staff authentication
   - Admin users for managing the system
   - Password hashing with bcrypt

2. **customers** - Customer information
   - Contact details and shipping addresses
   - Purchase statistics (total_orders, total_spent)

3. **categories** - Product categories
   - T-Shirts, Pants, Shoes, Accessories

4. **products** - Product catalog
   - Detailed product information
   - Pricing, stock, ratings
   - Release tags (vol 1, vol 2, vol 3)

5. **product_images** - Additional product images
   - Multiple images per product
   - Primary image flag

6. **orders** - Customer orders
   - Order tracking and status
   - Payment information
   - Shipping details

7. **order_items** - Order line items
   - Products in each order
   - Quantities and pricing

8. **promotions** - Discount codes
   - Percentage, fixed amount, or free shipping
   - Usage limits and conditions

## Sample Data

### Default Admin Account

```
Email: admin@darkchic.com
Username: admin
Password: admin123
Role: Admin
```

### Other Test Accounts

```
Email: manager@darkchic.com
Username: manager
Password: admin123
Role: Admin

Email: staff@darkchic.com
Username: staff
Password: admin123
Role: Staff (non-admin)
```

### Sample Customers

- 10 customers with various order histories
- Different locations across Indonesia
- Realistic purchase statistics

### Products

- 18 products across 3 volumes (vol 1, vol 2, vol 3)
- 4 categories: T-Shirts, Pants, Shoes, Accessories
- Price range: Rp 150,000 - Rp 600,000
- Stock quantities and ratings included

### Orders

- 12 sample orders with various statuses
- Different payment methods (QRIS, GoPay, BCA, etc.)
- Order statuses: pending, processing, shipped, delivered, cancelled

### Promotions

- 8 promotional codes
- Different types: percentage, fixed amount, free shipping
- Active and expired promotions

## Database Connection

The default database URL is set in `backend/app/core/config.py`:

```python
DATABASE_URL: str = "sqlite:///./database/ecommerce.db"
```

For PostgreSQL or MySQL, update the connection string:

```python
# PostgreSQL
DATABASE_URL = "postgresql://user:password@localhost/darkchic"

# MySQL
DATABASE_URL = "mysql+pymysql://user:password@localhost/darkchic"
```

## Common Operations

### Reset Database

To completely reset the database:

```bash
# Delete existing database
rm backend/database/ecommerce.db

# Reinitialize
python backend/database/init_db.py
```

### View Data

```bash
# Open SQLite CLI
sqlite3 backend/database/ecommerce.db

# Example queries
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
```

### Backup Database

```bash
# Create backup
cp backend/database/ecommerce.db backend/database/ecommerce_backup.db

# Or use SQLite backup command
sqlite3 backend/database/ecommerce.db ".backup 'backup.db'"
```

## Production Considerations

⚠️ **Important**: These scripts are for development/testing only!

For production:

1. **Change Default Passwords**: Update admin passwords immediately
2. **Use Strong Database**: Consider PostgreSQL or MySQL
3. **Implement Migrations**: Use Alembic for database migrations
4. **Secure Credentials**: Store passwords securely (environment variables)
5. **Regular Backups**: Implement automated backup strategy
6. **SSL/TLS**: Enable encrypted connections
7. **Access Control**: Restrict database access by IP/user

## Troubleshooting

### Database Locked Error

If you get "database is locked" error:
```bash
# Close all connections to the database
# Kill any running Python processes
# Remove the lock file
rm backend/database/ecommerce.db-journal
```

### Foreign Key Errors

SQLite foreign keys are disabled by default. Enable them:
```sql
PRAGMA foreign_keys = ON;
```

### Migration Issues

If tables already exist:
```bash
# Option 1: Drop all tables (loses data!)
sqlite3 backend/database/ecommerce.db
> DROP TABLE IF EXISTS order_items;
> DROP TABLE IF EXISTS orders;
> ... (drop all tables)

# Option 2: Use the init_db.py script with --force flag
python backend/database/init_db.py --force
```

## Next Steps

After setting up the database:

1. Start the FastAPI backend server
2. Test the API endpoints
3. Connect the frontend application
4. Verify data flows correctly
5. Add custom products and categories as needed

## Support

For issues or questions:
- Check the main README.md
- Review FastAPI documentation
- Check SQLAlchemy documentation

