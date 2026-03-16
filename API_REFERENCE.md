# SpecSync API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except signup and login) require JWT token in header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Sign Up
**POST** `/auth/signup`

Create a new user account.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "Developer"
}
```

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "id": "60d5ec49c1234567890abcd1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "Developer",
      "isActive": true,
      "createdAt": "2024-03-05T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully",
  "success": true
}
```

**Available Roles:** Admin, BusinessAnalyst, Developer, QA, Viewer

---

### 2. Login
**POST** `/auth/login`

Login and receive JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "user": { "id": "...", "email": "john@example.com", ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful",
  "success": true
}
```

---

### 3. Get Current User
**GET** `/auth/me`

Get currently logged-in user information.

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "60d5ec49c1234567890abcd1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "Developer",
    "isActive": true
  },
  "message": "User retrieved successfully",
  "success": true
}
```

---

## 📊 PROJECT ENDPOINTS

### 1. Create Project
**POST** `/projects`

**Roles:** Admin, BusinessAnalyst

**Request:**
```json
{
  "projectName": "Feature X Development",
  "description": "Development of Feature X",
  "status": "Active"
}
```

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "60d5ec49c1234567890abcd2",
    "projectName": "Feature X Development",
    "description": "Development of Feature X",
    "status": "Active",
    "owner": { "id": "...", "email": "..." },
    "team": [{ "userId": { ... }, "role": "Project Manager" }],
    "createdAt": "2024-03-05T10:00:00Z"
  },
  "message": "Project created successfully",
  "success": true
}
```

---

### 2. List Projects
**GET** `/projects`

Get all projects for current user.

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "projects": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10
    }
  },
  "message": "Projects retrieved successfully",
  "success": true
}
```

---

### 3. Get Project Details
**GET** `/projects/:projectId`

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "60d5ec49c1234567890abcd2",
    "projectName": "Feature X Development",
    "description": "Development of Feature X",
    "status": "Active",
    "owner": { ... },
    "team": [ ... ],
    "createdAt": "2024-03-05T10:00:00Z"
  },
  "message": "Project details retrieved successfully",
  "success": true
}
```

---

### 4. Update Project
**PUT** `/projects/:projectId`

**Roles:** Admin, BusinessAnalyst

**Request:**
```json
{
  "projectName": "Updated Project Name",
  "status": "On Hold"
}
```

---

### 5. Delete Project
**DELETE** `/projects/:projectId`

**Roles:** Admin only

---

## 📋 REQUIREMENT ENDPOINTS

### 1. Create Requirement
**POST** `/requirements`

**Roles:** Admin, BusinessAnalyst

**Request:**
```json
{
  "projectId": "60d5ec49c1234567890abcd2",
  "reqId": "REQ-001",
  "title": "User Authentication System",
  "description": "Implement JWT-based user authentication",
  "priority": "High",
  "acceptanceCriteria": [
    "Login page created",
    "JWT tokens generated",
    "Protected routes implemented",
    "Token refresh mechanism"
  ]
}
```

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "60d5ec49c1234567890abcd3",
    "projectId": "60d5ec49c1234567890abcd2",
    "reqId": "REQ-001",
    "title": "User Authentication System",
    "description": "Implement JWT-based user authentication",
    "priority": "High",
    "status": "Draft",
    "currentVersion": 1,
    "versions": ["60d5ec49c1234567890abcd4"],
    "acceptanceCriteria": ["Login page created", ...],
    "createdBy": { ... },
    "createdAt": "2024-03-05T10:00:00Z"
  },
  "message": "Requirement created successfully",
  "success": true
}
```

---

### 2. List Requirements
**GET** `/requirements?projectId=:projectId`

**Query Parameters:**
- `projectId` (required)
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

---

### 3. Get Requirement Details
**GET** `/requirements/:requirementId`

Includes full version history.

---

### 4. Update Requirement
**PUT** `/requirements/:requirementId`

**Roles:** Admin, BusinessAnalyst

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "Critical",
  "acceptanceCriteria": ["Updated criteria"],
  "changeLog": "Updated priority to Critical"
}
```

**Important:** Updates create a new version automatically.

---

### 5. Get Version History
**GET** `/requirements/:requirementId/versions`

Returns all versions of the requirement sorted by version number (newest first).

---

## ⚙️ FEATURE ENDPOINTS

### 1. Create Feature
**POST** `/features`

**Roles:** Admin, BusinessAnalyst, Developer

**Request:**
```json
{
  "projectId": "60d5ec49c1234567890abcd2",
  "featureName": "Login Module",
  "description": "User login functionality with JWT",
  "requirementId": "60d5ec49c1234567890abcd3",
  "implementedVersion": 1,
  "status": "In Development"
}
```

**Optional Fields:**
- `requirementId` (can be null for orphan features)
- `implementedVersion` (null if not yet assigned)

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "60d5ec49c1234567890abcd5",
    "projectId": "60d5ec49c1234567890abcd2",
    "featureName": "Login Module",
    "description": "User login functionality with JWT",
    "requirementId": "60d5ec49c1234567890abcd3",
    "implementedVersion": 1,
    "status": "In Development",
    "createdBy": { ... },
    "createdAt": "2024-03-05T10:00:00Z"
  },
  "message": "Feature created successfully",
  "success": true
}
```

