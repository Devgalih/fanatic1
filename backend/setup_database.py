#!/usr/bin/env python3
"""
Quick Database Setup Script
============================
Run this script from the backend directory to set up the database quickly.

Usage:
    python setup_database.py
"""

import os
import sys
from pathlib import Path

def main():
    print("\n" + "="*60)
    print("Dark Chic Emporium - Database Setup".center(60))
    print("="*60 + "\n")
    
    # Check if we're in the right directory
    backend_dir = Path(__file__).parent
    db_init_script = backend_dir / "database" / "init_db.py"
    
    if not db_init_script.exists():
        print("❌ Error: Cannot find database/init_db.py")
        print(f"   Expected location: {db_init_script}")
        print("\n   Please run this script from the backend directory:")
        print("   cd backend && python setup_database.py")
        sys.exit(1)
    
    print("✓ Found database initialization script")
    print(f"  Location: {db_init_script}\n")
    
    # Run the database initialization
    print("Starting database initialization...\n")
    
    import subprocess
    try:
        result = subprocess.run(
            [sys.executable, str(db_init_script)],
            cwd=backend_dir,
            check=True
        )
        
        if result.returncode == 0:
            print("\n" + "="*60)
            print("✓ Database setup completed successfully!".center(60))
            print("="*60 + "\n")
            print("Next steps:")
            print("  1. Start the backend server: python run.py")
            print("  2. Access the API docs: http://localhost:8000/docs")
            print("  3. Login with: admin@darkchic.com / admin123\n")
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error during database setup: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

