# SpecSync - Software Requirement Drift Detection System

A production-ready Node.js + Express + MongoDB backend for detecting and managing software requirement drift in enterprise applications.

## 📋 Project Overview

SpecSync is a comprehensive system that tracks software requirements, their versions, features mapped to them, and test cases. It automatically detects requirement drift using five sophisticated algorithms to identify inconsistencies between requirements, features, and test cases.

### Key Features

- **User Authentication & Authorization**: JWT-based auth with role-based access control (Admin, BusinessAnalyst, Developer, QA, Viewer)
- **Requirement Version Control**: Track requirement versions with full audit trail
- **Drift Detection Algorithms**: 5 algorithms to detect different types of requirement drift
- **Feature Mapping**: Link features to requirements with version tracking
- **Test Case Management**: Complete test case lifecycle management
- **Analytics & Reporting**: Comprehensive project analytics and drift metrics
- **MVC Architecture**: Clean, scalable code organization
- **Error Handling**: Centralized error handling with custom error types
- **CORS Support**: Configured for frontend integration

## 🏗️ Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── constants.js         # Application constants (roles, drift types, etc.)
├── controllers/
│   ├── authController.js    # User signup/login
│   ├── projectController.js # Project management
│   ├── requirementController.js  # Requirement CRUD & versioning
│   ├── featureController.js # Feature management
│   ├── testCaseController.js    # Test case management
│   └── driftController.js   # Drift detection & analytics
├── middleware/
│   ├── authenticate.js      # JWT authentication
│   ├── authorize.js         # Role-based authorization
│   └── errorMiddleware.js   # Global error handling
├── models/
│   ├── User.js             # User schema with password hashing
│   ├── Project.js          # Project schema
│   ├── Requirement.js      # Master requirement schema
│   ├── RequirementVersion.js   # Requirement version history
│   ├── Feature.js          # Feature schema
│   └── TestCase.js         # Test case schema
├── routes/
│   ├── authRoutes.js       # Authentication endpoints
│   ├── projectRoutes.js    # Project endpoints
│   ├── requirementRoutes.js    # Requirement endpoints
│   ├── featureRoutes.js    # Feature endpoints
│   ├── testCaseRoutes.js   # Test case endpoints
│   └── driftRoutes.js      # Drift detection endpoints
├── services/
│   └── driftService.js     # Core drift detection algorithms
├── utils/
│   ├── responseHandler.js  # Centralized response formatting
│   ├── errorHandler.js     # Custom error classes
│   └── jwtUtils.js        # JWT token utilities
├── app.js                  # Express app configuration
├── server.js              # Server initialization
├── package.json           # Project dependencies
└── .env.example           # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or setup the project**
```bash
cd backend
npm install
```

2. **Create .env file**
```bash
cp .env.example .env
```

3. **Edit .env with your configuration**
```
NODE_ENV=development
PORT=5000
HOST=localhost

MONGODB_URI=mongodb://localhost:27017/specsync
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Run the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Create a new user account
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "Developer"
}
```

#### POST /api/auth/login
Login and get JWT token
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### GET /api/auth/me
Get current user (requires authentication)

### Project Endpoints

#### POST /api/projects
Create a new project (Admin, BusinessAnalyst only)
```json
{
  "projectName": "Feature X Development",
  "description": "Development of Feature X",
  "status": "Active"
}
```

#### GET /api/projects
List all projects for current user

#### GET /api/projects/:projectId
Get project details

#### PUT /api/projects/:projectId
Update project

#### DELETE /api/projects/:projectId
Delete project (Admin only)

### Requirement Endpoints

#### POST /api/requirements
Create a new requirement
```json
{
  "projectId": "60d5ec49c1234567890abcd1",
  "reqId": "REQ-001",
  "title": "User Authentication",
  "description": "Implement JWT-based authentication",
  "priority": "High",
  "acceptanceCriteria": ["Login works", "Token generated", "Protected routes"]
}
```

