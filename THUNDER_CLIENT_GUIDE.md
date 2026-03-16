# Thunder Client Collection - SpecSync API Testing

## 📋 Overview

This Thunder Client collection provides a complete testing suite for all SpecSync backend API endpoints. Thunder Client is a lightweight VS Code extension for API testing (similar to Postman).

## 📦 Collection Name
**SpecSync - Software Requirement Drift Detection System**

## 🔗 File Location
```
c:\MERN\SpecSync_Thunder_Client_Collection.json
```

---

## 🚀 How to Import Collection

### Step 1: Install Thunder Client Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Thunder Client"
4. Install the extension by Ranga Vadhineni

### Step 2: Import Collection
1. Open Thunder Client (Click icon in Activity Bar)
2. Click "Collections" tab
3. Click three dots (⋯) → "Import"
4. Select `SpecSync_Thunder_Client_Collection.json`
5. Click "Import"

### Alternative: Drag & Drop
1. Open Thunder Client Collections
2. Drag the `.json` file into the Collections area
3. Click "Import" when prompted

---

## 📊 Collection Structure

The collection is organized into 7 main folders:

```
SpecSync Collection
├── 🔐 AUTHENTICATION (3 requests)
├── 📊 PROJECTS (4 requests)
├── 📋 REQUIREMENTS (5 requests)
├── ⚙️ FEATURES (5 requests)
├── 🧪 TEST CASES (5 requests)
├── 🔍 DRIFT DETECTION (6 requests)
├── 📊 ANALYTICS (1 request)
└── 🏥 HEALTH CHECK (1 request)
```

**Total: 30 API Requests**

---

## 🔐 Environment Variables

The collection includes pre-configured variables:

| Variable | Default Value | Purpose |
|----------|---------------|---------|
| `base_url` | `http://localhost:5000/api` | API base URL |
| `token` | *(empty)* | JWT authentication token |
| `projectId` | *(empty)* | Current project ID |
| `requirementId` | *(empty)* | Current requirement ID |
| `featureId` | *(empty)* | Current feature ID |
| `testCaseId` | *(empty)* | Current test case ID |

### Setting Variables

**Method 1: In Thunder Client UI**
1. Click the "Variables" icon (fx)
2. Update variable values
3. Variables are saved automatically

**Method 2: Auto-capture from Response**
After successful requests, values are automatically saved if request include scripts.

---

## 📝 Step-by-Step Testing Guide

### 1️⃣ Authentication

#### Step 1: Create New User (Signup)
1. Open: **🔐 AUTHENTICATION → 1. Signup - Create New User**
2. Modify email if needed: `john.dev@specsync.com`
3. Click "Send" (or Ctrl+Enter)
4. **Expected Response:** 201 Created with user data and token

#### Step 2: Login
1. Open: **🔐 AUTHENTICATION → 2. Login - Get JWT Token**
2. Use same email/password from signup
3. Click "Send"
4. **Copy the token from response** (long string starting with "eyJ...")

#### Step 3: Save Token to Variable
1. Click Variables (fx icon)
2. Find `token` variable
3. Paste the JWT token
4. All subsequent requests will now include this token

---

### 2️⃣ Project Management

#### Create Project
1. Open: **📊 PROJECTS → 1. Create Project**
2. Click "Send"
3. **Copy the returned `id`** and save to `projectId` variable
4. This ID will be used in all subsequent requests

#### View Projects
1. Open: **📊 PROJECTS → 2. List Projects**
2. Click "Send"
3. See all your projects with pagination

#### Get Project Details
1. Open: **📊 PROJECTS → 3. Get Project Details**
2. Click "Send"
3. Returns detailed project information (uses `projectId` variable)

---

### 3️⃣ Requirement Management

#### Create Requirement
1. Open: **📋 REQUIREMENTS → 1. Create Requirement**
2. Verify `projectId` variable is set
3. Click "Send"
4. **Copy the returned `id`** and save to `requirementId` variable
5. This creates requirement version 1

#### Update Requirement (Create New Version)
1. Open: **📋 REQUIREMENTS → 4. Update Requirement (Creates New Version)**
2. Click "Send"
3. **Note:** This creates version 2, requirement currentVersion: changes from 1 to 2
4. Check version history to see both v1 and v2

#### View Version History
1. Open: **📋 REQUIREMENTS → 5. Get Requirement Version History**
2. Click "Send"
3. See all versions (newest first) with changelog

---

### 4️⃣ Feature Implementation

#### Create Linked Feature
1. Open: **⚙️ FEATURES → 1. Create Feature**
2. Verify `projectId` and `requirementId` are set
3. Click "Send"
4. **Copy the returned `id`** and save to `featureId` variable
5. `implementedVersion: 1` links this feature to requirement v1

