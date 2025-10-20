#!/usr/bin/env python3
"""
Database Initialization Script
================================
This script initializes the database with schema and sample data.

Usage:
    python backend/database/init_db.py
    python backend/database/init_db.py --force    # Force recreate
    python backend/database/init_db.py --schema-only    # Only create schema
    python backend/database/init_db.py --seed-only    # Only insert data
"""

import sqlite3
import os
import sys
import argparse
from pathlib import Path

# Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(message):
    """Print colored header"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{message.center(60)}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")

def print_success(message):
    """Print success message"""
    print(f"{Colors.OKGREEN}✓ {message}{Colors.ENDC}")

def print_error(message):
    """Print error message"""
    print(f"{Colors.FAIL}✗ {message}{Colors.ENDC}")

def print_warning(message):
    """Print warning message"""
    print(f"{Colors.WARNING}⚠ {message}{Colors.ENDC}")

def print_info(message):
    """Print info message"""
    print(f"{Colors.OKCYAN}ℹ {message}{Colors.ENDC}")

def get_db_path():
    """Get the database file path"""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    db_path = script_dir / "ecommerce.db"
    return db_path

def get_sql_file_path(filename):
    """Get the SQL file path"""
    script_dir = Path(__file__).parent
    sql_path = script_dir / filename
    return sql_path

def check_db_exists():
    """Check if database already exists"""
    db_path = get_db_path()
    return db_path.exists()

def create_database():
    """Create the database file if it doesn't exist"""
    db_path = get_db_path()
    
    # Ensure directory exists
    db_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Create empty database file
    conn = sqlite3.connect(db_path)
    conn.close()
    
    print_success(f"Database file created: {db_path}")

def run_sql_file(db_path, sql_file_path):
    """Execute SQL file"""
    try:
        # Read SQL file
        with open(sql_file_path, 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Enable foreign keys
        cursor.execute("PRAGMA foreign_keys = ON;")
        
        # Execute SQL statements
        cursor.executescript(sql_content)
        
        conn.commit()
        conn.close()
        
        return True
    except Exception as e:
        print_error(f"Error executing {sql_file_path.name}: {str(e)}")
        return False

def display_summary(db_path):
    """Display summary of database contents"""
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print_header("Database Summary")
        
        tables = [
            ('users', 'Users'),
            ('customers', 'Customers'),
            ('categories', 'Categories'),
            ('products', 'Products'),
            ('product_images', 'Product Images'),
            ('orders', 'Orders'),
            ('order_items', 'Order Items'),
            ('promotions', 'Promotions'),
        ]
        
        for table_name, display_name in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"  {display_name:.<40} {count:>5} records")
        
        print()
        
        # Display admin accounts
        print_info("Default Admin Accounts:")
        cursor.execute("SELECT username, email, is_admin FROM users ORDER BY id")
        users = cursor.fetchall()
        for username, email, is_admin in users:
            role = "Admin" if is_admin else "Staff"
            print(f"  • {username:.<20} {email:.<30} [{role}]")
        
        print()
        print_warning("Default Password: admin123")
        print_warning("⚠ Remember to change passwords in production!")
        
        conn.close()
        
    except Exception as e:
        print_error(f"Error displaying summary: {str(e)}")

def delete_database(db_path):
    """Delete existing database"""
    try:
        if db_path.exists():
            os.remove(db_path)
            print_success(f"Deleted existing database: {db_path}")
        return True
    except Exception as e:
        print_error(f"Error deleting database: {str(e)}")
        return False

def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description='Initialize Dark Chic Emporium Database',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python init_db.py                 # Full initialization
  python init_db.py --force         # Force recreate database
  python init_db.py --schema-only   # Only create schema
  python init_db.py --seed-only     # Only insert data
        """
    )
    
    parser.add_argument('--force', action='store_true',
                        help='Force recreate database (deletes existing)')
    parser.add_argument('--schema-only', action='store_true',
                        help='Only create schema (no sample data)')
    parser.add_argument('--seed-only', action='store_true',
                        help='Only insert sample data (schema must exist)')
    
    args = parser.parse_args()
    
    # Print header
    print_header("Dark Chic Emporium Database Initialization")
    
    # Get paths
    db_path = get_db_path()
    schema_path = get_sql_file_path("schema.sql")
    seed_path = get_sql_file_path("seed.sql")
    
    # Check if SQL files exist
    if not schema_path.exists():
        print_error(f"Schema file not found: {schema_path}")
        sys.exit(1)
    
    if not seed_path.exists():
        print_error(f"Seed file not found: {seed_path}")
        sys.exit(1)
    
    # Check existing database
    db_exists = check_db_exists()
    
    if db_exists and not args.force and not args.seed_only:
        print_warning(f"Database already exists: {db_path}")
        response = input("Do you want to recreate it? (y/N): ")
        if response.lower() != 'y':
            print_info("Aborted. Use --force to skip confirmation.")
            sys.exit(0)
        args.force = True
    
    # Delete existing database if force flag is set
    if args.force and db_exists and not args.seed_only:
        if not delete_database(db_path):
            sys.exit(1)
    
    # Create schema
    if not args.seed_only:
        print_info("Creating database schema...")
        create_database()
        
        if run_sql_file(db_path, schema_path):
            print_success("Schema created successfully!")
        else:
            print_error("Failed to create schema")
            sys.exit(1)
    
    # Insert sample data
    if not args.schema_only:
        print_info("Inserting sample data...")
        
        if run_sql_file(db_path, seed_path):
            print_success("Sample data inserted successfully!")
        else:
            print_error("Failed to insert sample data")
            sys.exit(1)
    
    # Display summary
    if not args.schema_only:
        display_summary(db_path)
    
    # Success message
    print_header("Initialization Complete!")
    print_success(f"Database ready at: {db_path}")
    print_info("You can now start the FastAPI server")
    print()

if __name__ == "__main__":
    main()

