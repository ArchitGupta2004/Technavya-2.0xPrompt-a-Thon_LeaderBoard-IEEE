@echo off
REM =========================================
REM Technavya 2.0 Leaderboard - Simple Start
REM =========================================
setlocal enabledelayedexpansion
cd /d "%~dp0"
set "ROOT_DIR=%~dp0"

echo.
echo =========================================
echo  Technavya 2.0 Leaderboard Startup
echo =========================================
echo.

if not exist "backend\node_modules" (
    echo [Setup] Installing Backend dependencies...
    cd backend && call npm install && cd ..
)
if not exist "frontend\node_modules" (
    echo [Setup] Installing Frontend dependencies...
    cd frontend && call npm install && cd ..
)

echo Starting services...
echo.

echo [1/2] Starting Backend (Dynamic Port)...
start "Backend" cmd /k "cd /d "%ROOT_DIR%backend" && npm run dev"

echo [2/2] Starting Frontend...
start "Frontend" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo.
echo All services started! 
echo Open: http://localhost:5173
echo.
pause