#### Create Orphan Feature (Drift Test)
1. Open: **⚙️ FEATURES → 2. Create Orphan Feature (No Requirement)**
2. Click "Send"
3. Feature has no `requirementId` - will trigger "Orphan Feature" drift

#### Update Feature
1. Open: **⚙️ FEATURES → 5. Update Feature**
2. Modify status and version as needed
3. Click "Send"
4. Changes are recorded

---

### 5️⃣ Test Case Creation

#### Create Test Case
1. Open: **🧪 TEST CASES → 1. Create Test Case**
2. Verify `projectId`, `featureId`, and `requirementId` are set
3. Click "Send"
4. **Copy the returned `id`** and save to `testCaseId` variable
5. Test case is now linked to feature and requirement

#### Create Additional Test Cases
1. Open: **🧪 TEST CASES → 2. Create Additional Test Cases**
2. Click "Send"
3. Creates TC-002 for same feature

#### Update Test Case
1. Open: **🧪 TEST CASES → 5. Update Test Case**
2. Change status to "Passed" and update lastExecuted
3. Click "Send"

---

### 6️⃣ Drift Detection Analysis

#### Get Complete Drift Report
1. Open: **🔍 DRIFT DETECTION → 1. Detect All Drift Issues**
2. Click "Send"
3. **Returns:**
   ```json
   {
     "driftIssues": [...],
     "driftScore": 15,
     "riskLevel": "Moderate",
     "totalIssues": 3,
     "breakdown": { ... }
   }
   ```
4. **Drift Score Calculation:**
   - Critical: ×5
   - High: ×3
   - Medium: ×2
   - Low: ×1

5. **Risk Levels:**
   - 0-10: Stable
   - 10-25: Moderate
   - 25+: High Risk

#### Get Specific Drift Type
1. Open any drift type request (2-6):
   - **2. Version Mismatch** - Features with older requirement versions
   - **3. Orphan Features** - Features not linked to requirements
   - **4. Implementation Gaps** - Requirements not implemented
   - **5. Testing Gaps** - Features without test cases
   - **6. Critical Risks** - High-priority requirements not implemented

2. Click "Send"
3. See only issues of that type

---

### 7️⃣ Analytics & Insights

#### Get Complete Analytics
1. Open: **📊 ANALYTICS → Get Project Analytics**
2. Click "Send"
3. **Returns:**
   - Requirement volatility rate
   - Feature completion ratio
   - Test coverage percentage
   - Drift metrics
   - Issue counts
   - Most modified requirements

---

## 💡 Example Complete Workflow

Follow this sequence to test the entire system:

```
1. Sign Up
   └─ Copy token to 'token' variable

2. Create Project
   └─ Copy projectId to 'projectId' variable

3. Create Requirement (REQ-001)
   └─ Copy requirementId to 'requirementId' variable
   └─ This creates version 1

4. Create Feature (linked to REQ-001)
   └─ Copy featureId to 'featureId' variable
   └─ implementedVersion = 1

5. Create Test Cases (linked to feature)
   └─ Copy first testCaseId to 'testCaseId' variable

6. Get Drift Report
   └─ Should show: Stable, 0 issues

7. Update Requirement
   └─ Creates version 2
   └─ requirement.currentVersion = 2

8. Get Drift Report Again
   └─ Should show: Version Mismatch drift
   └─ Feature still implements v1, but requirement is at v2

9. Create Orphan Feature
   └─ requirementId = null
   └─ Will show: Orphan Feature drift

10. Get Analytics
    └─ See volatility rate increased
    └─ Drift score and risk level updated
```

---

## 🔧 Modifying Requests

