# Wish Machine Backend

A FastAPI backend for the Wish Machine application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `POST /api/wishes` - Create a new wish
- `GET /api/wishes` - Get all wishes
- `GET /api/wishes/{id}` - Get a specific wish
- `DELETE /api/wishes/{id}` - Delete a wish

## Database

The app uses SQLite database (`wishes.db`) which is automatically created when you first run the application.

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc) 