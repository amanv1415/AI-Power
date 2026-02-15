# 🐛 Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### ❌ Node modules not found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### ❌ npm ERR! code ERESOLVE
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

#### ❌ TypeScript compilation errors
```bash
# Update TypeScript
npm update typescript

# Check tsconfig.json is valid
npx tsc --noEmit
```

---

## MongoDB Issues

#### ❌ MongoDB connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod

# Windows
net start MongoDB
```

2. Check connection string in `.env`
3. Verify MongoDB is running: `mongosh`

#### ❌ MongoDB Atlas connection timeout
```
Error: connect ETIMEDOUT
```

**Solutions:**
1. Check IP whitelist: MongoDB Atlas → Network Access
2. Whitelist your IP: `0.0.0.0/0` (for development only)
3. Verify connection string format
4. Check internet connection

#### ❌ Authentication failed
```
Error: authentication failed
```

**Solutions:**
1. Verify username/password
2. Check special characters are URL encoded
3. Create new database user
4. Ensure user has correct permissions

---

## API Issues

#### ❌ Cannot GET /api/content/trending
```
404 Not Found
```

**Solutions:**
1. Verify backend is running: `npm run dev`
2. Check port 3000 is available
3. Verify routes are correctly imported in index.ts
4. Check for syntax errors: `npm run lint`

#### ❌ CORS error in browser
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Verify CORS is enabled in server:
```typescript
app.use(cors());
```

2. Check frontend API URL:
```
VITE_API_URL=http://localhost:3000/api
```

3. Check proxy in vite.config.ts:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
}
```

#### ❌ 500 Internal Server Error
```
{ "error": "Internal server error" }
```

**Solutions:**
1. Check server logs: Look for console output
2. Verify environment variables are set
3. Check database connection
4. Review recent code changes

---

## Authentication Issues

#### ❌ "Invalid token" error
```
401 Unauthorized
```

**Solutions:**
1. Check token is being sent in Authorization header
2. Verify token format: `Bearer <token>`
3. Check JWT_SECRET matches between sessions
4. Validate token hasn't expired

#### ❌ Sign up fails with "User already exists"
**Solutions:**
1. Sign in instead if you have an account
2. Use different email address
3. Check MongoDB for duplicate entries

---

## Frontend Issues

#### ❌ npm run dev fails
```bash
# Clear and restart
npm run build
npm run preview
```

#### ❌ Port 5173 already in use
```bash
# Find process using port
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
vite --port 3001
```

#### ❌ Hot reload not working
1. Check `vite.config.ts`
2. Verify file paths are correct
3. Restart dev server
4. Clear .vite cache: `rm -rf .vite`

#### ❌ Styles not loading
1. Check Tailwind config: `tailwind.config.js`
2. Verify CSS import in App.tsx:
```typescript
import '@/styles/index.css'
```
3. Rebuild CSS: Restart dev server

---

## Performance Issues

#### ❌ Page loads slowly
**Solutions:**
1. Check Network tab in DevTools
2. Verify API responses are fast
3. Check for N+1 queries in backend
4. Enable gzip compression:
```typescript
import compression from 'compression';
app.use(compression());
```

#### ❌ High memory usage
**Solutions:**
1. Check for memory leaks: `node --inspect`
2. Clear cache: `rm -rf .cache node_modules/.cache`
3. Monitor with `log -k` command
4. Check for infinite loops in useEffect

---

## Search Issues

#### ❌ Search returns no results
**Solutions:**
1. Verify full-text index is created:
```javascript
db.mediaItems.createIndex({ title: "text", description: "text" });
```

2. Check query syntax
3. Ensure documents exist with matching content
4. Seed database: `npm run seed`

---

## AI/ML Features

#### ❌ Content analysis returns errors
**Solutions:**
1. Check API keys if using external services
2. Verify content text is being sent
3. Check service availability
4. Review error logs

---

## Docker Issues

#### ❌ Docker build fails
```bash
# Clear Docker cache
docker system prune --all

# Rebuild
docker-compose up --build
```

#### ❌ Cannot connect to MongoDB in Docker
**Solutions:**
1. Check docker-compose.yml networking
2. Use service name as host: `mongodb:27017`
3. Verify containers are on same network
4. Check volume mounts

---

## Git/Version Control

#### ❌ Cannot push to remote
```bash
# Check remote
git remote -v

# Update remote
git remote set-url origin <new-url>

# Pull before push
git pull origin main
git push origin main
```

---

## Getting Help

1. **Check logs:**
```bash
# Client: Check browser console (F12)
# Server: Check terminal output
# Docker: docker-compose logs -f
```

2. **Enable debugging:**
```bash
# Node.js
NODE_DEBUG=* npm run dev

# Vite
DEBUG=* npm run dev
```

3. **Check status:**
```bash
# MongoDB
mongo --eval "db.adminCommand('ping')"

# API
curl http://localhost:3000/api/health
```

4. **Common commands:**
```bash
# Reinstall everything
rm -rf node_modules package-lock.json
npm install

# Clear all caches
npm cache clean --force
rm -rf .vite dist build

# Restart everything
npm run dev
```

---

## Still Need Help?

1. Check the main [README.md](./README.md)
2. Review [API_REFERENCE.md](./API_REFERENCE.md)
3. Check [GETTING_STARTED.md](./GETTING_STARTED.md)
4. Review console errors carefully
5. Check MongoDB/server logs
6. Ensure all environment variables are set
7. Try restarting all services
8. Clear all caches and reinstall dependencies

---

**Last Updated:** February 15, 2026
