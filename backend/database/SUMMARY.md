# Database Setup Summary

## ✅ Created Files

All database files have been created successfully!

### Core SQL Files

#### SQLite (Development)
| File | Lines | Purpose |
|------|-------|---------|
| `schema.sql` | 211 | SQLite database schema (CREATE TABLE) |
| `seed.sql` | ~500 | SQLite sample data (INSERT) |

#### MySQL/MariaDB (Production)
| File | Lines | Purpose |
|------|-------|---------|
| `schema_mysql.sql` | 211 | MySQL database schema (CREATE TABLE) |
| `seed_mysql.sql` | ~500 | MySQL sample data (INSERT) |

### Helper Scripts

| File | Lines | Purpose |
|------|-------|---------|
| `init_db.py` | 200+ | Python script to initialize SQLite |
| `setup_database.py` | 50+ | Quick setup wrapper script |

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive database documentation |
| `DATABASE_GUIDE.md` | Step-by-step setup guide (both SQLite & MySQL) |
| `MYSQL_SETUP.md` | Dedicated MySQL/phpMyAdmin guide |
| `SUMMARY.md` | This file - quick reference |

### Reference Files

| File | Purpose |
|------|---------|
| `queries.sql` | 366 lines of common SQL queries |
| `.gitignore` | Git ignore rules for database files |

## 📊 Database Structure

### 8 Tables Created

1. **users** - Admin authentication (3 sample users)
2. **customers** - Customer information (10 samples)
3. **categories** - Product categories (4 categories)
4. **products** - Product catalog (18 products)
5. **product_images** - Product image gallery (9 images)
6. **orders** - Customer orders (12 orders)
7. **order_items** - Order line items (multiple items)
8. **promotions** - Discount codes (8 promotions)

### Total Sample Data

- **Users**: 3 (admin, manager, staff)
- **Customers**: 10 with order history
- **Categories**: 4 (T-Shirts, Pants, Shoes, Accessories)
- **Products**: 18 across 3 volumes (vol 1, vol 2, vol 3)
- **Product Images**: 9 images linked to products
- **Orders**: 12 with various statuses
- **Order Items**: 20+ line items
- **Promotions**: 8 active and expired codes

## 🚀 Quick Start Guide

### For SQLite (Local Development)

**Fastest Method:**
```bash
cd backend
python setup_database.py
```

**Manual Method:**
```bash
cd backend
python database/init_db.py
```

### For MySQL (Production/phpMyAdmin)

**Step 1:** Open phpMyAdmin  
**Step 2:** Create database `darkchic_db`  
**Step 3:** Import `schema_mysql.sql`  
**Step 4:** Import `seed_mysql.sql`  

See `MYSQL_SETUP.md` for detailed instructions with screenshots.

## 🔑 Default Credentials

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@darkchic.com | admin123 | Admin |
| manager | manager@darkchic.com | admin123 | Admin |
| staff | staff@darkchic.com | admin123 | Staff |

⚠️ **Change these in production!**

## 📝 Key Differences

### SQLite vs MySQL Syntax

| Feature | SQLite | MySQL |
|---------|--------|-------|
| Primary Key | `INTEGER PRIMARY KEY AUTOINCREMENT` | `INT AUTO_INCREMENT PRIMARY KEY` |
| Boolean | `BOOLEAN` | `TINYINT(1)` |
| Decimal | `REAL` | `DECIMAL(15,2)` |
| Enum | `VARCHAR` + CHECK | `ENUM('a','b')` |
| Auto Update | Manual | `ON UPDATE CURRENT_TIMESTAMP` |

Both versions have **identical data structure** and **same sample data**.

## 🔍 Verify Installation

### SQLite
```bash
sqlite3 backend/database/ecommerce.db "SELECT COUNT(*) FROM users;"
# Expected: 3
```

### MySQL
```bash
mysql -u root -p -e "USE darkchic_db; SELECT COUNT(*) FROM users;"
# Expected: 3
```

