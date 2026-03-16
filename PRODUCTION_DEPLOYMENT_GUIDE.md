# SpecSync MERN Stack - Production Deployment Guide

Complete step-by-step guide for deploying SpecSync to production using Render (Free), Netlify (Free), and MongoDB Atlas.

**Total Deployment Time:** ~45 minutes
**Cost:** FREE (with limitations on free tier)

---

## Table of Contents
1. [Database Setup (MongoDB Atlas)](#database-setup)
2. [Backend Deployment (Render)](#backend-deployment)
3. [Frontend Deployment (Netlify)](#frontend-deployment)
4. [Environment Configuration](#environment-configuration)
5. [CORS Setup](#cors-setup)
6. [Build Commands](#build-commands)
7. [Common Errors & Solutions](#common-errors--solutions)
8. [Post-Deployment Testing](#post-deployment-testing)

---

## Database Setup (MongoDB Atlas)

### Step 1: Create Free MongoDB Atlas Cluster

1. **Go to MongoDB Atlas:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with email or Google account
3. **Create Organization** (if prompted)
4. **Create New Project:**
   - Project name: `specsync-prod`
   - Click "Create Project"

### Step 2: Build a Database Cluster

1. **Click "Build a Database"**
2. **Select Free Tier (M0)** - Shared cluster
3. **Choose Provider & Region:**
   - Provider: AWS
   - Region: Pick closest to your users (e.g., `us-east-1` for US, `eu-west-1` for Europe)
   - Click "Create"

### Step 3: Configure Security

1. **Create Database User:**
   - Username: `specsync_admin`
   - Password: Generate strong password (save this!)
   - Authentication method: `Password`
   - Click "Create User"

2. **Add IP Whitelist:**
   - Click "Security" → "Network Access" in left sidebar
   - Click "+ Add IP Address"
   - Select "Allow access from anywhere" (add `0.0.0.0/0`)
   - Click "Confirm"

### Step 4: Get Connection String

1. **Click "Database"** in sidebar
2. **Click "Connect"** on your cluster
3. **Select "Drivers"**
4. **Copy Connection String** (shows format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
5. **Replace `<password>`** with actual password
6. **Replace `<dbname>`** with `specsync_prod`

**Final format:**
```
mongodb+srv://specsync_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
```

✅ **Save this connection string** - you'll need it for backend environment variables

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Update Backend .env for Production:**
   ```bash
   cd c:\MERN\backend
   ```

2. **Edit `.env` file:**
   ```env
   NODE_ENV=production
   PORT=8080
   MONGO_URI=mongodb+srv://specsync_admin:PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long_12345678
   JWT_EXPIRE=30d
   CORS_ORIGIN=https://your-frontend-domain.netlify.app
   ```

3. **Verify build works locally:**
   ```bash
   npm run build
   npm start
   ```

### Step 2: Push Backend to GitHub

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Repository name: `specsync-backend`
   - Choose `Private` or `Public`
   - Click "Create Repository"

2. **Initialize Git in Backend:**
   ```bash
   cd c:\MERN\backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/specsync-backend.git
   git push -u origin main
   ```

3. **Create `.gitignore`** (if not exists):
   ```
   node_modules/
   .env
   .env.local
   dist/
   build/
   .DS_Store
   *.log
   ```

### Step 3: Deploy to Render

1. **Go to Render:** https://render.com/
2. **Sign up** with GitHub account
3. **Click "+ New"** → **"Web Service"**
4. **Connect GitHub Repository:**
   - Click "Connect Account"
   - Select `specsync-backend` repository
   - Click "Connect"

5. **Configure Deployment:**
   - **Name:** `specsync-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Same as MongoDB (us-east-1)
   - Click "Advanced" and set:
     - **Instance Type:** Free
     - **Auto-deploy:** Yes

6. **Set Environment Variables:**
   - Click "Environment" in left sidebar
   - Add each variable from your `.env`:
     ```
     NODE_ENV = production
     PORT = 8080
     MONGO_URI = mongodb+srv://specsync_admin:PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
     JWT_SECRET = your_super_secret_jwt_key_min_32_chars_long_12345678
     JWT_EXPIRE = 30d
     CORS_ORIGIN = https://your-frontend-domain.netlify.app
     ```

7. **Click "Create Web Service"**
8. **Wait for deployment** (2-5 minutes)
9. **Copy Backend URL** - Render assigns URL like `https://specsync-backend-xxxx.onrender.com`

⚠️ **Render Free Tier Note:** Service will spin down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

---

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend for Production

1. **Update Frontend .env:**
   ```bash
   cd c:\MERN\frontend
   ```

2. **Create `.env.production`:**
   ```env
   VITE_API_URL=https://specsync-backend-xxxx.onrender.com/api
   ```

3. **Update `vite.config.js`** for production:
   ```javascript
   export default {
     server: {
       proxy: {
         '/api': {
           target: 'https://specsync-backend-xxxx.onrender.com',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '/api'),
         },
       },
     },
   }
   ```

4. **Build frontend locally:**
   ```bash
   npm run build
   ```
   Verify `dist/` folder is created with minified assets

### Step 2: Push Frontend to GitHub

1. **Create GitHub Repository:**
   - Repository name: `specsync-frontend`
   - Choose `Private` or `Public`

2. **Initialize Git:**
   ```bash
   cd c:\MERN\frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/specsync-frontend.git
   git push -u origin main
   ```

### Step 3: Deploy to Netlify

#### Option A: GitHub Integration (Recommended)

1. **Go to Netlify:** https://app.netlify.com/
2. **Sign up** with GitHub account
3. **Click "Add new site"** → **"Import an existing project"** → **"GitHub"**
4. **Select Repository:** `specsync-frontend`
5. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Deploy site"

6. **Set Environment Variables:**
   - Go to **Site settings** → **Build & deploy** → **Environment**
   - Add variable:
     ```
     VITE_API_URL = https://specsync-backend-xxxx.onrender.com/api
     ```
   - Trigger a redeploy

7. **Copy Frontend URL** - Netlify assigns URL like `https://specsync-frontend-xxx.netlify.app`

#### Option B: Manual Deployment (Drag & Drop)

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Go to https://app.netlify.com/**
3. **Drag `dist/` folder** into drop zone
4. **Wait for deployment**
5. **Netlify generates URL automatically**

---

## Environment Configuration

### MongoDB Atlas Production Checklist

- ✅ Free tier cluster created (M0)
- ✅ Database user created (`specsync_admin`)
- ✅ IP whitelist allows `0.0.0.0/0`
- ✅ Connection string saved securely
- ✅ Database name set to `specsync_prod`

### Backend (Render) Environment Variables

**Complete `.env` template for Render:**

```env
# Server Configuration
NODE_ENV=production
PORT=8080

# Database
MONGO_URI=mongodb+srv://specsync_admin:PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_key_min_32_chars_1234567890ab
JWT_EXPIRE=30d

# CORS (set to your actual frontend domain)
CORS_ORIGIN=https://specsync-frontend-xxx.netlify.app

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# API Rate Limiting (optional)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Frontend (Netlify) Environment Variables

**`.env.production` for Netlify:**

```env
VITE_API_URL=https://specsync-backend-xxxx.onrender.com/api
```

---

## CORS Setup

### Backend CORS Configuration

Update `backend/config/cors.js` or middleware:

```javascript
// backend/middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
```

**In `backend/server.js`:**

```javascript
const corsMiddleware = require('./middleware/cors');
app.use(corsMiddleware);
```

### API Connection Test

**Frontend test endpoint call:**

```javascript
// Test connection in browser console
fetch('https://specsync-backend-xxxx.onrender.com/api/health')
  .then(res => res.json())
  .then(data => console.log('✅ Backend connected:', data))
  .catch(err => console.error('❌ Connection error:', err));
```

---

## Build Commands

### Backend Build Process

```bash
# Development
npm run dev

# Production build (if using TypeScript or bundler)
npm run build

# Production start
npm start

# Run tests
npm test

# Database migrations (if applicable)
npm run migrate
```

### Frontend Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

### Deployment Workflow

```bash
# 1. Build locally to verify
npm run build
npm run preview

# 2. Test with backend
# Verify .env.production has correct API URL

# 3. Commit and push to GitHub
git add .
git commit -m "Deploy: production build"
git push origin main

# 4. Netlify auto-deploys on push to main
# Monitor deployment in Netlify dashboard

# 5. Test live site
# Visit https://your-frontend.netlify.app
```

---

## Common Errors & Solutions

### Error: "CORS policy: Cross-Origin Request Blocked"

**Cause:** Frontend and backend domains don't match CORS settings

**Solution:**
1. Verify `VITE_API_URL` in `.env.production` has correct backend URL
2. Check backend `CORS_ORIGIN` environment variable matches frontend URL
3. Ensure backend has:
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true
   }));
   ```

**Test:**
```javascript
// In browser console
fetch('https://backend-url/api/health', {
  headers: { 'Authorization': 'Bearer token' }
}).then(r => r.json()).then(console.log);
```

---

### Error: "Cannot GET /api/..." (404)

**Cause:** Frontend routing issue or API endpoint not configured

**Solution:**
1. Verify backend routes are correct in `server.js`
2. Check API URL in Netlify environment variables
3. Ensure backend is actually running:
   ```javascript
   // Add health check endpoint
   app.get('/api/health', (req, res) => {
     res.json({ status: 'Backend is running!' });
   });
   ```

---

### Error: "ECONNREFUSED" or "Backend not responding"

**Cause:** Backend isn't receiving requests or has crashed

**Solution:**
1. **Render Free Tier:** Service spins down after 15 min inactivity
   - First request after inactivity takes 30-50 seconds
   - Solution: Keep-alive ping every 10 minutes
   
   ```javascript
   // Frontend - Add to your app startup
   setInterval(() => {
     fetch(`${process.env.VITE_API_URL}/health`)
       .catch(err => console.log('Keep-alive ping'));
   }, 10 * 60 * 1000);
   ```

2. **Check Render logs:**
   - Go to Render dashboard
   - Click service name
   - Check "Logs" tab for errors

---

### Error: "MongoDB URI invalid" or "Authentication failed"

**Cause:** Incorrect credentials or connection string

**Solution:**
1. Verify `MONGO_URI` format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
2. Check username and password are correct
3. Verify IP whitelist includes `0.0.0.0/0`
4. Test locally first:
   ```bash
   node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('✅ Connected')).catch(e => console.error('❌', e))"
   ```

---

### Error: "Build failed - Dependencies not found"

**Cause:** `package.json` not committed or node_modules in git

**Solution:**
1. Ensure `package.json` and `package-lock.json` are in repository root
2. Verify `.gitignore` excludes `node_modules/`:
   ```
   node_modules/
   ```
3. Push correct files:
   ```bash
   git add package.json package-lock.json
   git commit -m "Fix: add package files"
   git push
   ```

---

### Error: "Deployment stuck or taking too long"

**Cause:** Large dependencies or network issues

**Solution:**
1. **Check build logs** in deployment platform
2. **Optimize dependencies:**
   ```bash
   npm audit
   npm dedupe
   ```
3. **Restart deployment:**
   - Netlify: Click "Trigger deploy" → "Deploy site"
   - Render: Click "Manual deploy" on dashboard

---

### Error: "JWT Token Invalid" after login

**Cause:** Different JWT secret on production vs local

**Solution:**
1. Verify `JWT_SECRET` is set in production environment variables
2. Must be same on all deployments
3. Change once if compromised:
   ```bash
   # Render environment variables → Update JWT_SECRET
   # Redeploy
   ```

---

### Error: "File not found" or "404 on page refresh"

**Cause:** SPA routing issue - Netlify serving incorrect file

**Solution:**
1. **Create `public/_redirects` file in frontend:**
   ```
   /* /index.html 200
   ```

2. **Or configure in `netlify.toml`:**
   ```toml
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

3. Redeploy frontend

---

## Post-Deployment Testing

### 1. Health Check

```bash
# Test backend is running
curl https://specsync-backend-xxxx.onrender.com/api/health

# Test frontend loads
curl https://specsync-frontend-xxx.netlify.app
```

### 2. Authentication Flow

1. **Open frontend in browser:** https://specsync-frontend-xxx.netlify.app
2. **Go to signup page**
3. **Create test account:**
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123!
4. **Verify signup succeeds** (should redirect to login)
5. **Login with credentials**
6. **Verify dashboard loads**

### 3. API Integration

Test each major feature:

```javascript
// In browser console
const API = 'https://specsync-backend-xxxx.onrender.com/api';
const token = localStorage.getItem('token');

// Test project creation
fetch(`${API}/projects`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    projectName: 'Test Project',
    description: 'Testing deployment'
  })
}).then(r => r.json()).then(console.log);
```

### 4. Database Connectivity

Verify data persists:

1. Create project while signed in
2. Refresh page (should still show project)
3. Logout and login with same account
4. Project should still be visible

### 5. Performance Check

Use Lighthouse in Chrome DevTools:

1. Open frontend URL
2. Press F12 → Lighthouse tab
3. Run performance audit
4. Target: 80+ Lighthouse score

### 6. Monitor Logs

**Render Backend Logs:**
- Dashboard → Service → Logs
- Monitor for errors

**Netlify Frontend Logs:**
- Dashboard → Deploys
- Click latest deploy → Deploy log

---

## Deployment Checklist

### Pre-Deployment

- [ ] Backend .env configured for production
- [ ] Frontend .env.production created with correct API URL
- [ ] MongoDB Atlas cluster created and white-listed
- [ ] Database user created with strong password
- [ ] `.gitignore` excludes `.env`, `node_modules/`
- [ ] Local build succeeds: `npm run build`
- [ ] CORS configured in backend
- [ ] Both repos pushed to GitHub

### During Deployment

- [ ] Backend deployed to Render (environment vars set)
- [ ] Frontend deployed to Netlify (environment vars set)
- [ ] Copy backend URL from Render
- [ ] Add backend URL to frontend `.env.production`
- [ ] Trigger frontend redeploy

### Post-Deployment

- [ ] Health check: Backend responds to `/api/health`
- [ ] Frontend loads without 404 errors
- [ ] Signup/Login works end-to-end
- [ ] User data persists in MongoDB
- [ ] All API endpoints return correct data
- [ ] No CORS errors in browser console
- [ ] JWT tokens work correctly
- [ ] Responsive design works on mobile

---

## Monitoring & Maintenance

### Keep Services Alive (Prevent Render Spin-Down)

Add to frontend `App.jsx`:

```javascript
useEffect(() => {
  // Keep Render backend alive - ping every 10 minutes
  const keepAlive = setInterval(() => {
    fetch(process.env.VITE_API_URL + '/health')
      .catch(() => {});
  }, 10 * 60 * 1000);
  
  return () => clearInterval(keepAlive);
}, []);
```

### Monitor Error Logs

**Render:**
- Navigate to service dashboard
- Check "Logs" for runtime errors

**Netlify:**
- Navigate to Site analytics
- Check "Functions" logs

**MongoDB Atlas:**
- Go to Atlas dashboard
- Check collection sizes and indexes

### Scale Up When Ready

**Upgrade paths:**

| Component | Free Tier | Paid (Starting Price) |
|-----------|-----------|-------------------|
| **MongoDB** | M0 (512MB) | M2 ($9/month) |
| **Render** | Shared CPU, 512MB RAM | Standard ($7/month) |
| **Netlify** | 125K requests/month | Pro ($19/month) |

---

## Production Best Practices

1. **Use Environment Variables** - Never hardcode secrets
2. **Enable HTTPS** - All URLs should be `https://`
3. **Set strong JWT_SECRET** - Minimum 32 random characters
4. **Regular Backups** - MongoDB Atlas has daily backups
5. **Monitor Logs** - Check for errors regularly
6. **Rate Limiting** - Add to prevent abuse
7. **Error Tracking** - Use Sentry or similar for alerts
8. **Keep Dependencies Updated** - Run `npm audit` regularly

---

## Quick Reference URLs

| Component | Type | URL |
|-----------|------|-----|
| MongoDB Atlas | Database | https://cloud.mongodb.com |
| Render | Backend Hosting | https://render.com |
| Netlify | Frontend Hosting | https://netlify.com |
| GitHub | Repository | https://github.com |

---

## Support Resources

- **MongoDB:** https://docs.mongodb.com/
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com/
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/

---

**Last Updated:** March 12, 2026
**Version:** 1.0
**Status:** Production Ready ✅
