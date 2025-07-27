#!/usr/bin/env python3
"""
Database initialization script for Wish Machine backend.
This script ensures the database directory exists and creates the database file.
"""

import os
import sqlite3
from pathlib import Path

def init_database():
    """Initialize the database directory and file."""
    # Create data directory if it doesn't exist
    data_dir = Path("./data")
    data_dir.mkdir(exist_ok=True)
    
    # Ensure the directory has proper permissions
    os.chmod(data_dir, 0o755)
    
    # Create database file if it doesn't exist
    db_path = data_dir / "wishes.db"
    
    if not db_path.exists():
        # Create the database file
        conn = sqlite3.connect(db_path)
        conn.close()
        print(f"Created database file: {db_path}")
    else:
        print(f"Database file already exists: {db_path}")
    
    # Set proper permissions on the database file
    os.chmod(db_path, 0o644)
    print("Database initialization completed successfully!")

if __name__ == "__main__":
    init_database() 