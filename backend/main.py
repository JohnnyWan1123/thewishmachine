from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
import os

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wishes.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database model
class Wish(Base):
    __tablename__ = "wishes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    wish = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models
class WishCreate(BaseModel):
    name: str
    wish: str

class WishResponse(BaseModel):
    id: int
    name: str
    wish: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# FastAPI app
app = FastAPI(title="Wish Machine API", version="1.0.0")

# CORS middleware
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
# Add wildcard for development/testing
if not any("*" in origin for origin in CORS_ORIGINS):
    CORS_ORIGINS.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.options("/api/wishes")
def options_wishes():
    """Handle preflight requests for wishes endpoint"""
    return {"message": "OK"}

@app.post("/api/wishes", response_model=WishResponse)
def create_wish(wish: WishCreate, db: Session = Depends(get_db)):
    """Create a new wish"""
    db_wish = Wish(name=wish.name, wish=wish.wish)
    db.add(db_wish)
    db.commit()
    db.refresh(db_wish)
    return db_wish

@app.get("/api/wishes", response_model=list[WishResponse])
def get_wishes(db: Session = Depends(get_db)):
    """Get all wishes"""
    wishes = db.query(Wish).order_by(Wish.created_at.desc()).all()
    return wishes

@app.get("/api/wishes/{wish_id}", response_model=WishResponse)
def get_wish(wish_id: int, db: Session = Depends(get_db)):
    """Get a specific wish by ID"""
    wish = db.query(Wish).filter(Wish.id == wish_id).first()
    if wish is None:
        raise HTTPException(status_code=404, detail="Wish not found")
    return wish

@app.options("/api/wishes/{wish_id}")
def options_wish(wish_id: int):
    """Handle preflight requests for individual wish endpoint"""
    return {"message": "OK"}

@app.delete("/api/wishes/{wish_id}")
def delete_wish(wish_id: int, db: Session = Depends(get_db)):
    """Delete a wish by ID"""
    wish = db.query(Wish).filter(Wish.id == wish_id).first()
    if wish is None:
        raise HTTPException(status_code=404, detail="Wish not found")
    db.delete(wish)
    db.commit()
    return {"message": "Wish deleted successfully"}

@app.get("/")
def read_root():
    return {"message": "Wish Machine API is running!", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 