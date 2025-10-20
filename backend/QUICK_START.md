# Quick Start Guide - Backend API

## 🚀 Cara Cepat Menjalankan Backend

### Step 1: Install Python
Pastikan Python 3.8+ sudah terinstall:
```bash
python --version
```

### Step 2: Setup Virtual Environment
```bash
# Buka terminal di folder backend
cd backend

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Buat Folder yang Diperlukan
```bash
# Folder akan otomatis dibuat, tapi pastikan ada:
mkdir database
mkdir uploads
```

### Step 5: Jalankan Server
```bash
# Cara 1: Menggunakan run.py
python run.py

# Cara 2: Menggunakan uvicorn
uvicorn app.main:app --reload --port 8000

# Cara 3: Menggunakan python -m
python -m app.main
```

Server akan berjalan di: **http://localhost:8000**

### Step 6: Akses API Documentation
Buka browser dan akses:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## 📝 Testing API

### 1. Health Check
```bash
curl http://localhost:8000/health
```

### 2. Get Products
```bash
curl http://localhost:8000/api/v1/products/
```

### 3. Register Admin User
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@darkchic.com",
    "username": "admin",
    "password": "admin123",
    "full_name": "Admin User"
  }'
```

### 4. Login
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

## 🔧 Troubleshooting

### Error: Port already in use
```bash
# Ubah port di .env atau gunakan port lain:
uvicorn app.main:app --reload --port 8001
```

### Error: Module not found
```bash
# Install ulang dependencies:
pip install -r requirements.txt --upgrade
```

### Error: Database tidak bisa dibuat
```bash
# Pastikan folder database ada:
mkdir database

# Atau hapus database lama dan buat baru:
rm database/ecommerce.db
python run.py
```

## 💡 Tips

1. **Development Mode**: Gunakan `--reload` untuk auto-reload saat edit code
2. **Production Mode**: Ubah `DEBUG=False` di `.env`
3. **Database**: Default menggunakan SQLite, bisa diganti ke PostgreSQL/MySQL
4. **CORS**: Sudah dikonfigurasi untuk localhost:8081 (frontend)

## 📱 Connect dengan Frontend

Frontend React Anda sudah berjalan di `http://localhost:8081`

Untuk menghubungkan:

1. Backend API sudah support CORS
2. Base URL API: `http://localhost:8000/api/v1`
3. Buat file `frontend/src/api/config.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:8000/api/v1';
```

## 🎯 Next Steps

1. ✅ Jalankan backend API
2. ✅ Test di Swagger UI
3. ✅ Integrate dengan frontend
4. ✅ Add sample data
5. ✅ Deploy to production

Happy coding! 🚀