### Using Python
```python
from sqlalchemy import create_engine

# SQLite
engine = create_engine("sqlite:///./database/ecommerce.db")

# MySQL
engine = create_engine("mysql+pymysql://root:@localhost/darkchic_db")

connection = engine.connect()
result = connection.execute("SELECT COUNT(*) FROM users")
print(f"Users: {result.fetchone()[0]}")  # Should print: Users: 3
```

## 📚 Documentation Index

### Getting Started
- **Quick Setup**: See top of this file
- **SQLite Setup**: `README.md` or `DATABASE_GUIDE.md`
- **MySQL Setup**: `MYSQL_SETUP.md` (most detailed for beginners)

### Reference
- **SQL Queries**: `queries.sql` - 366 lines of useful queries
- **Schema Details**: `schema.sql` or `schema_mysql.sql`
- **Sample Data**: `seed.sql` or `seed_mysql.sql`

### Advanced
- **Python Scripts**: `init_db.py` for automation
- **Git Ignores**: `.gitignore` for version control
- **Troubleshooting**: See any of the markdown docs

## 🛠️ Common Tasks

### Reset Database (SQLite)
```bash
python backend/database/init_db.py --force
```

### Reset Database (MySQL)
```sql
DROP DATABASE darkchic_db;
CREATE DATABASE darkchic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Then re-import schema_mysql.sql and seed_mysql.sql
```

### Backup Database (SQLite)
```bash
cp backend/database/ecommerce.db backend/database/backup.db
```

### Backup Database (MySQL)
```bash
mysqldump -u root -p darkchic_db > backup.sql
```

### View Tables
```bash
# SQLite
sqlite3 backend/database/ecommerce.db ".tables"

# MySQL
mysql -u root -p -e "USE darkchic_db; SHOW TABLES;"
```

## 🔗 Integration with Backend

### Update Configuration

**SQLite (Default):**
```python
# backend/app/core/config.py
DATABASE_URL = "sqlite:///./database/ecommerce.db"
```

**MySQL:**
```python
# backend/app/core/config.py
DATABASE_URL = "mysql+pymysql://root:@localhost/darkchic_db"
```

### Install Required Packages

**For SQLite:**
```bash
pip install -r requirements.txt
# No additional packages needed
```

**For MySQL:**
```bash
pip install -r requirements.txt
pip install pymysql  # MySQL driver
```

## ✅ Next Steps

1. ✅ Database files created
2. ⬜ Choose SQLite or MySQL
3. ⬜ Run setup (see Quick Start above)
4. ⬜ Configure backend connection
5. ⬜ Start FastAPI server: `python backend/run.py`
6. ⬜ Test API: http://localhost:8000/docs
7. ⬜ Login with admin credentials
8. ⬜ Start frontend: `npm run dev`

## 📞 Support

### Documentation Files
- Comprehensive: `README.md`
- Step-by-step: `DATABASE_GUIDE.md`
- MySQL specific: `MYSQL_SETUP.md`
- SQL examples: `queries.sql`

### File Locations
All files are in: `backend/database/`

### Testing
Test your setup using the verification steps above or check the FastAPI logs when starting the server.

---

## 📦 File Structure

```
backend/
├── database/
│   ├── schema.sql              # SQLite schema
│   ├── seed.sql                # SQLite data
│   ├── schema_mysql.sql        # MySQL schema  ⭐ USE THIS FOR MYSQL
│   ├── seed_mysql.sql          # MySQL data    ⭐ USE THIS FOR MYSQL
│   ├── init_db.py              # Python setup script (SQLite)
│   ├── queries.sql             # Common queries reference
│   ├── README.md               # Main documentation
│   ├── MYSQL_SETUP.md          # MySQL guide    ⭐ READ THIS FOR MYSQL
│   ├── DATABASE_GUIDE.md       # Complete guide
│   ├── SUMMARY.md              # This file
│   ├── .gitignore              # Git ignore
│   └── ecommerce.db            # Created after setup (SQLite only)
├── setup_database.py           # Quick setup script
└── run.py                      # FastAPI server
```

---

**🎉 All database files created successfully!**

Choose your database type and follow the appropriate guide:
- **SQLite**: Run `python setup_database.py`
- **MySQL**: Open `MYSQL_SETUP.md` for step-by-step guide

