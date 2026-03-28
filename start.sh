#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "========================================="
echo "  Technavya 2.0 Leaderboard Startup"
echo "========================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}[Setup] Installing Backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}[Setup] Installing Frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${GREEN}Starting services...${NC}"

# Start Backend
echo -e "${GREEN}[1/2] Starting Backend API (Dynamic Port)...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 3

# Start Frontend
echo -e "${GREEN}[2/2] Starting Frontend...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}  All services started successfully!${NC}"
echo -e "  Frontend: http://localhost:5173"
echo ""

cleanup() {
    kill $BACKEND_PID $FRONTEND_PID
    exit
}
trap cleanup SIGINT
wait