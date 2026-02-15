# 🚀 Getting Started Guide

## Quick Setup (5 minutes)

### 1️⃣ Install Dependencies

```bash
# Client
cd client
npm install

# Server (in a new terminal)
cd server
npm install
```

### 2️⃣ Setup Environment Files

**Client (.env):**
```bash
cp client/.env.example client/.env
```

**Server (.env):**
```bash
cp server/.env.example server/.env
```

### 3️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas**
Update `server/.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-media-hub
```

### 4️⃣ Start Development Servers

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

## ✅ Verify Installation

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/health
- Should return: `{ "status": "ok", "timestamp": "..." }`

## 📦 Seed Database (Optional)

```bash
# Run inside the server directory
node scripts/seed.js
```

## 🛠️ Development Commands

### Client
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server
```bash
npm run dev      # Start with hot reload
npm run build    # Compile TypeScript
npm start        # Run compiled JavaScript
npm run lint     # Run ESLint
```

## 🐳 Using Docker

```bash
# Start all services
docker-compose up

# Stop services
docker-compose down

# Rebuild images
docker-compose up --build
```

## 📱 Testing the Application

### Create Test Account
1. Go to http://localhost:5173/signup
2. Enter username, email, password
3. Sign in with credentials

### Create Test Content
1. Sign in to the app
2. API: `POST /api/content`
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Content",
    "description": "A test article",
    "type": "article",
    "category": "Technology",
    "url": "https://example.com",
    "tags": ["ai", "ml"],
    "thumbnail": "https://via.placeholder.com/300x200"
  }'
```

## 🔍 API Testing with cURL

### Get Trending Content
```bash
curl http://localhost:3000/api/content/trending?limit=5
```

### Search Content
```bash
curl 'http://localhost:3000/api/content/search?q=technology&category=Technology'
```

### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "securepassword"
  }'
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error
- Verify MongoDB is running
- Check connection string in .env
- For Atlas, whitelist your IP

### Module Not Found Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check `server/src/index.ts` CORS configuration
- Ensure client URL matches allowed origins

## 📚 Project Navigation

```
/Ai
├── client/          # React Frontend
│   └── src/
│       ├── pages/   # HomePage, ExplorePage, etc.
│       ├── components/ # Reusable UI components
│       └── services/ # API integration
├── server/          # Express Backend
│   └── src/
│       ├── routes/  # API endpoints
│       ├── controllers/ # Business logic
│       └── models/  # Database schemas
└── README.md        # Full documentation
```

## 🎯 Next Steps

1. ✅ Explore the UI at http://localhost:5173
2. ✅ Test API endpoints
3. ✅ Create sample content
4. ✅ Try AI features (analyze content)
5. ✅ Deploy to production

## 📖 More Resources

- [Client README](./client/README.md)
- [Server README](./server/README.md)
- [API Documentation](./server/README.md#api-endpoints)
- [Database Schema](./README.md#database-schema)

## 🆘 Need Help?

1. Check the README.md files
2. Review console errors
3. Check MongoDB connection
4. Verify environment variables
5. Review API response codes

---

**Happy coding! 🎉**
