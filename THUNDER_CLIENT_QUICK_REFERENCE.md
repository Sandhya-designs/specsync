# Thunder Client Collection - API Endpoints Quick Reference

## 📋 Collection Overview

**Collection Name:** SpecSync - Software Requirement Drift Detection System  
**Format:** Thunder Client JSON  
**Total Requests:** 30  
**Compatible:** Thunder Client (VS Code), Postman  

---

## 🔐 AUTHENTICATION (3 Requests)

### 1. Signup - Create New User
- **Method:** POST
- **Endpoint:** `/auth/signup`
- **Auth:** None (Public)
- **Body:** 
  ```json
  {
    "firstName": "John",
    "lastName": "Developer",
    "email": "john.dev@specsync.com",
    "password": "SecurePassword123!",
    "role": "Developer"
  }
  ```
- **Response:** 201 Created
- **Action:** Save token to `{{token}}` variable

### 2. Login - Get JWT Token
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Auth:** None (Public)
- **Body:**
  ```json
  {
    "email": "john.dev@specsync.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response:** 200 OK with token
- **Action:** Save token to `{{token}}` variable

### 3. Get Current User
- **Method:** GET
- **Endpoint:** `/auth/me`
- **Auth:** Bearer {{token}}
- **Body:** None
- **Response:** 200 OK with user data

---

## 📊 PROJECTS (4 Requests)

### 1. Create Project
- **Method:** POST
- **Endpoint:** `/projects`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectName": "Enterprise Booking System v2.0",
    "description": "Development of next-generation booking system",
    "status": "Active"
  }
  ```
- **Response:** 201 Created
- **Action:** Save `id` to `{{projectId}}` variable

### 2. List Projects
- **Method:** GET
- **Endpoint:** `/projects?page=1&limit=10`
- **Auth:** Bearer {{token}}
- **Params:** page, limit
- **Response:** 200 OK with pagination

### 3. Get Project Details
- **Method:** GET
- **Endpoint:** `/projects/{{projectId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK with project data

### 4. Update Project
- **Method:** PUT
- **Endpoint:** `/projects/{{projectId}}`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectName": "Updated Name",
    "description": "Updated description",
    "status": "Active"
  }
  ```
- **Response:** 200 OK

---

## 📋 REQUIREMENTS (5 Requests)