#### GET /api/requirements
List requirements (requires projectId query param)

#### GET /api/requirements/:requirementId
Get requirement details

#### PUT /api/requirements/:requirementId
Update requirement (creates new version)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "changeLog": "Added new acceptance criteria"
}
```

#### GET /api/requirements/:requirementId/versions
Get version history

### Feature Endpoints

#### POST /api/features
Create a feature
```json
{
  "projectId": "60d5ec49c1234567890abcd1",
  "featureName": "Login Module",
  "description": "Login functionality",
  "requirementId": "60d5ec49c1234567890abcd2",
  "implementedVersion": 1,
  "status": "In Development"
}
```

#### GET /api/features
List features (requires projectId query param)

#### GET /api/features/:featureId
Get feature details

#### PUT /api/features/:featureId
Update feature

#### DELETE /api/features/:featureId
Delete feature

### Test Case Endpoints

#### POST /api/testcases
Create a test case
```json
{
  "projectId": "60d5ec49c1234567890abcd1",
  "testCaseId": "TC-001",
  "title": "Login with valid credentials",
  "featureId": "60d5ec49c1234567890abcd3",
  "requirementId": "60d5ec49c1234567890abcd2",
  "steps": [
    {
      "step": 1,
      "description": "Navigate to login page",
      "expectedResult": "Login form displayed"
    }
  ],
  "priority": "High"
}
```

#### GET /api/testcases
List test cases (requires projectId query param)

#### GET /api/testcases/:testCaseId
Get test case details

#### PUT /api/testcases/:testCaseId
Update test case

#### DELETE /api/testcases/:testCaseId
Delete test case

### Drift Detection Endpoints

#### GET /api/drift/:projectId
Get complete drift analysis
```json
{
  "statusCode": 200,
  "data": {
    "driftIssues": [],
    "driftScore": 15,
    "riskLevel": "Moderate",
    "totalIssues": 3,
    "issueCounts": {
      "critical": 0,
      "high": 1,
      "medium": 2,
      "low": 0
    },
    "breakdown": {
      "versionMismatch": 1,
      "orphanFeatures": 1,
      "implementationGaps": 1,
      "testingGaps": 0,
      "criticalRisks": 0
    }
  }
}
```

#### GET /api/drift/:projectId/:driftType
Get drift issues of specific type (e.g., "Version Mismatch")

### Analytics Endpoints

#### GET /api/analytics/:projectId
Get comprehensive project analytics
```json
{
  "requirementMetrics": {
    "total": 10,
    "volatilityRate": 1.5,
    "statusDistribution": {},
    "priorityDistribution": {},
    "mostModifiedRequirements": []
  },
  "featureMetrics": {
    "total": 8,
    "completionRatio": 62.5,
    "completedCount": 5
  },
  "testingMetrics": {
    "totalTestCases": 15,
    "testCoverage": 87.5,
    "featuresWithTestCount": 7
  },
  "driftMetrics": {
    "totalDriftIssues": 3,
    "driftScore": 15,
    "riskLevel": "Moderate"
  }
}
```

## 🔐 User Roles & Permissions

| Role | Create | Read | Update | Delete | Manage Users |
|------|--------|------|--------|--------|--------------|
| Admin | ✓ | ✓ | ✓ | ✓ | ✓ |
| BusinessAnalyst | ✓ | ✓ | ✓ | ✗ | ✗ |
| Developer | ✗ | ✓ | ✓ | ✗ | ✗ |
| QA | ✗ | ✓ | ✓ | ✗ | ✗ |
| Viewer | ✗ | ✓ | ✗ | ✗ | ✗ |

## 🔍 Drift Detection Algorithms

### Algorithm 1: Version Mismatch
Detects when a feature implements an older version of a requirement.
```
If feature.implementedVersion < requirement.currentVersion
→ Drift Type: Version Mismatch
→ Severity: Medium
```

### Algorithm 2: Orphan Feature
Detects features not linked to any requirement.
```
If feature.requirementId is null
→ Drift Type: Orphan Feature
→ Severity: High
```

### Algorithm 3: Implementation Gap
Detects requirements with no linked feature.
```
If requirement exists but no feature linked
→ Drift Type: Implementation Gap
→ Severity: High
```

### Algorithm 4: Testing Gap
Detects features without test cases.
```
If feature in [Development, Complete, Testing, Released] but no test case
→ Drift Type: Testing Gap
→ Severity: Medium
```

### Algorithm 5: Critical Risk
Detects high/critical priority requirements without features.
```
If requirement.priority in [High, Critical] and no feature linked
→ Drift Type: Critical Risk
→ Severity: Critical
```

## 📊 Drift Score Calculation

```
Drift Score = (Critical × 5) + (High × 3) + (Medium × 2) + (Low × 1)