---

### 2. List Features
**GET** `/features?projectId=:projectId`

**Query Parameters:**
- `projectId` (required)
- `page` (optional)
- `limit` (optional)

---

### 3. Get Feature Details
**GET** `/features/:featureId`

---

### 4. Update Feature
**PUT** `/features/:featureId`

**Roles:** Admin, BusinessAnalyst, Developer

**Request:**
```json
{
  "featureName": "Updated Feature Name",
  "status": "Testing",
  "implementedVersion": 2
}
```

---

### 5. Delete Feature
**DELETE** `/features/:featureId`

**Roles:** Admin only

---

## 🧪 TEST CASE ENDPOINTS

### 1. Create Test Case
**POST** `/testcases`

**Roles:** Admin, BusinessAnalyst, QA

**Request:**
```json
{
  "projectId": "60d5ec49c1234567890abcd2",
  "testCaseId": "TC-001",
  "title": "Login with valid credentials",
  "description": "Verify user can login with correct email and password",
  "featureId": "60d5ec49c1234567890abcd5",
  "requirementId": "60d5ec49c1234567890abcd3",
  "steps": [
    {
      "step": 1,
      "description": "Navigate to login page",
      "expectedResult": "Login form displayed"
    },
    {
      "step": 2,
      "description": "Enter valid credentials",
      "expectedResult": "Form accepts input"
    },
    {
      "step": 3,
      "description": "Click login button",
      "expectedResult": "User redirected to dashboard"
    }
  ],
  "priority": "High",
  "status": "Ready"
}
```

---

### 2. List Test Cases
**GET** `/testcases?projectId=:projectId`

**Query Parameters:**
- `projectId` (required)
- `featureId` (optional)
- `requirementId` (optional)
- `page` (optional)
- `limit` (optional)

---

### 3. Get Test Case Details
**GET** `/testcases/:testCaseId`

---

### 4. Update Test Case
**PUT** `/testcases/:testCaseId`

**Roles:** Admin, BusinessAnalyst, QA

**Request:**
```json
{
  "status": "Passed",
  "lastExecuted": "2024-03-05T15:30:00Z"
}
```

---

### 5. Delete Test Case
**DELETE** `/testcases/:testCaseId`

**Roles:** Admin only

---

## 🔍 DRIFT DETECTION ENDPOINTS

### 1. Detect Drift
**GET** `/drift/:projectId`