### 1. Create Requirement
- **Method:** POST
- **Endpoint:** `/requirements`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectId": "{{projectId}}",
    "reqId": "REQ-001",
    "title": "User Authentication System",
    "description": "Implement JWT-based authentication",
    "priority": "High",
    "acceptanceCriteria": [
      "Login page created",
      "JWT tokens generated",
      "Protected routes implemented",
      "Token refresh working",
      "Logout functionality"
    ]
  }
  ```
- **Response:** 201 Created (Version 1)
- **Action:** Save `id` to `{{requirementId}}` variable

### 2. List Requirements
- **Method:** GET
- **Endpoint:** `/requirements?projectId={{projectId}}&page=1&limit=10`
- **Auth:** Bearer {{token}}
- **Params:** projectId (required), page, limit
- **Response:** 200 OK with pagination

### 3. Get Requirement Details
- **Method:** GET
- **Endpoint:** `/requirements/{{requirementId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK with all versions

### 4. Update Requirement (Creates New Version)
- **Method:** PUT
- **Endpoint:** `/requirements/{{requirementId}}`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "title": "User Authentication System with Multi-Factor",
    "description": "Implement JWT auth with 2FA",
    "priority": "Critical",
    "acceptanceCriteria": [
      "Login page",
      "JWT tokens",
      "Protected routes",
      "Token refresh",
      "Logout",
      "Optional 2FA",
      "Login attempt blocking"
    ],
    "changeLog": "Added 2FA and security enhancements"
  }
  ```
- **Response:** 200 OK (Version 2 created)
- **Note:** currentVersion increments automatically

### 5. Get Requirement Version History
- **Method:** GET
- **Endpoint:** `/requirements/{{requirementId}}/versions`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK with all versions (newest first)

---

## ⚙️ FEATURES (5 Requests)

### 1. Create Feature (Linked)
- **Method:** POST
- **Endpoint:** `/features`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectId": "{{projectId}}",
    "featureName": "Login Module",
    "description": "Complete login feature implementation",
    "requirementId": "{{requirementId}}",
    "implementedVersion": 1,
    "status": "In Development"
  }
  ```
- **Response:** 201 Created
- **Action:** Save `id` to `{{featureId}}` variable

### 2. Create Orphan Feature (Drift Test)
- **Method:** POST
- **Endpoint:** `/features`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectId": "{{projectId}}",
    "featureName": "Analytics Dashboard",
    "description": "Real-time analytics (no requirement)",
    "requirementId": null,
    "implementedVersion": null,
    "status": "In Development"
  }
  ```
- **Response:** 201 Created
- **Note:** Will trigger "Orphan Feature" drift detection

### 3. List Features
- **Method:** GET
- **Endpoint:** `/features?projectId={{projectId}}&page=1&limit=10`
- **Auth:** Bearer {{token}}
- **Params:** projectId (required), page, limit
- **Response:** 200 OK with pagination

### 4. Get Feature Details
- **Method:** GET
- **Endpoint:** `/features/{{featureId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK with feature data

### 5. Update Feature
- **Method:** PUT
- **Endpoint:** `/features/{{featureId}}`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "featureName": "Login Module v2",
    "status": "Testing",
    "implementedVersion": 2
  }
  ```
- **Response:** 200 OK

---

## 🧪 TEST CASES (5 Requests)

### 1. Create Test Case
- **Method:** POST
- **Endpoint:** `/testcases`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "projectId": "{{projectId}}",
    "testCaseId": "TC-001",
    "title": "Login with valid credentials",
    "description": "Verify successful login with correct credentials",
    "featureId": "{{featureId}}",
    "requirementId": "{{requirementId}}",
    "steps": [
      {
        "step": 1,
        "description": "Navigate to login page",
        "expectedResult": "Login form displayed"
      },
      {
        "step": 2,
        "description": "Enter valid email and password",
        "expectedResult": "Form accepts input"
      },
      {
        "step": 3,
        "description": "Click login button",
        "expectedResult": "User redirected to dashboard"
      },
      {
        "step": 4,
        "description": "Verify JWT token stored",
        "expectedResult": "Token in localStorage"
      }
    ],
    "priority": "High",
    "status": "Ready"
  }
  ```
- **Response:** 201 Created
- **Action:** Save `id` to `{{testCaseId}}` variable

### 2. Create Additional Test Cases
- **Method:** POST
- **Endpoint:** `/testcases`
- **Auth:** Bearer {{token}}
- **Body:** (TC-002 example with different steps)
- **Response:** 201 Created

### 3. List Test Cases
- **Method:** GET
- **Endpoint:** `/testcases?projectId={{projectId}}&featureId={{featureId}}&page=1&limit=10`
- **Auth:** Bearer {{token}}
- **Params:** projectId (required), featureId, requirementId, page, limit
- **Response:** 200 OK with pagination

### 4. Get Test Case Details
- **Method:** GET
- **Endpoint:** `/testcases/{{testCaseId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK with test case data

### 5. Update Test Case
- **Method:** PUT
- **Endpoint:** `/testcases/{{testCaseId}}`
- **Auth:** Bearer {{token}}
- **Body:**
  ```json
  {
    "status": "Passed",
    "lastExecuted": "2024-03-05T15:30:00Z"
  }
  ```
- **Response:** 200 OK

---

## 🔍 DRIFT DETECTION (6 Requests)

### 1. Detect All Drift Issues
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK
- **Returns:**
  - All drift issues from 5 algorithms
  - Drift score (weighted by severity)
  - Risk level (Stable/Moderate/High Risk)
  - Issue breakdown

**Drift Score Calculation:**
```
Score = (Critical × 5) + (High × 3) + (Medium × 2) + (Low × 1)

Risk Levels:
- 0-10: Stable
- 10-25: Moderate
- 25+: High Risk
```

### 2. Detect Version Mismatch Drift
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}/Version Mismatch`
- **Auth:** Bearer {{token}}
- **Returns:** Features with older requirement versions

### 3. Detect Orphan Features
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}/Orphan Feature`
- **Auth:** Bearer {{token}}
- **Returns:** Features not linked to requirements

### 4. Detect Implementation Gaps
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}/Implementation Gap`
- **Auth:** Bearer {{token}}
- **Returns:** Requirements without features

### 5. Detect Testing Gaps
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}/Testing Gap`
- **Auth:** Bearer {{token}}
- **Returns:** Features without test cases

### 6. Detect Critical Risks
- **Method:** GET
- **Endpoint:** `/drift/{{projectId}}/Critical Risk`
- **Auth:** Bearer {{token}}
- **Returns:** High/Critical requirements not implemented

---

## 📊 ANALYTICS (1 Request)

### Get Project Analytics
- **Method:** GET
- **Endpoint:** `/analytics/{{projectId}}`
- **Auth:** Bearer {{token}}
- **Response:** 200 OK
- **Returns:**
  ```json
  {
    "requirementMetrics": {
      "total": 10,
      "volatilityRate": 1.3,
      "statusDistribution": { ... },
      "priorityDistribution": { ... },
      "mostModifiedRequirements": [ ... ]
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
      "totalDriftIssues": 5,
      "driftScore": 21,
      "riskLevel": "Moderate"
    }
  }
  ```

---

## 🏥 HEALTH CHECK (1 Request)

### Health Check
- **Method:** GET
- **Endpoint:** `http://localhost:5000/health`
- **Auth:** None
- **Response:** 200 OK
- **Purpose:** Verify backend is running