Risk Levels:
- Stable:   0-10
- Moderate: 10-25
- High Risk: 25+
```

## 🛡️ Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **Role-Based Access Control**: Fine-grained permission system
- **Input Validation**: Schema validation via Mongoose
- **CORS**: Configured cross-origin requests
- **Error Handling**: No sensitive info in error messages
- **Environment Variables**: Secure configuration management

## 📝 Database Models

### User
- Authentication and role management
- Password hashing with bcryptjs
- Active/inactive status
- Last login tracking

### Project
- Project management with team
- Owner-based access control
- Team member assignments with roles

### Requirement
- Master requirement record
- Version management with linked versions
- Status and priority tracking
- Acceptance criteria

### RequirementVersion
- Historical record of requirement changes
- Version numbering
- Change logs
- Created by user tracking

### Feature
- Implementation of requirements
- Version tracking against requirements
- Status management
- Orphan feature detection

### TestCase
- Test case documentation
- Links to features and requirements
- Test steps with expected results
- Execution history

## 🚨 Error Handling

The API uses consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "success": false,
  "errors": ["Field is required"]
}
```

### Custom Error Classes
- `ValidationError` (400)
- `AuthenticationError` (401)
- `AuthorizationError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)
- `ServiceError` (500)

## 🔗 Async/Await Pattern

All controllers use async/await for clean, readable asynchronous code:

```javascript
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project');
    }
    return sendResponse(res, 200, project);
  } catch (error) {
    next(error);
  }
};
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon**: Development auto-restart

## 🧪 Testing the API

Use Postman, Insomnia, or cURL to test endpoints:

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (use token from login)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📖 Best Practices Implemented

✓ **ES6 Modules**: Modern JavaScript module system
✓ **MVC Architecture**: Clean separation of concerns
✓ **Error Handling**: Comprehensive error handling
✓ **Async/Await**: Modern async patterns
✓ **Input Validation**: Schema and business logic validation
✓ **Database Indexes**: Performance optimization
✓ **Comments**: Clear business logic documentation
✓ **Env Variables**: Secure configuration
✓ **Response Formatting**: Consistent API responses
✓ **Middleware Pattern**: Extensible middleware architecture

## 🤝 Contributing

When contributing to SpecSync:

1. Follow the existing code style
2. Use meaningful variable names
3. Add comments for complex business logic
4. Handle errors properly
5. Write clean, modular code
6. Test endpoints before committing

## 📄 License

This project is proprietary and confidential.

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity

### CORS Error
- Update CORS_ORIGIN in .env with your frontend URL
- Ensure credentials are set correctly

### JWT Expired
- Tokens expire after 7 days (configurable via JWT_EXPIRE)
- User needs to login again to get new token

### Port Already in Use
- Change PORT in .env to another port
- Or kill process using the port

## 📞 Support

For issues or questions, contact the development team.

---

**SpecSync** - Your comprehensive solution for requirement drift detection and management! 🎯
