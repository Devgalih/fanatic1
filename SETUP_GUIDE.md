# 🚀 Dark Chic Emporium - Setup Guide

## ✅ Database Setup (COMPLETED)

You've already imported `complete_mysql.sql` to your MySQL database `fanatichearts`. Great!

## 🔧 Backend Setup

### Step 1: Install Python Dependencies

Open Command Prompt or PowerShell in the `backend` folder and run:

```bash
pip install pymysql cryptography
```

Or if pip is not in PATH:
```bash
python -m pip install pymysql cryptography
```

Or install all dependencies:
```bash
pip install -r requirements.txt
```

### Step 2: Configure Database Connection

The database is already configured to connect to MySQL database `fanatichearts` at:
```
mysql+pymysql://root:@localhost/fanatichearts
```

If your MySQL has a password, update `backend/app/core/config.py` line 20:
```python
DATABASE_URL: str = "mysql+pymysql://root:YOUR_PASSWORD@localhost/fanatichearts"
```

### Step 3: Start Backend Server

```bash
cd backend
python run.py
```

The backend will start at: **http://localhost:8000**

API Documentation: **http://localhost:8000/api/docs**

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Frontend

```bash
npm run dev
```

The frontend will start at: **http://localhost:5173**

## 🧪 Test the Connection

### Test Backend API

1. Open browser: http://localhost:8000
2. Should see: `{"message": "Dark Chic Emporium API", ...}`

### Test API Documentation

1. Open: http://localhost:8000/api/docs
2. Try the `/api/v1/products` endpoint
3. Should see your 18 products from database

### Test Login

1. Open frontend: http://localhost:5173
2. Go to Admin: http://localhost:5173/admin
3. Login with:
   - Email: `admin@darkchic.com`
   - Password: `admin123`

## 📊 Backend API Endpoints

Base URL: `http://localhost:8000/api/v1`

### Authentication
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /auth/me` - Get current user

### Products
- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create product (Admin)
- `PUT /products/{id}` - Update product (Admin)
- `DELETE /products/{id}` - Delete product (Admin)

### Orders
- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get order by ID
- `POST /orders` - Create order
- `PUT /orders/{id}` - Update order (Admin)

### Customers
- `GET /customers` - Get all customers
- `GET /customers/{id}` - Get customer by ID

### Promotions
- `GET /promotions` - Get all promotions
- `POST /promotions/validate` - Validate promo code

### Analytics (Admin)
- `GET /analytics/dashboard` - Dashboard stats
- `GET /analytics/sales` - Sales report
- `GET /analytics/products` - Product performance

## 🔑 Default Admin Credentials

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@darkchic.com | admin123 | Admin |
| manager | manager@darkchic.com | admin123 | Admin |
| staff | staff@darkchic.com | admin123 | Staff |

## 🐛 Troubleshooting

### Backend Issues

**Error: "No module named 'pymysql'"**
```bash
pip install pymysql cryptography
```

**Error: "Can't connect to MySQL server"**
- Make sure MySQL is running
- Check database name is correct: `fanatichearts`
- Verify username/password in config.py

**Error: "Access denied for user"**
- Update password in `backend/app/core/config.py`
- Use correct MySQL credentials

### Frontend Issues

**Error: "Failed to fetch"**
- Make sure backend is running on port 8000
- Check CORS settings in `backend/app/core/config.py`

**Error: "Network Error"**
- Backend might not be running
- Start backend: `cd backend && python run.py`

## 📝 Frontend API Configuration

The frontend will automatically connect to:
- Development: `http://localhost:8000/api/v1`
- Production: Update API URL in frontend config

## ✨ Next Steps

1. **Start Backend**: `cd backend && python run.py`
2. **Start Frontend**: `npm run dev`
3. **Open Admin**: http://localhost:5173/admin
4. **Login**: admin@darkchic.com / admin123
5. **Explore**: Try creating products, orders, etc.

## 🎯 Features to Test

### Admin Dashboard
- ✅ View sales analytics
- ✅ Manage products (CRUD)
- ✅ View and update orders
- ✅ Manage customers
- ✅ Create/edit promotions

### Customer Frontend
- ✅ Browse products
- ✅ Filter by category/release tag
- ✅ Add to cart
- ✅ Checkout
- ✅ Track orders

## 🔐 Security Notes

⚠️ **Important**: 
- Change default admin passwords in production
- Update `SECRET_KEY` in config.py
- Enable HTTPS in production
- Set `DEBUG=False` in production

## 📞 Need Help?

Check these files:
- Backend config: `backend/app/core/config.py`
- Database models: `backend/app/models/`
- API endpoints: `backend/app/api/endpoints/`
- Frontend pages: `src/pages/`

---

**Ready to go!** 🚀

Start both backend and frontend, then access the admin panel to manage your e-commerce store!