Runs all 5 drift detection algorithms and returns results.

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "driftIssues": [
      {
        "type": "Version Mismatch",
        "severity": "Medium",
        "featureId": "60d5ec49c1234567890abcd5",
        "featureName": "Login Module",
        "requirementId": "60d5ec49c1234567890abcd3",
        "requirementTitle": "User Authentication System",
        "currentVersion": 2,
        "implementedVersion": 1,
        "description": "Feature \"Login Module\" implements requirement version 1 but requirement is at version 2"
      },
      {
        "type": "Orphan Feature",
        "severity": "High",
        "featureId": "60d5ec49c1234567890abcd6",
        "featureName": "Analytics Dashboard",
        "requirementId": null,
        "description": "Feature \"Analytics Dashboard\" is not linked to any requirement (orphan feature)"
      },
      {
        "type": "Implementation Gap",
        "severity": "High",
        "requirementId": "60d5ec49c1234567890abcd4",
        "requirementTitle": "Logging System",
        "reqId": "REQ-002",
        "featureId": null,
        "description": "Requirement \"Logging System\" (REQ-002) has no linked feature"
      },
      {
        "type": "Testing Gap",
        "severity": "Medium",
        "featureId": "60d5ec49c1234567890abcd7",
        "featureName": "Forgot Password",
        "description": "Feature \"Forgot Password\" has no test cases (testing gap)"
      },
      {
        "type": "Critical Risk",
        "severity": "Critical",
        "requirementId": "60d5ec49c1234567890abcd8",
        "requirementTitle": "Data Encryption",
        "reqId": "REQ-003",
        "priority": "Critical",
        "description": "Critical/High priority requirement \"Data Encryption\" (REQ-003) has no implementation"
      }
    ],
    "driftScore": 21,
    "riskLevel": "Moderate",
    "totalIssues": 5,
    "issueCounts": {
      "critical": 1,
      "high": 2,
      "medium": 2,
      "low": 0
    },
    "breakdown": {
      "versionMismatch": 1,
      "orphanFeatures": 1,
      "implementationGaps": 1,
      "testingGaps": 1,
      "criticalRisks": 1
    }
  },
  "message": "Drift analysis completed successfully",
  "success": true
}
```

---

### 2. Get Drift by Type
**GET** `/drift/:projectId/:driftType`

Filter drift issues by type.

**Valid Drift Types:**
- `Version Mismatch`
- `Orphan Feature`
- `Implementation Gap`
- `Testing Gap`
- `Critical Risk`

---

## 📊 ANALYTICS ENDPOINTS

### 1. Get Analytics
**GET** `/analytics/:projectId`

Comprehensive project analytics and metrics.

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "requirementMetrics": {
      "total": 10,
      "volatilityRate": 1.3,
      "statusDistribution": {
        "Draft": 2,
        "In Review": 3,
        "Approved": 4,
        "Deprecated": 1
      },
      "priorityDistribution": {
        "Low": 2,
        "Medium": 5,
        "High": 2,
        "Critical": 1
      },
      "mostModifiedRequirements": [
        {
          "id": "60d5ec49c1234567890abcd3",
          "reqId": "REQ-001",
          "title": "User Authentication System",
          "currentVersion": 4,
          "priority": "High"
        }
      ]
    },
    "featureMetrics": {
      "total": 8,
      "completionRatio": 62.5,
      "completedCount": 5,
      "statusDistribution": {
        "Planning": 1,
        "In Development": 2,
        "Complete": 4,
        "Testing": 1,
        "Released": 0
      }
    },
    "testingMetrics": {
      "totalTestCases": 15,
      "testCoverage": 87.5,
      "featuresWithTestCount": 7
    },
    "driftMetrics": {
      "totalDriftIssues": 5,
      "driftScore": 21,
      "riskLevel": "Moderate",
      "issueCounts": {
        "critical": 1,
        "high": 2,
        "medium": 2,
        "low": 0
      },
      "driftBreakdown": {
        "versionMismatch": 1,
        "orphanFeatures": 1,
        "implementationGaps": 1,
        "testingGaps": 1,
        "criticalRisks": 1
      },
      "driftByType": {
        "Version Mismatch": 1,
        "Orphan Feature": 1,
        "Implementation Gap": 1,
        "Testing Gap": 1,
        "Critical Risk": 1
      }
    }
  },
  "message": "Analytics retrieved successfully",
  "success": true
}
```

---

## ⚠️ ERROR RESPONSES

### 400 - Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "success": false,
  "errors": ["Field name is required"]
}
```

### 401 - Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid or expired token",
  "success": false
}
```

### 403 - Forbidden
```json
{
  "statusCode": 403,
  "message": "Access denied. Required role(s): Admin",
  "success": false
}
```

### 404 - Not Found
```json
{
  "statusCode": 404,
  "message": "Project not found",
  "success": false
}
```

### 409 - Conflict
```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "success": false
}
```

### 500 - Server Error
```json
{
  "statusCode": 500,
  "message": "Internal Server Error",
  "success": false
}
```

---

## 💡 Usage Examples

### Complete Workflow Example

1. **Sign Up**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice@example.com",
    "password": "securePass123",
    "role": "BusinessAnalyst"
  }'
```

2. **Login** (get JWT token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "securePass123"
  }'
```

3. **Create Project**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "Enterprise App",
    "status": "Active"
  }'
```

4. **Create Requirement**
```bash
curl -X POST http://localhost:5000/api/requirements \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "reqId": "REQ-001",
    "title": "Authentication",
    "description": "User authentication system",
    "priority": "High"
  }'
```

5. **Create Feature**
```bash
curl -X POST http://localhost:5000/api/features \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "featureName": "Login",
    "requirementId": "REQ_ID",
    "implementedVersion": 1,
    "status": "In Development"
  }'
```

6. **Detect Drift**
```bash
curl -X GET http://localhost:5000/api/drift/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

7. **Get Analytics**
```bash
curl -X GET http://localhost:5000/api/analytics/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Common Query Parameters

- `page`: Pagination page number (default: 1)
- `limit`: Items per page (default: 10)
- `projectId`: Filter by project
- `featureId`: Filter by feature
- `requirementId`: Filter by requirement

---

**For more information, refer to the main README.md**
