# MERN Deployment - Quick Reference Checklist

## Phase 1: MongoDB Atlas Setup (5 min)

```
☐ Register at https://www.mongodb.com/cloud/atlas
☐ Create new project: "specsync-prod"
☐ Build free cluster (M0, AWS, closest region)
☐ Create user: specsync_admin
☐ Save password securely
☐ Network Access: Add IP 0.0.0.0/0
☐ Copy connection string
☐ Format: mongodb+srv://specsync_admin:PASSWORD@cluster.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
☐ Save to secure location
```

**Result:** `MONGO_URI` ready ✅

---

## Phase 2: Backend Setup & Deployment (15 min)

### Local Preparation

```bash
# 1. Update backend .env
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://specsync_admin:PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
JWT_SECRET=your_secure_key_minimum_32_chars_long123456
JWT_EXPIRE=30d
CORS_ORIGIN=https://specsync-frontend-xxx.netlify.app

# 2. Create .gitignore
node_modules/
.env
dist/
.DS_Store

# 3. Test locally
npm run build
npm start
```

### GitHub Push

```bash
cd c:\MERN\backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/specsync-backend.git
git branch -M main
git push -u origin main
```

**Checklist:**

```
☐ .env configured for production
☐ CORS_ORIGIN set to frontend URL (placeholder OK)
☐ Local build succeeds
☐ GitHub repo created
☐ Code pushed to GitHub
```

### Render Deployment

```
☐ Go to https://render.com
☐ Sign up with GitHub
☐ Connect specsync-backend repo
☐ Build Command: npm install
☐ Start Command: npm start
☐ Add all environment variables (NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRE, CORS_ORIGIN)
☐ Click "Create Web Service"
☐ Wait 3-5 minutes for deployment
☐ Copy backend URL: https://specsync-backend-xxxx.onrender.com
```

**Result:** Backend deployed ✅

---

## Phase 3: Frontend Setup & Deployment (15 min)

### Local Preparation

```bash
# 1. Create .env.production
VITE_API_URL=https://specsync-backend-xxxx.onrender.com/api

# 2. Test build
npm run build
npm run preview

# 3. Verify dist/ folder created
```

### GitHub Push

```bash
cd c:\MERN\frontend
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/YOUR_USERNAME/specsync-frontend.git
git branch -M main
git push -u origin main
```

**Checklist:**

```
☐ .env.production created with backend URL
☐ Local build succeeds
☐ dist/ folder contains index.html
☐ GitHub repo created
☐ Code pushed to GitHub
```

### Netlify Deployment

**Option A: Automatic (Recommended)**

```
☐ Go to https://app.netlify.com
☐ Sign up with GitHub
☐ Click "Add new site" → "Import existing project"
☐ Select specsync-frontend repo
☐ Build Command: npm run build
☐ Publish Directory: dist
☐ Deploy
☐ Go to Site Settings → Environment → Add VITE_API_URL
☐ Trigger redeploy
☐ Copy frontend URL: https://specsync-frontend-xxx.netlify.app
```

**Option B: Manual**

```
☐ Run: npm run build
☐ Drag dist/ folder to https://app.netlify.com
☐ Wait for deployment
☐ Copy generated URL
```

**Result:** Frontend deployed ✅

---

## Phase 4: Integration & Testing (10 min)

### Update Backend CORS

After frontend URL is known, update backend:

```
☐ Go to Render dashboard
☐ Select specsync-backend service
☐ Environment → Edit CORS_ORIGIN
☐ Set to: https://specsync-frontend-xxx.netlify.app
☐ Click Save/Deploy
```

### Test Connection

Open browser console and run:

```javascript
// Test 1: Backend health
fetch('https://specsync-backend-xxxx.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend:', d))
  .catch(e => console.log('❌ Error:', e));

// Test 2: Frontend loading
// Just visit https://specsync-frontend-xxx.netlify.app
```

### End-to-End Test

```
☐ Open frontend URL in browser
☐ Go to Signup page
☐ Create account with test email
☐ Verify no CORS errors in console
☐ Logout
☐ Login with account
☐ Create a project
☐ Refresh page - project still visible
☐ Navigate all pages (Projects, Requirements, Features, etc.)
☐ Test Drift Report with sample data
☐ Check Analytics charts load
```

**Result:** Full integration working ✅

---

## Common Issues & Quick Fixes

### "CORS policy blocked"
```
→ Check CORS_ORIGIN in Render environment
→ Must exactly match frontend URL
→ Redeploy backend after changing
```

### "Cannot GET /api/..."
```
→ Verify backend URL in .env.production
→ Check API endpoints exist in backend routes
→ Add health check: app.get('/api/health', ...)
```

### "Backend takes 30 sec to respond"
```
→ Normal for Render free tier (service spin-down)
→ Add keep-alive ping in frontend App.jsx
```

### "404 on page refresh"
```
→ Add to public/_redirects or netlify.toml:
   /* /index.html 200
→ Redeploy frontend
```

### "Connection refused - backend offline"
```
→ Check Render logs for errors
→ Database might be unreachable
→ Test MONGO_URI connection string
```

---

## Environment Variables Summary

### Backend (Render)

```
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://specsync_admin:PASSWORD@cluster.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
JWT_SECRET=random_secure_key_minimum_32_characters_here
JWT_EXPIRE=30d
CORS_ORIGIN=https://specsync-frontend-xxx.netlify.app
```

### Frontend (Netlify)

```
VITE_API_URL=https://specsync-backend-xxxx.onrender.com/api
```

### MongoDB Atlas (Connection URI)

```
mongodb+srv://specsync_admin:PASSWORD@cluster0.xxxxx.mongodb.net/specsync_prod?retryWrites=true&w=majority
```

---

## URLs to Save

| Service | URL |
|---------|-----|
| **MongoDB Atlas** | https://cloud.mongodb.com |
| **Render Backend** | https://specsync-backend-xxxx.onrender.com |
| **Netlify Frontend** | https://specsync-frontend-xxx.netlify.app |
| **Render Dashboard** | https://dashboard.render.com |
| **Netlify Dashboard** | https://app.netlify.com |
| **GitHub Backend** | https://github.com/YOU/specsync-backend |
| **GitHub Frontend** | https://github.com/YOU/specsync-frontend |

---

## Estimated Times

| Task | Time |
|------|------|
| MongoDB setup | 5 min |
| Backend deploy | 10 min (+ 5 min for build) |
| Frontend deploy | 10 min (+ 5 min for build) |
| Testing | 5 min |
| **Total** | **45 min** |

**First request after deployment:** Add 30 sec (Render spin-down)

---

## Post-Deployment

### Monitoring

- Check Render logs daily for errors
- Monitor frontend errors via browser console
- Review MongoDB collection sizes

### Keep Services Alive

Add to frontend `App.jsx`:

```javascript
useEffect(() => {
  // Ping backend every 10 minutes
  setInterval(() => {
    fetch(process.env.VITE_API_URL + '/health').catch(() => {});
  }, 10 * 60 * 1000);
}, []);
```

### Update Process

For future deployments:

```bash
# Backend
git add .
git commit -m "Feature: add new endpoint"
git push origin main
# Render auto-deploys

# Frontend
git add .
git commit -m "Feature: add new page"
git push origin main
# Netlify auto-deploys
```

---

## Troubleshooting Flowchart

```
Frontend not loading?
├─ Check Netlify deploy log (Failed build?)
├─ Clear browser cache (Ctrl+Shift+Delete)
└─ Check internet connection

API errors in console?
├─ Check backend URL in .env.production
├─ Verify CORS_ORIGIN in Render
├─ Test backend health endpoint
└─ Check MongoDB connection

Page refresh shows 404?
├─ Add _redirects to public/
├─ Or add netlify.toml redirect
└─ Redeploy frontend

Cannot create account?
├─ Check backend is running (test health endpoint)
├─ Verify MongoDB is connected
├─ Check backend logs for errors
└─ Verify JWT_SECRET is set

Data not saving?
├─ Verify MONGO_URI in backend env
├─ Check MongoDB network access (0.0.0.0/0)
├─ Test database connection string locally
└─ Check database user credentials
```

---

**Status:** Ready for Production Deployment ✅
**Last Updated:** March 12, 2026
**Next Step:** Follow the checklist above in order!
