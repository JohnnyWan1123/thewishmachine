# Wish Machine Deployment Guide

This guide covers multiple deployment options for the Wish Machine application.

## 🚀 Quick Start with Docker Compose (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Git

### Steps
1. **Clone and navigate to project**
   ```bash
   git clone <your-repo-url>
   cd 小狗许愿机
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

4. **Stop the application**
   ```bash
   docker-compose down
   ```

## 🌐 Cloud Deployment Options

### Option 1: Railway (Easiest)

1. **Sign up at [Railway](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy both services**:
   - Backend: Set build command to `pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Frontend: Set build command to `npm install && npm run build && npm start`

### Option 2: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel)**:
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app`

**Backend (Railway)**:
1. Deploy backend to Railway
2. Update frontend environment variable with Railway URL

### Option 3: Heroku

**Backend**:
```bash
# Create Heroku app
heroku create your-wish-machine-backend

# Add PostgreSQL (optional, for production)
heroku addons:create heroku-postgresql:mini

# Deploy
git subtree push --prefix backend heroku main
```

**Frontend**:
```bash
# Create Heroku app
heroku create your-wish-machine-frontend

# Set buildpacks
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com

# Deploy
git subtree push --prefix frontend heroku main
```

### Option 4: DigitalOcean App Platform

1. **Create App Platform project**
2. **Add Backend Service**:
   - Source: GitHub repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add Frontend Service**:
   - Source: GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Run Command: `npm start`
   - Environment Variables: `NEXT_PUBLIC_API_URL=https://your-backend-url`

## 🔧 Manual Deployment

### Backend Deployment

1. **Install Python 3.11+**
2. **Install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run with production server**:
   ```bash
   # Using Gunicorn (recommended for production)
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

### Frontend Deployment

1. **Install Node.js 18+**
2. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Build and run**:
   ```bash
   npm run build
   npm start
   ```

## 🔒 Production Considerations

### Environment Variables

**Backend**:
```bash
DATABASE_URL=sqlite:///./wishes.db
CORS_ORIGINS=https://your-frontend-domain.com
```

**Frontend**:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Security

1. **Enable HTTPS** in production
2. **Set up CORS** properly for your domain
3. **Use environment variables** for sensitive data
4. **Consider using PostgreSQL** for production database

### Database Migration

For production, consider migrating from SQLite to PostgreSQL:

1. **Update backend requirements**:
   ```
   psycopg2-binary==2.9.7
   ```

2. **Update database URL**:
   ```python
   DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wishes.db")
   ```

## 📊 Monitoring

### Health Checks
- Backend: `GET /` returns status
- Frontend: Built-in Next.js health checks

### Logs
- Docker: `docker-compose logs -f`
- Railway: Built-in logging
- Vercel: Built-in logging

## 🚀 Performance Tips

1. **Enable Next.js caching**
2. **Use CDN** for static assets
3. **Optimize images** with Next.js Image component
4. **Enable compression** on your web server

## 🔧 Troubleshooting

### Common Issues

1. **CORS errors**: Update CORS origins in backend
2. **API connection failed**: Check environment variables
3. **Build failures**: Ensure all dependencies are installed

### Debug Commands

```bash
# Check if backend is running
curl http://localhost:8000/

# Check if frontend is running
curl http://localhost:3000/

# View Docker logs
docker-compose logs -f
```

## 📝 Environment Setup

Copy the example environment file:
```bash
cd frontend
cp env.example .env.local
# Edit .env.local with your API URL
```

## 🎯 Quick Deployment Checklist

- [ ] Environment variables configured
- [ ] CORS settings updated for production domain
- [ ] Database connection tested
- [ ] Frontend builds successfully
- [ ] API endpoints working
- [ ] HTTPS enabled (production)
- [ ] Monitoring/logging configured 