#!/usr/bin/env python3
"""
Database initialization script for Wish Machine backend.
This script ensures the database directory exists and creates the database file.
"""

import os
import sqlite3
from pathlib import Path

def init_database():
    """Initialize the database file."""
    # Create database file if it doesn't exist
    db_path = Path("./wishes.db")
    
    if not db_path.exists():
        # Create the database file
        conn = sqlite3.connect(db_path)
        conn.close()
        print(f"Created database file: {db_path}")
    else:
        print(f"Database file already exists: {db_path}")
    
    # Try to set permissions, but don't fail if we can't
    try:
        os.chmod(db_path, 0o644)
        print(f"Set permissions on database file: {db_path}")
    except PermissionError:
        print(f"Warning: Could not set permissions on {db_path} (this is normal in Docker)")
    
    print("Database initialization completed successfully!")

if __name__ == "__main__":
    init_database() 