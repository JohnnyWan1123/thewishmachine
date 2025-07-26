# 小狗许愿机 (Wish Machine) 🌟

A magical wish-making application with a beautiful frontend and robust backend API.

## ✨ Features

- **Magical UI**: Beautiful gradient design with sparkle animations
- **Wish Management**: Create, view, and delete wishes
- **Real-time Updates**: Instant feedback when wishes are submitted
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Clean backend API with full CRUD operations
- **Database Storage**: Persistent storage with SQLite/PostgreSQL support

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: FastAPI with SQLAlchemy ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Docker, Railway, Vercel, Heroku support

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd 小狗许愿机

# Run with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Local Development

**Backend Setup**:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

**Frontend Setup**:
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 📁 Project Structure

```
小狗许愿机/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend container
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # UI components
│   ├── wish-machine.tsx   # Main wish machine component
│   └── Dockerfile         # Frontend container
├── docker-compose.yml     # Multi-container setup
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md              # This file
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/wishes` | Create a new wish |
| `GET` | `/api/wishes` | Get all wishes |
| `GET` | `/api/wishes/{id}` | Get specific wish |
| `DELETE` | `/api/wishes/{id}` | Delete a wish |
| `GET` | `/health` | Health check |

## 🎨 Frontend Pages

- **Home** (`/`): Main wish machine interface
- **Wishes** (`/wishes`): View all submitted wishes

## 🔧 Configuration

### Environment Variables

**Backend**:
```bash
DATABASE_URL=sqlite:///./wishes.db
CORS_ORIGINS=http://localhost:3000
PORT=8000
```

**Frontend**:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:

1. **Railway** (Easiest): One-click deployment
2. **Vercel + Railway**: Frontend on Vercel, Backend on Railway
3. **Docker**: Self-hosted with Docker Compose
4. **Heroku**: Traditional cloud deployment

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker (optional)

### Development Commands

```bash
# Backend development
cd backend
pip install -r requirements.txt
python main.py

# Frontend development
cd frontend
npm install --legacy-peer-deps
npm run dev

# Run both with Docker
docker-compose up -d
```

### Testing

```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

## 📊 Monitoring

- **Health Checks**: Built-in health endpoints
- **Logs**: Docker Compose logs or platform-specific logging
- **Performance**: Next.js built-in optimizations

## 🔒 Security

- CORS protection
- Input validation
- SQL injection protection via SQLAlchemy
- Environment variable configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with Next.js and FastAPI
- Styled with Tailwind CSS
- Icons from Lucide React
- Deployed with modern cloud platforms

---

**Made with ✨ and 🌟 by the Wish Machine Team** 