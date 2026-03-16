# SpecSync - Installation & Quick Start Guide

## 📦 Prerequisites

Before starting, ensure you have:
- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)
- **Git** (for version control)
- **Postman** or **Insomnia** (optional, for API testing)

### Check Versions
```bash
node --version      # Should be v14.0.0 or higher
npm --version       # Should be v6.0.0 or higher
mongod --version    # Should be installed
```

---

## 🚀 Installation Steps

### Step 1: Clone or Extract Project
```bash
cd backend
# or if you extracted from zip file, navigate to the extracted folder
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# On Windows (if MongoDB is installed)
mongod

# On macOS (if using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster
3. Copy connection string
4. Add to `.env` file as `MONGODB_URI`

### Step 4: Create Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
NODE_ENV=development
PORT=5000
HOST=localhost

MONGODB_URI=mongodb://localhost:27017/specsync
JWT_SECRET=your_very_secure_secret_key_change_in_production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000,http://localhost:3001
LOG_LEVEL=info
```

### Step 5: Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              🎯 SpecSync Backend Server                   ║
║     Software Requirement Drift Detection System           ║
║                                                            ║
║  ✓ Server running on: http://localhost:5000              ║
║  ✓ Environment: development                              ║
║  ✓ Database: Connected                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## ✅ Verify Installation

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "success",
  "message": "SpecSync API is running",
  "timestamp": "2024-03-05T10:00:00Z"
}
```

### 2. Test Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "role": "Developer"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Copy the `token` from the response. You'll use this for subsequent requests.

### 4. Test Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Quick Start Workflow

### Step 1: Create Account
Use Postman or the signup example above to create an admin account.

### Step 2: Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "My First Project",
    "description": "Testing SpecSync",
    "status": "Active"
  }'
```

Save the returned `projectId`.

### Step 3: Create Requirement
```bash
curl -X POST http://localhost:5000/api/requirements \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID_FROM_STEP_2",
    "reqId": "REQ-001",
    "title": "User Login System",
    "description": "Implement secure user login",
    "priority": "High",
    "acceptanceCriteria": ["Login page", "Password validation"]
  }'
```

Save the returned `requirementId` and `id`.

### Step 4: Create Feature
```bash
curl -X POST http://localhost:5000/api/features \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "featureName": "Login Module",
    "description": "Login feature implementation",
    "requirementId": "REQUIREMENT_ID",
    "implementedVersion": 1,
    "status": "In Development"
  }'
```

### Step 5: Create Test Case
```bash
curl -X POST http://localhost:5000/api/testcases \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "testCaseId": "TC-001",
    "title": "Test login with valid credentials",
    "featureId": "FEATURE_ID",
    "requirementId": "REQUIREMENT_ID",
    "steps": [
      {
        "step": 1,
        "description": "Navigate to login",
        "expectedResult": "Login form displayed"
      }
    ],
    "priority": "High"
  }'
```

### Step 6: Detect Drift
```bash
curl http://localhost:5000/api/drift/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

You should see:
```json
{
  "driftIssues": [],
  "driftScore": 0,
  "riskLevel": "Stable",
  "totalIssues": 0
}
```

### Step 7: Get Analytics
```bash
curl http://localhost:5000/api/analytics/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📚 Using Postman

### Import Endpoints
Create a collection in Postman with these endpoints:

1. **Auth Endpoints**
   - POST /api/auth/signup
   - POST /api/auth/login
   - GET /api/auth/me

2. **Project Endpoints**
   - POST /api/projects
   - GET /api/projects
   - GET /api/projects/:projectId

3. **Requirement Endpoints**
   - POST /api/requirements
   - GET /api/requirements
   - PUT /api/requirements/:requirementId

4. **Feature Endpoints**
   - POST /api/features
   - GET /api/features
   - PUT /api/features/:featureId

5. **Test Case Endpoints**
   - POST /api/testcases
   - GET /api/testcases
   - PUT /api/testcases/:testCaseId

6. **Drift Detection**
   - GET /api/drift/:projectId
   - GET /api/analytics/:projectId

### Set Up Authorization
1. Create login request to get token
2. In Postman, go to "Authorization" tab
3. Select "Bearer Token"
4. Paste token from login response
5. All requests will use this token

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install` again
```bash
npm install
```

### Issue: "MongoDB connection refused"
**Solution:** Ensure MongoDB is running
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### Issue: "Port 5000 already in use"
**Solution:** Change port in `.env`
```env
PORT=5001
```

### Issue: "Invalid token" error
**Solution:** Token may have expired, login again to get new token

### Issue: "CORS error from frontend"
**Solution:** Update CORS_ORIGIN in .env
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://your-frontend-url
```

### Issue: "JWT_SECRET not found"
**Solution:** Make sure .env file exists and contains JWT_SECRET
```bash
# Copy example
cp .env.example .env

# Edit .env with your values
```

---

## 📁 File Structure Review

After installation, your directory should look like:
```
backend/
├── config/
│   ├── database.js
│   └── constants.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── requirementController.js
│   ├── featureController.js
│   ├── testCaseController.js
│   └── driftController.js
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Project.js
│   ├── Requirement.js
│   ├── RequirementVersion.js
│   ├── Feature.js
│   └── TestCase.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── requirementRoutes.js
│   ├── featureRoutes.js
│   ├── testCaseRoutes.js
│   └── driftRoutes.js
├── services/
│   └── driftService.js
├── utils/
│   ├── responseHandler.js
│   ├── errorHandler.js
│   └── jwtUtils.js
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── app.js
├── server.js
├── README.md
└── API_REFERENCE.md
```

---

## 🔗 Connecting Frontend

### React/Vue Configuration
Add your backend URL to your frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
VUE_APP_API_URL=http://localhost:5000/api
```

### Axios Example
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 📦 Production Deployment

### Before Deploying

1. **Update environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_secret_key
   CORS_ORIGIN=your_frontend_url
   ```

2. **Run security checks**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Test build**
   ```bash
   npm start
   ```

4. **Consider deployment platforms:**
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Google Cloud
   - Azure

---

## 💡 Next Steps

1. **Read README.md** for detailed documentation
2. **Check API_REFERENCE.md** for all endpoints
3. **Explore Models** to understand data structure
4. **Study Services** to understand drift detection logic
5. **Test All Endpoints** using Postman collection
6. **Connect Frontend** and start building your app

---

## 🆘 Getting Help

### Check Logs
```bash
# Watch logs in real-time
# Logs are printed to console in development mode
```

### Common Issues Resource
Check the **Troubleshooting** section in README.md

### Error Codes
- **400**: Bad request - check your input
- **401**: Unauthorized - check your token
- **403**: Forbidden - insufficient permissions
- **404**: Not found - check resource exists
- **500**: Server error - check logs

---

## ✨ Features Ready to Use

✅ User Authentication with JWT
✅ Role-Based Access Control
✅ Project Management
✅ Requirement Versioning
✅ Feature Tracking
✅ Test Case Management
✅ Drift Detection (5 algorithms)
✅ Analytics & Reporting
✅ Error Handling
✅ CORS Support
✅ Environment Configuration
✅ MongoDB Integration

---

## 🎊 You're Ready!

Your SpecSync backend is now ready for development. Start building amazing features!

For detailed API documentation, see: **API_REFERENCE.md**
For project details, see: **README.md**

Happy coding! 🚀