---

## 📊 Request Summary Table

| # | Category | Endpoint | Method | Auth Required |
|---|----------|----------|--------|---------------|
| 1 | Auth | /auth/signup | POST | ❌ No |
| 2 | Auth | /auth/login | POST | ❌ No |
| 3 | Auth | /auth/me | GET | ✅ Yes |
| 4 | Projects | /projects | POST | ✅ Yes |
| 5 | Projects | /projects | GET | ✅ Yes |
| 6 | Projects | /projects/:id | GET | ✅ Yes |
| 7 | Projects | /projects/:id | PUT | ✅ Yes |
| 8 | Requirements | /requirements | POST | ✅ Yes |
| 9 | Requirements | /requirements | GET | ✅ Yes |
| 10 | Requirements | /requirements/:id | GET | ✅ Yes |
| 11 | Requirements | /requirements/:id | PUT | ✅ Yes |
| 12 | Requirements | /requirements/:id/versions | GET | ✅ Yes |
| 13 | Features | /features | POST | ✅ Yes |
| 14 | Features | /features | POST | ✅ Yes |
| 15 | Features | /features | GET | ✅ Yes |
| 16 | Features | /features/:id | GET | ✅ Yes |
| 17 | Features | /features/:id | PUT | ✅ Yes |
| 18 | Test Cases | /testcases | POST | ✅ Yes |
| 19 | Test Cases | /testcases | POST | ✅ Yes |
| 20 | Test Cases | /testcases | GET | ✅ Yes |
| 21 | Test Cases | /testcases/:id | GET | ✅ Yes |
| 22 | Test Cases | /testcases/:id | PUT | ✅ Yes |
| 23 | Drift | /drift/:id | GET | ✅ Yes |
| 24 | Drift | /drift/:id/Version Mismatch | GET | ✅ Yes |
| 25 | Drift | /drift/:id/Orphan Feature | GET | ✅ Yes |
| 26 | Drift | /drift/:id/Implementation Gap | GET | ✅ Yes |
| 27 | Drift | /drift/:id/Testing Gap | GET | ✅ Yes |
| 28 | Drift | /drift/:id/Critical Risk | GET | ✅ Yes |
| 29 | Analytics | /analytics/:id | GET | ✅ Yes |
| 30 | Health | /health | GET | ❌ No |

---

## 🔑 Environment Variables

| Variable | Default | Used In |
|----------|---------|---------|
| `base_url` | `http://localhost:5000/api` | All API requests |
| `token` | *(empty)* | All authenticated requests |
| `projectId` | *(empty)* | All project-related requests |
| `requirementId` | *(empty)* | Requirement & feature requests |
| `featureId` | *(empty)* | Feature & test case requests |
| `testCaseId` | *(empty)* | Test case requests |

---

## 🎯 Available Roles

- **Admin** - Full access to all resources
- **BusinessAnalyst** - Can create/read/update projects and requirements
- **Developer** - Can read and update features
- **QA** - Can read and update test cases
- **Viewer** - Read-only access

---

## 📝 Required Fields by Endpoint

### Create Project
- ✅ `projectName`

### Create Requirement
- ✅ `projectId`
- ✅ `reqId`
- ✅ `title`
- ✅ `description`

### Create Feature
- ✅ `projectId`
- ✅ `featureName`
- ⏺️ `requirementId` (optional, null = orphan feature)

### Create Test Case
- ✅ `projectId`
- ✅ `testCaseId`
- ✅ `title`
- ✅ `featureId`
- ✅ `requirementId`

---

## 🚀 Quick Testing Workflow

```
1. Run Health Check
2. Signup
3. Login (save token)
4. Create Project (save projectId)
5. Create Requirement (save requirementId)
6. Create Feature (save featureId)
7. Create Test Case (save testCaseId)
8. Get Drift Report
9. Get Analytics
10. Update Requirement → Get Drift Report
11. Get Updated Analytics
```

---

## 💾 File Information

- **File Name:** `SpecSync_Thunder_Client_Collection.json`
- **Format:** JSON (Postman v2.1.0 compatible)
- **Size:** ~60 KB
- **Total Requests:** 30
- **Variables:** 6
- **Import via:** Thunder Client → Collections → Import

---

Generated: March 5, 2026  
Version: 1.0.0
