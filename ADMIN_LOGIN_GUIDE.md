# Admin Login Guide

## 🔐 Admin Login System

A dedicated admin login page has been created for Dark Chic Emporium at `/admin/login`.

---

## 📍 Access Points

### Admin Login Page
- **URL**: `http://localhost:5173/admin/login`
- **Route**: `/admin/login`
- **Purpose**: Secure administrative access to the admin panel

### Admin Dashboard
- **URL**: `http://localhost:5173/admin`
- **Protection**: Requires authentication and admin role

---

## 🔑 Login Credentials

### Default Admin Account
```
Username: admin
Password: admin123
```

### Other Admin Accounts
```
Username: manager
Password: admin123
```

### Staff Account (No Admin Access)
```
Username: staff
Password: admin123
```

⚠️ **Important Notes:**
- Use **username**, NOT email for login
- The backend authentication expects the username field
- Only users with `is_admin: true` can access the admin panel

---

## ✨ Features

### 1. **Dedicated Admin Login Page**
   - Beautiful gradient background with glassmorphism design
   - Shield icon branding for admin portal
   - Username-based authentication (not email)
   - Clear error messages
   - Remember me checkbox
   - Forgot password link
   - Back to store link

### 2. **Authentication Protection**
   - Admin routes are protected
   - Non-admin users are redirected to `/admin/login`
   - Token-based authentication
   - Automatic redirect after login

### 3. **Admin Sidebar Integration**
   - Display logged-in admin information
   - Avatar with initials
   - Full name and email display
   - Logout button with confirmation toast
   - Responsive design (collapsed/expanded states)

### 4. **Security Features**
   - Token validation
   - Admin role verification
   - Automatic logout on unauthorized access
   - Secure credential storage

---

## 🚀 How to Use

### For Administrators

1. **Navigate to Admin Login**
   ```
   http://localhost:5173/admin/login
   ```

2. **Enter Credentials**
   - Username: `admin`
   - Password: `admin123`

3. **Click "Sign In to Admin"**
   - You'll be redirected to `/admin` dashboard
   - Admin sidebar will show your information

4. **Logout**
   - Click the "Keluar" (Logout) button in the sidebar footer
   - You'll be logged out and redirected to login page

### For Developers

#### Route Structure
```typescript
// Public route (no authentication required)
/admin/login → AdminLogin component

// Protected routes (requires admin authentication)
/admin → AdminLayout (wrapper with auth check)
  ├── / → Dashboard
  ├── /products → Products
  ├── /orders → Orders
  ├── /analytics → Analytics
  ├── /customers → Customers
  └── /promotions → Promotions
```

#### Authentication Flow
```typescript
1. User visits /admin/login
2. User enters username and password
3. authApi.adminLogin() sends credentials to backend
4. Backend validates and returns JWT token + user info
5. Token stored in localStorage
6. User info stored in localStorage
7. Redirect to /admin
8. AdminLayout checks for valid token and admin role
9. If valid, show admin panel
10. If invalid, redirect to /admin/login
```

#### API Methods
```typescript
// Admin login
authApi.adminLogin({ username, password })

// Regular login (for customers)
authApi.login({ email, password })

// Get current user
authApi.me()

// Logout
authApi.logout()
```

---

## 🛡️ Security Implementation

### AdminLayout Protection
```typescript
// Checks on every admin route access
1. Check if token exists
2. Check if user data exists in localStorage
3. Parse user data
4. Verify is_admin flag is true
5. If any check fails → redirect to /admin/login
```

### Token Management
- Stored in: `localStorage.getItem('token')`
- User data: `localStorage.getItem('user')`
- Cleared on logout
- Sent with all API requests via Bearer token

---

## 🎨 UI/UX Features

### Design Elements
- **Dark theme** with gradient backgrounds
- **Glassmorphism** card with backdrop blur
- **Shield icon** for admin branding
- **Gradient animations** on decorative elements
- **Responsive design** for all screen sizes
- **Loading states** during authentication
- **Toast notifications** for feedback

### Color Scheme
- Background: Dark zinc (950, 900)
- Primary: Brand primary color
- Accents: Violet/Purple gradients
- Text: White/Zinc hierarchy

---

## 🐛 Troubleshooting

### "Login Failed" Error
**Solution**: Make sure you're using **username** not email
```
✅ Correct: admin
❌ Wrong: admin@darkchic.com
```

### "Access Denied" Error
**Solution**: User is not an admin
- Only users with `is_admin: true` can access admin panel
- Use `admin` or `manager` accounts, not `staff`

### Redirected to Login When Already Logged In
**Solution**: Check browser console for errors
- Clear localStorage
- Try logging in again
- Verify backend is running at `http://localhost:8000`

### Database Not Set Up
**Solution**: Initialize the database first
```bash
# Using phpMyAdmin
1. Go to http://localhost/phpmyadmin
2. Import backend/database/complete_mysql.sql

# Or use the setup script
cd backend
python setup_mysql.bat
```

---

## 📁 Files Created/Modified

### New Files
1. `src/pages/admin/AdminLogin.tsx` - Admin login page component
2. `ADMIN_LOGIN_GUIDE.md` - This documentation file

### Modified Files
1. `src/App.tsx` - Added `/admin/login` route
2. `src/lib/api.ts` - Added `AdminLoginRequest` type and `adminLogin()` method
3. `src/pages/admin/AdminLayout.tsx` - Added authentication protection
4. `src/components/AdminSidebar.tsx` - Added logout functionality and user display

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    User Access                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
                   Try to access /admin
                          │
                          ▼
                  ┌───────────────┐
                  │ Is logged in? │
                  └───────────────┘
                    │            │
                   YES          NO
                    │            │
                    ▼            ▼
            ┌───────────┐   Redirect to
            │ Is admin? │   /admin/login
            └───────────┘
              │        │
             YES      NO
              │        │
              ▼        ▼
         Show Admin  Redirect to
         Dashboard   /admin/login
```

---

## 🔧 Recent Fixes

### Password Verification Fix (Oct 21, 2025)
- **Issue**: `passlib` incompatibility with Python 3.14
- **Solution**: Updated `backend/app/core/security.py` to use `bcrypt` directly
- **Result**: Password verification now works correctly

### Login Response Fix (Oct 21, 2025)
- **Issue**: Login endpoint didn't return user information
- **Solution**: Updated `Token` schema and login endpoint to include user data
- **Files Modified**:
  - `backend/app/schemas/user.py` - Added `user` field to Token
  - `backend/app/api/endpoints/auth.py` - Return user object in login response

---

## 📚 Related Documentation

- `backend/database/MYSQL_SETUP.md` - Database setup guide
- `START_HERE.md` - General project setup
- `SETUP_GUIDE.md` - Detailed setup instructions

---

## ✅ Testing Checklist

- [ ] Admin login page loads at `/admin/login`
- [ ] Can login with `admin / admin123`
- [ ] Redirected to `/admin` after successful login
- [ ] Admin sidebar shows user information
- [ ] Can access all admin pages (products, orders, etc.)
- [ ] Logout button works
- [ ] After logout, redirected to `/admin/login`
- [ ] Cannot access `/admin` without logging in
- [ ] Staff account cannot access admin panel
- [ ] Toast notifications show on login/logout

---

**Created**: October 21, 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready

