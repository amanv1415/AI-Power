# AI Media Hub - Comprehensive Full-Stack Application

A modern, AI/ML-powered media and content platform with a **fully functional responsive React frontend** and **Node.js/Express backend**, featuring intelligent recommendations, content analysis, and a clean, professional UI/UX.

## 🌟 Features

### Frontend
- ✨ **Modern React UI** with TypeScript
- 🎨 **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- 🌓 **Dark Mode Support** - Professional theme switching
- 🎯 **Interactive Components** - Smooth animations and transitions
- 🔍 **Advanced Search** - Filter by category, type, and keywords
- 📊 **Content Cards** - Beautiful media display with metadata
- 🔐 **Authentication** - Sign up, sign in, and user dashboard
- 💾 **State Management** - Zustand for efficient state handling
- 🚀 **Performance** - Vite for fast development and builds

### Backend
- 🔐 **JWT Authentication** - Secure user sessions
- 🤖 **AI Content Analysis** - Sentiment analysis, topic extraction
- 💡 **Smart Recommendations** - Personalized content suggestions
- 🔍 **Full-Text Search** - MongoDB search capabilities
- 📈 **Content Metrics** - Views, likes, engagement tracking
- ⚡ **RESTful API** - Clean, well-documented endpoints
- 🛡️ **Error Handling** - Comprehensive error management
- 🔄 **Database Integration** - MongoDB with Mongoose ODM

## 📁 Project Structure

```
ai-media-hub/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── store/               # Zustand state management
│   │   ├── styles/              # Global styles & animations
│   │   ├── types/               # TypeScript definitions
│   │   ├── utils/               # Utilities & constants
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── index.html               # HTML template
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                      # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic & AI services
│   │   ├── middleware/          # Express middleware
│   │   ├── types/               # TypeScript interfaces
│   │   ├── utils/               # Utilities
│   │   └── index.ts             # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── shared/                      # Shared types & constants
├── docker-compose.yml           # Docker setup
└── README.md                    # This file

```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Setup

#### 1. Clone or Extract Project
```bash
cd /path/to/Ai
```

#### 2. Install Dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

#### 3. Configure Environment Variables

**Client (.env):**
```
VITE_API_URL=http://localhost:3000/api
```

**Server (.env):**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-media-hub
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

#### 4. Start MongoDB
```bash
# If running locally
mongod

# Or use MongoDB Atlas connection string in .env
```

#### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

## 📚 Pages & Features

### Home Page
- Hero section with call-to-action
- Trending content carousel
- Personalized recommendations
- Feature highlights with AI/ML benefits

### Explore Page
- Advanced search with filters
- Category and content type selection
- Real-time search results
- Grid view with content cards

### Content Detail Page
- Full content information
- AI-powered analysis display
- Sentiment analysis visualization
- Engagement metrics
- Like functionality
- Tag suggestions

### Dashboard (Authenticated Users)
- Personalized recommendations
- User preferences
- Content management

### Authentication
- Sign up with email, username, password
- Sign in with credentials
- Secure JWT token management
- Protected routes

## 🤖 AI/ML Capabilities

### Content Analysis
- **Sentiment Analysis**: Positive, Neutral, Negative, Mixed
- **Topic Extraction**: Automatic topic identification
- **Keyword Scoring**: Content relevance metrics
- **Engagement Prediction**: Engagement potential analysis

### Recommendation Engine
- **Collaborative Filtering**: Based on user interests
- **Content-Based**: Similar content suggestions
- **Trending Boost**: Popular content promotion
- **Personalization**: User preference learning

### Search Intelligence
- **Full-Text Search**: Across titles and descriptions
- **Faceted Search**: Filter by category and type
- **Smart Matching**: Relevant result ranking
- **Autocomplete Ready**: Foundation for suggestions

## 🛠️ API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Create account | - |
| POST | `/api/auth/signin` | Login | - |
| GET | `/api/auth/profile` | Get profile | ✓ |

