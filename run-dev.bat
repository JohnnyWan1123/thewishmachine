@echo off
echo Starting Wish Machine Development Environment...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Development servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Wishes Page: http://localhost:3000/wishes
echo.
echo Press any key to exit...
pause > nul 