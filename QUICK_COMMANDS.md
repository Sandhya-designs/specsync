# SpecSync - Quick Commands Reference

A handy reference for common operations and commands.

---

## 🚀 Server Management

### Start Server (Development)
```bash
npm run dev
```
Auto-reloads on file changes (requires nodemon)

### Start Server (Production)
```bash
npm start
```

### Stop Server
```
Ctrl + C  (on Windows/Mac/Linux)
```

### Check Health
```bash
curl http://localhost:5000/health
```

---

## 🔧 Database Management

### MongoDB - Start Local Server
```bash
# Windows
mongod

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### MongoDB - Connect to Database
```bash
mongosh
use specsync
```

### MongoDB - View Collections
```bash
show collections
db.users.find()
db.projects.find()
db.requirements.find()
db.features.find()
db.testcases.find()
```

### MongoDB - Clear Database
```bash
db.dropDatabase()
```

---

## 📦 Dependencies

### Install All Dependencies
```bash
npm install
```

### Install Specific Package
```bash
npm install package-name
```

### Update Dependencies
```bash
npm update
```

### Check for Security Issues
```bash
npm audit
npm audit fix
```

### List Installed Packages
```bash
npm list
```

---

## 🔐 Authentication Commands

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Developer"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (replace TOKEN_HERE)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 📊 Project Commands

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "My Project",
    "description": "Project description",
    "status": "Active"
  }'
```

### List Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Get Project Details
```bash
curl -X GET http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 📋 Requirement Commands

### Create Requirement
```bash
curl -X POST http://localhost:5000/api/requirements \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "reqId": "REQ-001",
    "title": "User Login",
    "description": "Implement user login feature",
    "priority": "High",
    "acceptanceCriteria": ["Login page", "JWT token"]
  }'
```

### List Requirements
```bash
curl -X GET "http://localhost:5000/api/requirements?projectId=PROJECT_ID" \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Update Requirement (Creates New Version)
```bash
curl -X PUT http://localhost:5000/api/requirements/REQ_ID \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description",
    "changeLog": "Updated acceptance criteria"
  }'
```

### Get Version History
```bash
curl -X GET http://localhost:5000/api/requirements/REQ_ID/versions \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## ⚙️ Feature Commands

### Create Feature
```bash
curl -X POST http://localhost:5000/api/features \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "featureName": "Login Module",
    "description": "Login functionality",
    "requirementId": "REQ_ID",
    "implementedVersion": 1,
    "status": "In Development"
  }'
```

### List Features
```bash
curl -X GET "http://localhost:5000/api/features?projectId=PROJECT_ID" \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Update Feature
```bash
curl -X PUT http://localhost:5000/api/features/FEATURE_ID \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Complete",
    "implementedVersion": 2
  }'
```

---

## 🧪 Test Case Commands

### Create Test Case
```bash
curl -X POST http://localhost:5000/api/testcases \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "testCaseId": "TC-001",
    "title": "Test login",
    "featureId": "FEATURE_ID",
    "requirementId": "REQ_ID",
    "steps": [
      {
        "step": 1,
        "description": "Navigate to login",
        "expectedResult": "Login page displayed"
      }
    ],
    "priority": "High"
  }'
```

### List Test Cases
```bash
curl -X GET "http://localhost:5000/api/testcases?projectId=PROJECT_ID" \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Update Test Case
```bash
curl -X PUT http://localhost:5000/api/testcases/TC_ID \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Passed",
    "lastExecuted": "2024-03-05T15:30:00Z"
  }'
```

---

## 🔍 Drift Detection Commands

### Detect Drift
```bash
curl -X GET http://localhost:5000/api/drift/PROJECT_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Get Drift by Type
```bash
curl -X GET http://localhost:5000/api/drift/PROJECT_ID/"Version Mismatch" \
  -H "Authorization: Bearer TOKEN_HERE"
```

Supported types:
- "Version Mismatch"
- "Orphan Feature"
- "Implementation Gap"
- "Testing Gap"
- "Critical Risk"

---

## 📊 Analytics Commands

### Get Analytics
```bash
curl -X GET http://localhost:5000/api/analytics/PROJECT_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

Returns:
- Requirement volatility
- Feature completion ratio
- Test coverage
- Drift metrics
- Risk level

---

## 📝 Environment Variable Commands

### View .env File
```bash
cat .env        # Unix/Mac
type .env       # Windows
```

### Edit .env File
```bash
# Use your favorite editor
nano .env       # Unix/Mac
notepad .env    # Windows
vim .env        # Vi editor
```

### Create .env from Example
```bash
cp .env.example .env
```

---

## 🔐 Role-Based Commands

### Available Roles
```
- Admin           (Full access)
- BusinessAnalyst (Create/Read/Update)
- Developer       (Read/Update features)
- QA             (Read/Update test cases)
- Viewer         (Read only)
```

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "password": "adminPassword123",
    "role": "Admin"
  }'
```

### Create Developer User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Dev",
    "lastName": "User",
    "email": "dev@example.com",
    "password": "devPassword123",
    "role": "Developer"
  }'
```

---

## 🐛 Debugging Commands

### Check Port Usage
```bash
# Unix/Mac
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

### Kill Process on Port
```bash
# Unix/Mac
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

### View Node Version
```bash
node --version
```

### View npm Version
```bash
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

---

## 🚀 Development Commands

### Run with Auto-Reload
```bash
npm run dev
```

### Format Code (if ESLint configured)
```bash
npm run lint
```

### Run Tests (if configured)
```bash
npm test
```

### Build for Production
```bash
npm run build
```

---

## 📋 Git Commands (Optional)

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Add Remote
```bash
git remote add origin https://github.com/yourusername/repo.git
```

### Push to Repository
```bash
git push -u origin main
```

---

## 🌐 Testing APIs with curl

### Save Response to File
```bash
curl http://localhost:5000/health > response.json
```

### Display Response with Pretty Print
```bash
curl http://localhost:5000/health | jq .
```

### Show Response Headers Only
```bash
curl -i http://localhost:5000/health
```

### Show Request Headers
```bash
curl -v http://localhost:5000/health
```

---

## 📚 Useful References

- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **Mongoose Docs**: https://mongoosejs.com
- **JWT Docs**: https://jwt.io
- **Postman Docs**: https://learning.postman.com

---

## 🎯 Quick Workflow

```bash
# 1. Start MongoDB
mongod

# 2. Start server in another terminal
npm run dev

# 3. Signup (copy token from response)
curl -X POST http://localhost:5000/api/auth/signup ...

# 4. Create project (use token)
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN" ...

# 5. Create requirement
curl -X POST http://localhost:5000/api/requirements \
  -H "Authorization: Bearer TOKEN" ...

# 6. Create feature
curl -X POST http://localhost:5000/api/features \
  -H "Authorization: Bearer TOKEN" ...

# 7. Detect drift
curl -X GET http://localhost:5000/api/drift/PROJECT_ID \
  -H "Authorization: Bearer TOKEN"

# 8. Get analytics
curl -X GET http://localhost:5000/api/analytics/PROJECT_ID \
  -H "Authorization: Bearer TOKEN"
```

---

## 🆘 Troubleshooting Commands

### Check if Port is Open
```bash
curl -i http://localhost:5000/health
```

### Verify MongoDB Connection
```bash
mongosh
```

### Check Environment Variables
```bash
node -e "console.log(process.env)"
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache and Reinstall
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

Generated: March 5, 2026
Version: 1.0.0

For detailed documentation, see: README.md, API_REFERENCE.md, INSTALLATION_GUIDE.md
