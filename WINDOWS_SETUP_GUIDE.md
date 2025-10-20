# 🪟 Windows Setup Guide - Dark Chic Emporium

Complete step-by-step guide for Windows users to install Python and run the project.

---

## 📋 Prerequisites Check

Before starting, check what you have:

### Check if Python is Installed
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Type: `python --version`

If you see "Python 3.x.x" → You have Python ✅  
If you see "not recognized" → You need to install Python ⬇️

### Check if Node.js is Installed
1. In the same command prompt, type: `node --version`

If you see "v18.x.x" or higher → You have Node.js ✅  
If you see "not recognized" → You need to install Node.js ⬇️

---

## 🐍 Part 1: Install Python (5 minutes)

### Step 1: Download Python

1. Go to: https://www.python.org/downloads/
2. Click the big yellow button: **"Download Python 3.12.x"**
3. Save the installer file (e.g., `python-3.12.0-amd64.exe`)

### Step 2: Install Python

1. **Double-click** the downloaded installer
2. ⚠️ **IMPORTANT**: Check the box **"Add Python to PATH"** at the bottom!
3. Click **"Install Now"**
4. Wait for installation (2-3 minutes)
5. Click **"Close"** when done

### Step 3: Verify Python Installation

1. Open **NEW** Command Prompt (close old one if open)
2. Type: `python --version`
3. Should see: `Python 3.12.x` ✅
4. Type: `pip --version`
5. Should see: `pip 23.x.x` ✅

**If you still see "not recognized":**
- Restart your computer
- Open Command Prompt again and try

---

## 📦 Part 2: Install Node.js (If Not Installed)

### Step 1: Download Node.js

1. Go to: https://nodejs.org/
2. Download the **LTS version** (e.g., 20.x.x)
3. Save the installer

### Step 2: Install Node.js

1. Double-click the installer
2. Click **Next** through all steps
3. Accept the license agreement
4. Click **Install**
5. Click **Finish**

### Step 3: Verify Node.js

1. Open **NEW** Command Prompt
2. Type: `node --version`
3. Should see: `v20.x.x` or similar ✅
4. Type: `npm --version`
5. Should see: `10.x.x` or similar ✅

---

## 🚀 Part 3: Setup & Run Backend (10 minutes)

### Step 1: Open Project in Command Prompt

1. Press `Win + E` (opens File Explorer)
2. Navigate to your project folder:
   ```
   C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1
   ```
3. Type `cmd` in the address bar at the top
4. Press Enter (Command Prompt opens in this folder)

### Step 2: Navigate to Backend Folder

In Command Prompt, type:
```cmd
cd backend
```

### Step 3: Install Python Dependencies

Type this command (will take 2-3 minutes):
```cmd
pip install -r requirements.txt
```

You should see:
```
Collecting fastapi==0.104.1
Collecting uvicorn[standard]==0.24.0
... (many lines)
Successfully installed fastapi-0.104.1 ...
```

**If you see errors:**
```cmd
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Install MySQL Driver

```cmd
pip install pymysql cryptography
```

### Step 5: Verify MySQL Database

Make sure:
- ✅ XAMPP/WAMP is running
- ✅ MySQL service is started
- ✅ Database `fanatichearts` exists
- ✅ Tables are imported from `complete_mysql.sql`

### Step 6: Start Backend Server

```cmd
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend is running!** Keep this window open.

Test it: Open browser → http://localhost:8000

Should see:
```json
{
  "message": "Dark Chic Emporium API",
  "version": "1.0.0",
  "status": "running",
  "docs": "/api/docs"
}
```

---

## 🎨 Part 4: Setup & Run Frontend (5 minutes)

### Step 1: Open NEW Command Prompt

1. Press `Win + R`
2. Type `cmd`
3. Press Enter

### Step 2: Navigate to Project

```cmd
cd C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1
```

### Step 3: Install Frontend Dependencies

```cmd
npm install
```

This will take 2-5 minutes. You'll see:
```
added 1234 packages in 3m
```

### Step 4: Start Frontend Server

