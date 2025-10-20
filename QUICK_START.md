# 🚀 Quick Start - Dark Chic Emporium

## ✅ What You've Done

- ✅ Database created: `fanatichearts`
- ✅ Tables & data imported from `complete_mysql.sql`
- ✅ Backend configured to connect to MySQL
- ✅ Frontend API integration set up

## 📦 Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
pip install pymysql cryptography
```

Or install all:
```bash
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
npm install
```

## 🚀 Start the Application

### Terminal 1: Start Backend

```bash
cd backend
python run.py
```

✅ Backend running at: **http://localhost:8000**  
📚 API Docs at: **http://localhost:8000/api/docs**

### Terminal 2: Start Frontend

```bash
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

## 🧪 Test the Setup

### 1. Test Backend Connection

Open: http://localhost:8000

Should see:
```json
{
  "message": "Dark Chic Emporium API",
  "version": "1.0.0",
  "status": "running"
}
```

### 2. Test API Documentation

Open: http://localhost:8000/api/docs

Try the `/products` endpoint - should see your 18 products!

### 3. Test Admin Login

1. Open: http://localhost:5173
2. Click "Sign In" or go to: http://localhost:5173/admin
3. Login with:
   - Email: `admin@darkchic.com`
   - Password: `admin123`
4. Should redirect to Admin Dashboard ✅

## 🎯 What's Working

✅ **Database Connection**: Backend → MySQL (fanatichearts)  
✅ **Authentication**: Login with real credentials  
✅ **API Integration**: Frontend → Backend API  
✅ **Admin Access**: Dashboard, Products, Orders, etc.

## 📊 Admin Features

After logging in as admin, you can:

- **Dashboard** (`/admin`) - View sales analytics
- **Products** (`/admin/products`) - Manage 18 products
- **Orders** (`/admin/orders`) - View & update 12 orders
- **Customers** (`/admin/customers`) - View 10 customers
- **Promotions** (`/admin/promotions`) - Manage 8 promo codes
- **Analytics** (`/admin/analytics`) - Sales reports

## 🔑 Test Accounts

| Email | Password | Role | Access |
|-------|----------|------|--------|
| admin@darkchic.com | admin123 | Admin | Full access |
| manager@darkchic.com | admin123 | Admin | Full access |
| staff@darkchic.com | admin123 | Staff | Limited access |

## 🐛 Troubleshooting

### Backend Won't Start

**Error: "No module named 'pymysql'"**
```bash
pip install pymysql cryptography
```

**Error: "Can't connect to MySQL"**
- Check MySQL is running (XAMPP/WAMP)
- Verify database name: `fanatichearts`
- Check password in `backend/app/core/config.py` line 20

### Frontend Shows "Failed to Fetch"

**Solution:**
1. Make sure backend is running: http://localhost:8000
2. Check console for errors (F12)
3. Verify CORS settings in backend

### Login Doesn't Work

**Check:**
1. Backend is running on port 8000
2. Open browser console (F12) to see errors
3. Try API docs: http://localhost:8000/api/docs
4. Test login endpoint directly

## 📁 Project Structure

```
dark-chic-emporium-1/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Config & database
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── main.py       # FastAPI app
│   ├── database/
│   │   └── complete_mysql.sql  # Database dump
│   ├── requirements.txt  # Python dependencies
│   └── run.py           # Start backend
│
├── src/
│   ├── pages/
│   │   ├── admin/       # Admin pages
│   │   └── Auth.tsx     # Login page
│   ├── lib/
│   │   └── api.ts       # API client
│   └── config/
│       └── api.config.ts
│
├── SETUP_GUIDE.md       # Detailed setup
├── QUICK_START.md       # This file
└── package.json         # Frontend dependencies
```

## 🔗 Important URLs

### Development
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- Admin Panel: http://localhost:5173/admin

### Database
- Database: `fanatichearts`
- Host: `localhost`
- User: `root`
- Password: (empty or your MySQL password)

## ✨ Next Steps

1. ✅ **Test Login**: Try logging in with admin credentials
2. ✅ **View Products**: Check the products page
3. ✅ **Create Order**: Try the checkout process
4. ✅ **Admin Panel**: Explore admin features
5. ✅ **Customize**: Start modifying for your needs!

## 📞 Need Help?

### Check These Files:
- **Backend config**: `backend/app/core/config.py`
- **API endpoints**: `backend/app/api/endpoints/`
- **Frontend API**: `src/lib/api.ts`
- **Database**: Use phpMyAdmin to view data

### Common Issues:
- Backend not starting → Install dependencies
- Login fails → Check backend is running
- No data showing → Verify database connection
- CORS errors → Check CORS settings in config.py

---

## 🎉 You're Ready!

Both backend and frontend are configured and ready to go.

**Start coding and building your e-commerce platform!** 🚀

---

**Quick Commands:**

```bash
# Backend
cd backend && python run.py

# Frontend (new terminal)
npm run dev

# Login at http://localhost:5173
# Email: admin@darkchic.com
# Password: admin123
```

Good luck! 🎊

