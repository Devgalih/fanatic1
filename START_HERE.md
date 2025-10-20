# 🚀 START HERE - Complete Setup Guide

## 📌 What You Need to Do

Follow these 3 main steps to get everything running:

```
Step 1: Install Python & Node.js (One-time setup)
Step 2: Start Backend Server
Step 3: Start Frontend Server
```

---

## 🔧 STEP 1: Install Python & Node.js (First Time Only)

### A. Install Python

1. **Download Python**
   - Go to: https://www.python.org/downloads/
   - Click: **"Download Python 3.12.x"**

2. **Install Python**
   - Double-click the downloaded file
   - ⚠️ **IMPORTANT**: Check ☑ **"Add Python to PATH"**
   - Click "Install Now"
   - Wait 2-3 minutes
   - Click "Close"

3. **Verify Installation**
   - Press `Win + R`
   - Type: `cmd` and press Enter
   - Type: `python --version`
   - Should see: `Python 3.12.x` ✅

### B. Install Node.js

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Click: **"Download LTS"**

2. **Install Node.js**
   - Double-click the downloaded file
   - Click "Next" → "Next" → "Install"
   - Click "Finish"

3. **Verify Installation**
   - Open Command Prompt
   - Type: `node --version`
   - Should see: `v20.x.x` ✅

---

## 🚀 STEP 2: Start Backend Server

### Option A: Double-Click Method (Easiest)

1. Open folder: `backend`
2. **Double-click**: `start-backend.bat`
3. A black window will open and show the backend running ✅

### Option B: Manual Method

1. Open Command Prompt
2. Type:
   ```cmd
   cd C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1\backend
   python run.py
   ```

### ✅ Backend is Running When You See:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**Test it**: Open browser → http://localhost:8000  
Should see: `{"message": "Dark Chic Emporium API", ...}`

**⚠️ Keep this window open!** Don't close it.

---

## 🎨 STEP 3: Start Frontend Server

### Option A: Double-Click Method (Easiest)

1. Go back to main project folder
2. **Double-click**: `start-frontend.bat`
3. A new black window will open and show the frontend running ✅

### Option B: Manual Method

1. Open **NEW** Command Prompt
2. Type:
   ```cmd
   cd C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1
   npm run dev
   ```

### ✅ Frontend is Running When You See:

```
  VITE v5.x.x  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
```

**⚠️ Keep this window open too!** Don't close it.

---

## 🧪 STEP 4: Test Everything

### Test 1: Open the Website

1. Open browser
2. Go to: **http://localhost:5173**
3. You should see the Dark Chic Emporium homepage ✅

### Test 2: Login as Admin

1. Click **"Sign In"** (top right)
2. Enter:
   - Email: `admin@darkchic.com`
   - Password: `admin123`
3. Click **"Sign In"**
4. You should see the **Admin Dashboard** ✅

### Test 3: View API Documentation

1. Open new tab
2. Go to: **http://localhost:8000/api/docs**
3. You should see **Swagger API Documentation** ✅

---

## 🎯 Summary - Quick Reference

### To Run the Project:

**Every time you want to run the project:**

1. **Start Backend**:
   - Double-click: `backend/start-backend.bat`
   - OR run: `cd backend && python run.py`

2. **Start Frontend**:
   - Double-click: `start-frontend.bat`
   - OR run: `npm run dev`

3. **Open Browser**:
   - Go to: http://localhost:5173

### To Stop the Project:

- Press `CTRL + C` in both Command Prompt windows
- Or simply close both black windows

---

## 📁 Important Files

```
dark-chic-emporium-1/
│
├── START_HERE.md              ← This file
├── WINDOWS_SETUP_GUIDE.md     ← Detailed Windows guide
├── start-frontend.bat         ← Click to start frontend
│
└── backend/
    ├── start-backend.bat      ← Click to start backend
    └── run.py                 ← Backend entry point
```

---

## 🐛 Common Problems & Solutions

### Problem 1: "python is not recognized"

**Solution:**
- You didn't check "Add Python to PATH" during installation
- **Fix**: Uninstall Python → Reinstall → Check the PATH box ☑

### Problem 2: "node is not recognized"

**Solution:**
- Node.js not installed correctly
- **Fix**: Download and install from https://nodejs.org/

### Problem 3: Backend won't start - "Can't connect to MySQL"

**Solution:**
- MySQL is not running
- **Fix**: 
  1. Open XAMPP or WAMP
  2. Click "Start" next to MySQL
  3. Try starting backend again

### Problem 4: Backend won't start - "No module named 'pymysql'"

**Solution:**
- Dependencies not installed
- **Fix**:
  ```cmd
  cd backend
  pip install pymysql cryptography
  python run.py
  ```

### Problem 5: Frontend shows blank page

**Solution:**
- Backend not running or wrong port
- **Fix**:
  1. Make sure backend is running on port 8000
  2. Check http://localhost:8000 shows the API
  3. Press F12 in browser to see error messages

### Problem 6: Login doesn't work

**Solution:**
- Check backend console for errors
- Make sure database has data
- Try:
  1. Open http://localhost:8000/api/docs
  2. Test the `/auth/login` endpoint directly
  3. Use: `admin@darkchic.com` / `admin123`

---

## 🆘 Need More Help?

### Check These Files:
- **WINDOWS_SETUP_GUIDE.md** - Complete Windows installation guide
- **SETUP_GUIDE.md** - Detailed setup instructions
- **QUICK_START.md** - Quick reference
- **INTEGRATION_STATUS.md** - What's been set up

### Check Browser Console:
1. Press `F12` in browser
2. Click "Console" tab
3. Look for red error messages

### Check Backend Terminal:
- Look for error messages in the backend window
- Copy any error messages to search online

---

## ✅ Checklist

Before you start, make sure:

- [ ] Python installed (test: `python --version`)
- [ ] Node.js installed (test: `node --version`)
- [ ] XAMPP/WAMP MySQL is running
- [ ] Database `fanatichearts` exists with data
- [ ] Backend window is open and running
- [ ] Frontend window is open and running
- [ ] Browser showing http://localhost:5173

---

## 🎉 You're Ready!

Once both servers are running:

✅ **Browse Products**: http://localhost:5173  
✅ **Admin Dashboard**: Login with admin@darkchic.com / admin123  
✅ **API Docs**: http://localhost:8000/api/docs  

**Happy coding!** 🚀

---

## 📞 Quick Links

| What | URL |
|------|-----|
| Frontend | http://localhost:5173 |
| Admin Login | admin@darkchic.com / admin123 |
| Backend API | http://localhost:8000 |
| API Documentation | http://localhost:8000/api/docs |
| phpMyAdmin | http://localhost/phpmyadmin |

---

**Last Updated**: 2025-10-20  
**For**: Windows Users