```cmd
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **Frontend is running!** Keep this window open too.

---

## 🧪 Part 5: Test Everything Works

### Test 1: Backend API

1. Open browser
2. Go to: http://localhost:8000/api/docs
3. Should see **Swagger API Documentation** ✅
4. Try the `/products` endpoint
5. Click "Try it out" → "Execute"
6. Should see your 18 products ✅

### Test 2: Frontend

1. Open new browser tab
2. Go to: http://localhost:5173
3. Should see the **Dark Chic Emporium** homepage ✅

### Test 3: Admin Login

1. On the homepage, click **"Sign In"** (top right)
2. Or go directly to: http://localhost:5173/auth
3. Enter:
   - **Email**: `admin@darkchic.com`
   - **Password**: `admin123`
4. Click **"Sign In"**
5. Should redirect to **Admin Dashboard** ✅

**Success!** 🎉 Everything is working!

---

## 📝 Summary - How to Run Project

### Every Time You Want to Run the Project:

**Terminal 1 - Backend:**
```cmd
cd C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1\backend
python run.py
```

**Terminal 2 - Frontend:**
```cmd
cd C:\Users\GALIH HAVID\OneDrive\Documents\dark-chic-emporium-1
npm run dev
```

**Then open browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "python is not recognized"

**Solution:**
1. Uninstall Python
2. Reinstall Python
3. ⚠️ **Check "Add Python to PATH"** during installation!
4. Restart computer
5. Try again

### Issue 2: "pip is not recognized"

**Solution:**
```cmd
python -m pip --version
```

If that works, use `python -m pip` instead of `pip`:
```cmd
python -m pip install -r requirements.txt
```

### Issue 3: Backend shows "Can't connect to MySQL"

**Solution:**
1. Open XAMPP/WAMP
2. Start MySQL service (click "Start" next to MySQL)
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Check database `fanatichearts` exists
5. Stop backend (CTRL+C)
6. Start backend again: `python run.py`

### Issue 4: Backend shows "ModuleNotFoundError: No module named 'pymysql'"

**Solution:**
```cmd
pip install pymysql cryptography
```

### Issue 5: Frontend shows "npm is not recognized"

**Solution:**
1. Install Node.js (see Part 2 above)
2. Restart Command Prompt
3. Try again

### Issue 6: Port 8000 or 5173 already in use

**Solution:**

For backend (port 8000):
```cmd
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

For frontend (port 5173):
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Issue 7: Login doesn't work

**Solution:**
1. Check backend is running (http://localhost:8000)
2. Press F12 in browser (Developer Tools)
3. Go to "Console" tab
4. Look for error messages
5. Check "Network" tab to see if requests are being sent

**Common fix:**
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito/private window
- Verify backend shows no errors in its terminal

---

## 📁 Folder Structure

```
dark-chic-emporium-1/
├── backend/              ← Python/FastAPI backend
│   ├── app/
│   ├── database/
│   ├── requirements.txt  ← Python dependencies
│   └── run.py           ← Start backend
│
├── src/                 ← React/TypeScript frontend
│   ├── pages/
│   ├── components/
│   └── lib/
│
├── package.json         ← Frontend dependencies
└── WINDOWS_SETUP_GUIDE.md  ← This file
```

---

## 🎯 Quick Commands Cheat Sheet

### Backend Commands
```cmd
cd backend
pip install -r requirements.txt    # Install dependencies
pip install pymysql cryptography   # Install MySQL driver
python run.py                      # Start backend
```

### Frontend Commands
```cmd
npm install        # Install dependencies (first time only)
npm run dev       # Start frontend
npm run build     # Build for production
```

### Stop Servers
- Backend: Press `CTRL+C` in backend terminal
- Frontend: Press `CTRL+C` in frontend terminal

---

## ✅ Final Checklist

Before starting the project, ensure:

- [x] Python 3.12+ installed
- [x] Node.js 18+ installed
- [x] XAMPP/WAMP MySQL running
- [x] Database `fanatichearts` exists and has data
- [x] Backend dependencies installed (`pip install -r requirements.txt`)
- [x] Frontend dependencies installed (`npm install`)
- [x] MySQL driver installed (`pip install pymysql cryptography`)

Then:
- [x] Start backend: `python run.py`
- [x] Start frontend: `npm run dev`
- [x] Test login: http://localhost:5173/auth

---

## 🎊 You're All Set!

**Your development environment is ready!**

### What You Can Do Now:

✅ Browse products at http://localhost:5173  
✅ Login to admin panel with admin@darkchic.com / admin123  
✅ Manage products, orders, customers  
✅ View sales analytics  
✅ Test checkout process  
✅ Create promotions  

### Happy Coding! 🚀

---

## 📞 Need More Help?

Check these resources:
- **API Documentation**: http://localhost:8000/api/docs
- **QUICK_START.md**: Quick reference guide
- **SETUP_GUIDE.md**: Detailed setup instructions
- **INTEGRATION_STATUS.md**: Integration checklist

Or check:
- Python official docs: https://docs.python.org/3/
- FastAPI docs: https://fastapi.tiangolo.com/
- React docs: https://react.dev/
- Vite docs: https://vitejs.dev/

---

**Created for Windows users | Last updated: 2025-10-20**

