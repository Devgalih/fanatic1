@echo off
echo ================================
echo  MySQL Database Setup
echo ================================
echo.
echo This will create the darkchic_db database
echo with schema and sample data.
echo.
echo Prerequisites:
echo  - MySQL/MariaDB running
echo  - MySQL command line available
echo.
pause

echo.
echo Creating database and importing data...
echo.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS darkchic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p darkchic_db < database\complete_mysql.sql

echo.
echo ================================
echo  Setup Complete!
echo ================================
echo.
echo Database: darkchic_db
echo.
echo You can now login with:
echo   Username: admin
echo   Password: admin123
echo.
pause

