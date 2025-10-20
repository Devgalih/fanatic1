@echo off
echo ================================
echo  Dark Chic Emporium - Frontend
echo ================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing dependencies... (This may take a few minutes)
    call npm install
)

echo.
echo ================================
echo  Starting Frontend Server...
echo ================================
echo.
echo Frontend will be available at:
echo   http://localhost:5173
echo.
echo Press CTRL+C to stop the server
echo.

npm run dev

