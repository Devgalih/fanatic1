# MySQL/phpMyAdmin Setup Guide

Quick guide for setting up the Dark Chic Emporium database using MySQL/MariaDB and phpMyAdmin.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Open phpMyAdmin

- Local: Usually `http://localhost/phpmyadmin`
- XAMPP: `http://localhost:8080/phpmyadmin`
- WAMP: `http://localhost/phpmyadmin`

### Step 2: Create Database

1. Click "**New**" in the left sidebar
2. Enter database name: `darkchic_db`
3. Select collation: `utf8mb4_unicode_ci`
4. Click "**Create**"

![Create Database](https://i.imgur.com/example.png)

### Step 3: Import Schema (Create Tables)

1. Click on your database `darkchic_db` in the left sidebar
2. Click "**Import**" tab at the top
3. Click "**Choose File**" button
4. Navigate to: `backend/database/schema_mysql.sql`
5. Click "**Go**" at the bottom
6. Wait for success message ✓

### Step 4: Import Data (Seed Database)

1. Still in the "**Import**" tab
2. Click "**Choose File**" again
3. Navigate to: `backend/database/seed_mysql.sql`
4. Click "**Go**" at the bottom
5. Wait for success message ✓

### Step 5: Verify Installation

1. Click "**Structure**" tab
2. You should see 8 tables:
   - ✓ users
   - ✓ customers
   - ✓ categories
   - ✓ products
   - ✓ product_images
   - ✓ orders
   - ✓ order_items
   - ✓ promotions

3. Click on "**users**" table
4. Click "**Browse**" tab
5. You should see 3 users (admin, manager, staff)

**🎉 Setup Complete!**

## 📝 Alternative: Copy-Paste Method

If file upload doesn't work, use this method:

### For Schema (Tables)

1. Open `backend/database/schema_mysql.sql` in Notepad/VSCode
2. Press `Ctrl+A` to select all
3. Press `Ctrl+C` to copy
4. Go to phpMyAdmin → Your database → **SQL** tab
5. Paste in the text box (`Ctrl+V`)
6. Click "**Go**"

### For Seed Data

1. Open `backend/database/seed_mysql.sql` in Notepad/VSCode
2. Press `Ctrl+A` to select all
3. Press `Ctrl+C` to copy
4. Go to phpMyAdmin → Your database → **SQL** tab
5. Paste in the text box (`Ctrl+V`)
6. Click "**Go**"

## 🔐 Default Login Credentials

After importing, you can use these accounts:

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@darkchic.com | admin123 | Admin |
| manager | manager@darkchic.com | admin123 | Admin |
| staff | staff@darkchic.com | admin123 | Staff |

⚠️ **Important**: Change these passwords in production!

## 📊 Sample Data Included

- **Users**: 3 accounts (2 admin, 1 staff)
- **Customers**: 10 customers with order history
- **Categories**: 4 categories (T-Shirts, Pants, Shoes, Accessories)
- **Products**: 18 products across 3 volumes
- **Orders**: 12 sample orders with various statuses
- **Promotions**: 8 promotional codes

## 🔧 Common Issues & Solutions

### Issue 1: "Access Denied" Error

**Solution**: 
- Make sure MySQL/MariaDB is running
- Check your phpMyAdmin login credentials
- Try using `root` user with no password (XAMPP default)

### Issue 2: Import File Too Large

**Solution**: 
- Use the copy-paste method instead
- Or increase upload limit in php.ini:
  ```ini
  upload_max_filesize = 100M
  post_max_size = 100M
  ```

### Issue 3: Foreign Key Constraint Error

**Solution**:
- Make sure to run `schema_mysql.sql` **before** `seed_mysql.sql`
- Tables must exist before inserting data

### Issue 4: Database Already Exists

**Solution**:
```sql
-- Drop existing database (WARNING: This deletes all data!)
DROP DATABASE IF EXISTS darkchic_db;

-- Create fresh database
CREATE DATABASE darkchic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Issue 5: Wrong Character Encoding

**Solution**:
- Make sure database uses `utf8mb4_unicode_ci` collation
- Check that phpMyAdmin is set to UTF-8

## 🔗 Configure Backend Connection

After creating the database, update your backend configuration:

### Option 1: Environment Variable

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=mysql+pymysql://root:@localhost/darkchic_db
```

### Option 2: Config File

Edit `backend/app/core/config.py`:

```python
DATABASE_URL: str = "mysql+pymysql://root:@localhost/darkchic_db"
```

### Connection String Format

```
mysql+pymysql://username:password@host:port/database
```

Examples:
```python
# XAMPP default (no password)
"mysql+pymysql://root:@localhost/darkchic_db"

# With password
"mysql+pymysql://root:your_password@localhost/darkchic_db"

# Custom port
"mysql+pymysql://root:@localhost:3307/darkchic_db"

# Remote server
"mysql+pymysql://user:pass@192.168.1.100/darkchic_db"
```

## 🧪 Test Connection

Run this Python script to test database connection:

```python
# test_db.py
from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:@localhost/darkchic_db"

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("✓ Database connection successful!")
    
    # Test query
    result = connection.execute("SELECT COUNT(*) FROM users")
    count = result.fetchone()[0]
    print(f"✓ Found {count} users in database")
    
    connection.close()
except Exception as e:
    print(f"✗ Database connection failed: {e}")
```

Run it:
```bash
python test_db.py
```

## 📱 Using MySQL Workbench (Alternative)

If you prefer MySQL Workbench:

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Create new schema: `darkchic_db`
4. File → Run SQL Script
5. Select `schema_mysql.sql` → Run
6. File → Run SQL Script
7. Select `seed_mysql.sql` → Run

## 🐳 Using Docker (Advanced)

Quick MySQL setup with Docker:

```bash
# Run MySQL in Docker
docker run --name mysql-darkchic \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=darkchic_db \
  -p 3306:3306 \
  -d mysql:8.0

# Import schema
docker exec -i mysql-darkchic mysql -uroot -proot123 darkchic_db < backend/database/schema_mysql.sql

# Import data
docker exec -i mysql-darkchic mysql -uroot -proot123 darkchic_db < backend/database/seed_mysql.sql
```

## 📚 Next Steps

After successful setup:

1. ✅ Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   pip install pymysql  # MySQL driver
   ```

2. ✅ Configure database URL in `.env` or `config.py`

3. ✅ Start backend server:
   ```bash
   python run.py
   ```

4. ✅ Test API:
   - API Docs: http://localhost:8000/docs
   - Test login with admin@darkchic.com / admin123

5. ✅ Start frontend:
   ```bash
   cd ..
   npm install
   npm run dev
   ```

## 💾 Backup & Restore

### Create Backup

Using phpMyAdmin:
1. Select database
2. Click "Export" tab
3. Select "Quick" export
4. Format: SQL
5. Click "Go"

Using MySQL CLI:
```bash
mysqldump -u root -p darkchic_db > backup.sql
```

### Restore Backup

Using phpMyAdmin:
1. Select database
2. Click "Import" tab
3. Choose backup file
4. Click "Go"

Using MySQL CLI:
```bash
mysql -u root -p darkchic_db < backup.sql
```

## 🆘 Need Help?

- Check `DATABASE_GUIDE.md` for comprehensive documentation
- Review `queries.sql` for common SQL queries
- Check FastAPI logs for connection errors
- Verify MySQL service is running

## ✨ Pro Tips

1. **Regular Backups**: Export database daily during development
2. **Use Transactions**: phpMyAdmin uses autocommit, be careful with DELETE
3. **Index Performance**: Tables already have optimal indexes
4. **Monitor Queries**: Use MySQL slow query log for optimization
5. **Character Sets**: Always use utf8mb4 for emoji support

---

**Success!** 🎉 Your database is ready to use with the Dark Chic Emporium platform!

