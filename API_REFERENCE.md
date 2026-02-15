# 📖 API Reference

## Base URL
```
http://localhost:3000/api
```

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### Sign Up
- **POST** `/auth/signup`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "username": "user123",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "user123"
    }
  }
  ```

#### Sign In
- **POST** `/auth/signin`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** (same as Sign Up)

#### Get Profile
- **GET** `/auth/profile`
- **Auth:** Required ✓
- **Response:**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "username": "user123",
    "preferences": {
      "categories": ["Technology"],
      "aiRecommendations": true,
      "theme": "dark"
    }
  }
  ```

---

### Content

#### Get Trending
- **GET** `/content/trending?limit=10`
- **Query Params:**
  - `limit` (optional): Number of items to return (default: 10)
- **Response:** Array of MediaItem objects

#### Search
- **GET** `/content/search?q=technology&category=Technology&type=article&page=1&limit=10`
- **Query Params:**
  - `q`: Search query (optional)
  - `category`: Filter by category (optional)
  - `type`: Filter by type - image|video|article|podcast (optional)
  - `page`: Page number (optional, default: 1)
  - `limit`: Items per page (optional, default: 10)
- **Response:**
  ```json
  {
    "results": [...],
    "total": 100,
    "page": 1,
    "limit": 10
  }
  ```

#### Get Content by ID
- **GET** `/content/:id`
- **Response:** MediaItem object

#### Get by Category
- **GET** `/content/category/Technology?limit=10`
- **Query Params:**
  - `limit`: Items to return (optional)
- **Response:** Array of MediaItem objects

#### Get Recommendations
- **GET** `/content/recommendations?limit=5`
- **Auth:** Optional
- **Query Params:**
  - `limit`: Number of recommendations (optional)
- **Response:** Array of MediaItem objects

#### Analyze Content
- **POST** `/content/:id/analyze`
- **Auth:** Required ✓
- **Body:** Empty
- **Response:**
  ```json
  {
    "sentiment": "positive",
    "topics": ["Technology", "Innovation"],
    "keywordScore": 0.85,
    "engagement": 0.92,
    "recommendations": ["String recommendations"]
  }
  ```

#### Like Content
- **POST** `/content/:id/like`
- **Body:** Empty
- **Response:**
  ```json
  {
    "success": true,
    "likes": 150
  }
  ```

#### Create Content
- **POST** `/content`
- **Auth:** Required ✓
- **Body:**
  ```json
  {
    "title": "My Article",
    "description": "Description here",
    "type": "article",
    "category": "Technology",
    "url": "https://example.com",
    "tags": ["tag1", "tag2"],
    "thumbnail": "https://example.com/image.jpg"
  }
  ```
- **Response:** Created MediaItem object

#### Update Content
- **PUT** `/content/:id`
- **Auth:** Required ✓
- **Body:** Partial MediaItem fields
- **Response:** Updated MediaItem object

---

### Analytics

#### Get Platform Stats
- **GET** `/analytics/stats`
- **Response:**
  ```json
  {
    "totalContent": 100,
    "totalUsers": 50,
    "totalViews": 50000,
    "totalLikes": 5000,
    "timestamp": "2026-02-15T10:00:00Z"
  }
  ```

#### Get Content Stats
- **GET** `/analytics/content-stats`
- **Response:**
  ```json
  {
    "byType": [
      {
        "_id": "article",
        "count": 50,
        "totalViews": 25000,
        "totalLikes": 2500
      }
    ],
    "byCategory": [
      {
        "_id": "Technology",
        "count": 30,
        "totalViews": 15000
      }
    ],
    "topContent": [...]
  }
  ```

---

### System

#### Health Check
- **GET** `/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-02-15T10:00:00Z",
    "uptime": 3600
  }
  ```

#### API Status
- **GET** `/status`
- **Response:**
  ```json
  {
    "message": "API is running",
    "version": "1.0.0",
    "timestamp": "2026-02-15T10:00:00Z"
  }
  ```

---

## Data Models

### MediaItem
```typescript
{
  _id: ObjectId;
  title: string;
  description: string;
  type: 'image' | 'video' | 'article' | 'podcast';
  url: string;
  thumbnail?: string;
  duration?: number; // in seconds
  views: number;
  likes: number;
  tags: string[];
  category: string;
  aiAnalysis?: ContentAnalysis;
  createdAt: Date;
  updatedAt: Date;
}
```

### ContentAnalysis
```typescript
{
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  topics: string[];
  keywordScore: number; // 0-1
  engagement: number; // 0-1
  recommendations: string[];
}
```

### User
```typescript
{
  _id: ObjectId;
  email: string;
  username: string;
  avatar?: string;
  preferences: {
    categories: string[];
    aiRecommendations: boolean;
    theme: 'light' | 'dark';
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Error Responses

### Bad Request (400)
```json
{
  "success": false,
  "error": "Validation failed"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Invalid token"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Content not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting. Consider implementing in production.

## Pagination

Use `page` and `limit` query parameters for paginated endpoints:
- Default limit: 10
- Max limit: 100
- Default page: 1

## Sorting

Results are sorted by relevance or creation date. Custom sorting coming soon.

## Filtering

Available filters:
- `category`: Content category
- `type`: Content type
- `sentiment`: AI-detected sentiment (when available)

---

## Testing with cURL

```bash
# Get trending content
curl http://localhost:3000/api/content/trending

# Search
curl 'http://localhost:3000/api/content/search?q=technology'

# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"123456"}'

# Sign in and get token
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get profile (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/profile
```

---

**Last Updated:** February 15, 2026
**API Version:** 1.0.0
