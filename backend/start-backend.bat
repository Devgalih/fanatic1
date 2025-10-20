@echo off
echo ================================
echo  Dark Chic Emporium - Backend
echo ================================
echo.

:: Check if Python is installed
py --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed!
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation!
    pause
    exit /b 1
)

echo [OK] Python is installed
echo.

:: Check if dependencies are installed
echo Checking dependencies...
py -m pip show pymysql >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing dependencies...
    py -m pip install -r requirements.txt
)

echo.
echo ================================
echo  Starting Backend Server...
echo ================================
echo.
echo Backend will be available at:
echo   http://localhost:8000
echo   API Docs: http://localhost:8000/api/docs
echo.
echo Press CTRL+C to stop the server
echo.

py run.py