### Content
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/content/trending` | Trending content | - |
| GET | `/api/content/search` | Search content | - |
| GET | `/api/content/:id` | Content details | - |
| GET | `/api/content/category/:cat` | By category | - |
| GET | `/api/content/recommendations` | Recommendations | - |
| POST | `/api/content/:id/analyze` | AI analysis | ✓ |
| POST | `/api/content/:id/like` | Like content | - |
| POST | `/api/content` | Create content | ✓ |
| PUT | `/api/content/:id` | Update content | ✓ |

## 🎨 UI Components

### Featured Components
- **Header** - Navigation with auth buttons
- **Footer** - Links and company info
- **ContentCard** - Media display with hover effects
- **SearchFilters** - Advanced filter controls
- **ContentAnalysis** - AI analysis visualization
- **AuthForms** - Sign in/up pages
- **Dashboard** - User content hub

### Design System
- **Colors**: Primary (#6366f1), Secondary (#8b5cf6), Accent (#ec4899)
- **Typography**: Poppins (display), Inter (body)
- **Spacing**: Tailwind's scale system
- **Animations**: Smooth transitions and fade-ins
- **Responsive**: Mobile-first approach

## 📊 Database Schema

### Users
```javascript
{
  _id: ObjectId,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  avatar: String,
  preferences: {
    categories: [String],
    aiRecommendations: Boolean,
    theme: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Media Items
```javascript
{
  _id: ObjectId,
  title: String (indexed),
  description: String,
  type: String (image|video|article|podcast),
  url: String,
  thumbnail: String,
  duration: Number,
  views: Number,
  likes: Number,
  tags: [String],
  category: String (indexed),
  aiAnalysis: {
    sentiment: String,
    topics: [String],
    keywordScore: Number,
    engagement: Number,
    recommendations: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Technologies Used

### Frontend Stack
- **React 18** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client

### Backend Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🐳 Docker Setup

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- MongoDB instance
- Backend server
- Frontend application
- All networked and ready to communicate

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication
- **Input Validation**: Client & server-side
- **CORS Protection**: Configured origins
- **Error Handling**: Non-leaking error messages
- **Protected Routes**: Auth middleware

## 📈 Performance Optimizations

- **Code Splitting**: Route-based in React
- **Image Optimization**: CDN-ready thumbnail URLs
- **Caching**: Zustand state persistence
- **Database Indexing**: MongoDB indexes on search fields
- **API Response**: Lean MongoDB queries
- **Build Optimization**: Vite tree-shaking

## 🚀 Deployment Ready

The application is ready for deployment to:
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, AWS EC2, Google Cloud
- **Database**: MongoDB Atlas, AWS DocumentDB
- **Container**: Docker Hub, ECR, Google Container Registry

## 📝 Environment Configuration

### Development
```
NODE_ENV=development
JWT_SECRET=dev-secret-key
MONGODB_URI=mongodb://localhost:27017/ai-media-hub
```

### Production
```
NODE_ENV=production
JWT_SECRET=<secure-random-key>
MONGODB_URI=<atlas-connection-string>
VITE_API_URL=https://your-api.com/api
```

## 🤝 Contributing

1. Create feature branches
2. Follow TypeScript strict mode
3. Format with existing style
4. Test components locally
5. Submit pull requests

## 📄 License

MIT License - feel free to use for commercial projects

## 🎯 Future Enhancements

- [ ] Advanced ML models integration (TensorFlow.js)
- [ ] Real-time notifications (WebSocket)
- [ ] Video streaming optimization
- [ ] Analytics dashboard
- [ ] Social features (comments, follows)
- [ ] Mobile native apps (React Native)
- [ ] PWA support
- [ ] Advanced caching strategies

## 📞 Support

For questions or issues:
1. Check documentation in README files
2. Review API endpoints
3. Check browser console for errors
4. Review server logs

---

**Built with ❤️ - AI-Powered Media Platform v1.0.0**
