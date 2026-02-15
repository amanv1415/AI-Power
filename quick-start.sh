#!/bin/bash

# 🎉 AI Media Platform - Quick Start Script
# This script will help you get up and running in 5 minutes

set -e

echo "🎉 Welcome to the AI Media Platform!"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}📋 Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION} found${NC}"

echo ""
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd client
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
cd ..

echo ""
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd server
npm install
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
cd ..

echo ""
echo -e "${BLUE}⚙️  Setting up environment variables...${NC}"
if [ ! -f "client/.env.local" ]; then
    cp client/.env.example client/.env.local
    echo -e "${GREEN}✅ Created client/.env.local${NC}"
else
    echo -e "${YELLOW}ℹ️  client/.env.local already exists${NC}"
fi

if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo -e "${GREEN}✅ Created server/.env${NC}"
else
    echo -e "${YELLOW}ℹ️  server/.env already exists${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "========================================"
echo -e "${BLUE}🚀 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Start the Backend:${NC}"
echo "   cd server && npm run dev"
echo ""
echo -e "${YELLOW}2. Start the Frontend (in a new terminal):${NC}"
echo "   cd client && npm run dev"
echo ""
echo -e "${YELLOW}3. Open in Browser:${NC}"
echo "   http://localhost:5173"
echo ""
echo -e "${YELLOW}4. (Optional) Seed Sample Data:${NC}"
echo "   cd server && npm run seed"
echo ""
echo "========================================"
echo -e "${BLUE}📚 Documentation:${NC}"
echo ""
echo "  - Getting Started: GETTING_STARTED.md"
echo "  - Full Docs:       README.md"
echo "  - API Reference:   API_REFERENCE.md"
echo "  - Deployment:      DEPLOYMENT.md"
echo "  - Troubleshooting: TROUBLESHOOTING.md"
echo ""
echo "========================================"
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
