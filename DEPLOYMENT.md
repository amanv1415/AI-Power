# 🚀 Deployment Guide

## Deployment Options

### Option 1: Heroku (Simplest)

#### Deploy Backend
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name-server

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
```

#### Deploy Frontend
```bash
# Build
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### Option 2: AWS

#### Backend - EC2 + RDS
1. Create EC2 instance (Ubuntu 20.04)
2. SSH into instance
3. Install Node.js and MongoDB
4. Clone repository
5. Set environment variables
6. Start with PM2:
```bash
npm install -g pm2
npm run build
pm2 start npm --name "api" -- start
pm2 startup
pm2 save
```

#### Frontend - S3 + CloudFront
```bash
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Create CloudFront distribution pointing to S3
```

---

### Option 3: Docker + Container Registry

#### Build Docker Images
```bash
# Server
docker build -t ai-media-server:latest ./server
docker tag ai-media-server:latest yourusername/ai-media-server:latest
docker push yourusername/ai-media-server:latest

# Client
docker build -t ai-media-client:latest ./client
docker tag ai-media-client:latest yourusername/ai-media-client:latest
docker push yourusername/ai-media-client:latest
```

#### Deploy to Docker Hub / AWS ECR
```bash
# AWS ECR
aws ecr create-repository --repository-name ai-media-server
docker tag ai-media-server:latest <aws-account>.dkr.ecr.<region>.amazonaws.com/ai-media-server:latest
docker push <aws-account>.dkr.ecr.<region>.amazonaws.com/ai-media-server:latest
```

---

### Option 4: Railway.app (Recommended for Beginners)

1. Push code to GitHub
2. Connect GitHub to Railway
3. Add services:
   - Node.js app (server)
   - MongoDB
   - Static site (client)
4. Set environment variables in Railway dashboard
5. Deploy automatically on push

---

### Option 5: Vercel (Frontend) + Railway (Backend)

#### Vercel Frontend
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL https://your-api.railway.app/api
```

#### Railway Backend
1. Push to GitHub
2. Import to Railway
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

---

## Environment Variables for Production

### Server (.env)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-media-hub
JWT_SECRET=<generate-strong-random-key>
CORS_ORIGIN=https://your-frontend.com
```

### Client (.env.production)
```
VITE_API_URL=https://your-api-domain.com/api
```

---

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting added
- [ ] Error logging enabled
- [ ] Analytics configured
- [ ] Monitoring set up

---

## Production Security

### 1. Environment Variables
- ✓ Use strong JWT_SECRET
- ✓ Use secure database credentials
- ✓ Never commit .env to git
- ✓ Rotate secrets regularly

### 2. HTTPS/SSL
```bash
# Let's Encrypt for free SSL
sudo apt-get install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

### 3. CORS Configuration
```typescript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://yourdomain.com',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
```

### 4. Rate Limiting
```bash
npm install express-rate-limit
```

### 5. Helmet.js
```bash
npm install helmet
```

---

## Monitoring & Logging

### Application Monitoring
- **PM2 Plus**: `pm2 plus`
- **DataDog**: Integration with Node.js
- **New Relic**: APM monitoring

### Error Tracking
- **Sentry**: Error tracking and reporting
- **LogRocket**: Session replay and logging

### Database Monitoring
- **MongoDB Atlas**: Built-in monitoring
- **Datadog**: Database performance monitoring

---

## Scaling Considerations

### Horizontal Scaling
1. Load Balance multiple API servers
2. Use MongoDB replication
3. Cache responses with Redis
4. Use CDN for static assets

### Database Optimization
```javascript
// Add indexes in production
db.mediaItems.createIndex({ "title": "text" });
db.mediaItems.createIndex({ "category": 1, "createdAt": -1 });
```

### Caching Strategy
```typescript
// Redis caching
import redis from 'redis';
const client = redis.createClient();

// Cache trending content
const cached = await client.get('trending');
if (cached) return JSON.parse(cached);
```

---

## Troubleshooting Deployment

### 502 Bad Gateway
- Check if server is running: `pm2 list`
- Check logs: `pm2 logs api`
- Check port is accessible

### Database Connection Errors
- Verify MongoDB URI
- Check IP whitelist on MongoDB Atlas
- Verify network connectivity

### CORS Errors
- Check CORS_ORIGIN environment variable
- Verify frontend URL matches allowed origin
- Check browser console for specific errors

### Build Failures
- Check Node.js version compatibility
- Run `npm ci` instead of `npm install`
- Clear cache: `npm cache clean --force`

---

## Rollback Procedure

```bash
# Heroku
heroku releases
heroku rollback v<number>

# Docker
docker pull yourusername/ai-media-server:previous-tag
docker pull yourusername/ai-media-client:previous-tag

# PM2
pm2 delete api
git checkout previous-commit
npm install && npm run build
pm2 start ...
```

---

## Health Checks

```bash
# Server health
curl https://your-api.com/api/health

# Frontend health
curl https://your-frontend.com
```

---

## Support & Resources

- [Heroku Deployment Guide](https://devcenter.heroku.com/)
- [AWS EC2 Documentation](https://aws.amazon.com/ec2/)
- [Railway.app Docs](https://docs.railway.app/)
- [Vercel Deployment](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [PM2 Documentation](https://pm2.keymetrics.io/)

---

**Last Updated:** February 15, 2026
