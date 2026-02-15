#!/bin/bash

echo "🚀 Setting up AI Media Hub..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ./client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
echo "✓ Client dependencies installed"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd ../server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
echo "✓ Server dependencies installed"

# Create .env files if they don't exist
echo ""
echo "⚙️  Checking environment files..."
if [ ! -f ./client/.env ]; then
    cp ./client/.env.example ./client/.env
    echo "✓ Created client/.env"
fi

if [ ! -f ./server/.env ]; then
    cp ./server/.env.example ./server/.env
    echo "✓ Created server/.env"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Make sure MongoDB is running:"
echo "   mongod  # or connect to MongoDB Atlas in .env"
echo ""
echo "2. Seed the database (optional):"
echo "   cd server && npm run seed"
echo ""
echo "3. Start the development servers:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "🌐 Access the app at: http://localhost:5173"
echo ""