### Change Request Body
1. Click on any request
2. Edit the JSON in the "Body" tab
3. Click "Send"
4. Changes are temporary (use Thunder Client's save feature to persist)

### Add Custom Headers
1. Click "Headers" tab
2. Add header: `Custom-Header: value`
3. Click "Send"

### Set Query Parameters
1. Click "Params" tab
2. Add parameter: `param_name: value`
3. Query string is auto-generated

---

## 📊 Response Views

Thunder Client provides multiple ways to view responses:

### 1. Pretty View (Default)
- Formatted JSON with syntax highlighting
- Click on items to expand/collapse

### 2. Raw View
Click "Raw" tab to see unformatted response

### 3. Preview View
Click "Preview" tab for HTML preview

### 4. Timeline View
Click "Timeline" tab to see request/response timeline

---

## 🔍 Debugging Tips

### Check Token Format
Token should look like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYw...
```

### Verify Variable Interpolation
Look at URL bar - it should show actual IDs, not `{{variableName}}`

### Read Error Messages
- **401 Unauthorized** → Token missing or expired, re-login
- **403 Forbidden** → Insufficient permissions for this role
- **404 Not Found** → Resource ID doesn't exist
- **400 Bad Request** → Check request body for missing/invalid fields

### Copy Full Response
Click "Copy" button in response area to copy full JSON response

---

## 🎯 Common Use Cases

### Use Case 1: Test Version Control
1. Create requirement (v1)
2. Get requirement → see version 1
3. Update requirement → v2 created
4. Get version history → see v1 and v2
5. Update again → v3 created

### Use Case 2: Test Drift Detection
1. Create requirement (REQ-001, v1)
2. Create feature (implements v1)
3. Check drift → 0 issues (stable)
4. Update requirement → v2
5. Check drift → 1 issue (Version Mismatch)
6. Update feature → implementedVersion: 2
7. Check drift → 0 issues (stable again)

### Use Case 3: Test Permissions
1. Sign up as Developer
2. Try to create project → Should fail (need BusinessAnalyst)
3. Sign up as BusinessAnalyst
4. Create project → Should succeed
5. Verify role-based access control

---

## 📤 Exporting Results

### Save Response
1. Click "Save" button on response
2. Choose location to save JSON file

### Copy Response
1. Click "Copy" button
2. Paste into text editor, JSON validator, etc.

### Share Request
1. Right-click request name
2. Select "Export Request"
3. Share the JSON with team

---

## 🔄 Refreshing Variables

The collection automatically updates variables when:
- You manually edit them in Variables panel
- You copy values from responses

To manually update:
1. Click Variables (fx)
2. Find variable
3. Click and edit value
4. Value saves automatically

---

## 📚 Tips & Tricks

### Tip 1: Name Your Resources
When creating resources (projects, requirements), use descriptive names:
- ✅ "Enterprise Booking System v2.0"
- ❌ "Project 1"

### Tip 2: Use Consistent IDs
- Requirements: REQ-001, REQ-002, REQ-003
- Features: FEAT-001, FEAT-002
- Test Cases: TC-001, TC-002, TC-003

### Tip 3: Save Snapshots
Take screenshots or export responses at each stage to track changes

### Tip 4: Test Error Cases
- Create with missing fields
- Update non-existent IDs
- Use invalid tokens
- Try unauthorized role operations

### Tip 5: Batch Testing
Test multiple scenarios at once:
- Multiple requirements
- Multiple features per requirement
- Multiple test cases per feature

---

## 🆘 Troubleshooting

### Issue: "Cannot find module" or "Connection refused"
**Solution:** Ensure backend server is running
```bash
npm run dev
```

### Issue: 401 Unauthorized on all requests
**Solution:** Token is missing or expired
- Re-login using Signup/Login requests
- Copy new token to 'token' variable

### Issue: Variables not being interpolated
**Solution:** Variables must match exactly (case-sensitive)
- Check variable name spelling
- Use `{{variableName}}` format in requests

### Issue: Response shows very long JSON
**Solution:** Use View options
- Click "Raw" for full text
- Click "Tree" for collapsible tree view
- Use search (Ctrl+F) to find in response

### Issue: Changes not persisting
**Solution:** Thunder Client auto-saves
- If not saving, manually click Save (Ctrl+S)
- Check Thunder Client settings

---

## 📖 Related Documentation

For more details, see:
- **README.md** - Project overview
- **API_REFERENCE.md** - Complete API documentation
- **INSTALLATION_GUIDE.md** - Setup instructions
- **QUICK_COMMANDS.md** - Command reference

---

## 🎓 Learning Path

1. **Understand Auth** - Test signup and login
2. **Create Projects** - Learn project structure
3. **Master CRUD** - Create, read, update for each resource
4. **Test Relationships** - Link features to requirements
5. **Understand Drift** - Update requirements and observe drift
6. **Analyze Metrics** - Use analytics endpoint
7. **Advanced Testing** - Try all drift types and edge cases

---

## 📞 Support

For API issues:
- Check endpoint URL matches base_url variable
- Verify request body matches schema
- Check authentication token is valid
- Review response error message

For Thunder Client issues:
- Update VS Code to latest version
- Reinstall Thunder Client extension
- Check Thunder Client documentation: https://www.thunderclient.com

---

## ✨ Quick Start

1. **Import** this collection into Thunder Client
2. **Set** base_url to your backend server (default: `http://localhost:5000/api`)
3. **Run** Health Check request to verify connection
4. **Signup** and save token to variable
5. **Create** project and save ID to variable
6. **Follow** the step-by-step testing guide
7. **Explore** all endpoints
8. **Analyze** drift and analytics

---

**Generated:** March 5, 2026  
**Type:** Thunder Client Collection  
**Format:** JSON (Postman v2.1.0 compatible)  
**Total Requests:** 30  
**Total Folders:** 7

**Ready to test your SpecSync backend!** 🚀
