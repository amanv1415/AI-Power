# AI Media Hub - Backend API

Node.js/Express backend server for the AI-powered media platform with MongoDB.

## Features

- 🔐 JWT-based authentication
- 🤖 AI/ML-powered content analysis and recommendations
- 📊 RESTful API with full CRUD operations
- 🔍 Full-text search capabilities
- 💾 MongoDB database integration
- 🛡️ Input validation and error handling

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-media-hub
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Content
- `GET /api/content/trending` - Get trending content
- `GET /api/content/search` - Search content
- `GET /api/content/:id` - Get content details
- `GET /api/content/category/:category` - Get by category
- `GET /api/content/recommendations` - Get personalized recommendations
- `POST /api/content/:id/analyze` - Analyze content with AI
- `POST /api/content/:id/like` - Like content
- `POST /api/content` - Create content (requires auth)
- `PUT /api/content/:id` - Update content (requires auth)

## Database Models

### User
- email, username, password
- preferences (categories, theme, AI recommendations)
- timestamps

### MediaItem
- title, description, type, url, thumbnail
- category, tags, views, likes
- aiAnalysis (sentiment, topics, recommendations)
- timestamps

### Recommendation
- userId, contentId, score, reason
- timestamps

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety
- **CORS** - Cross-origin support
