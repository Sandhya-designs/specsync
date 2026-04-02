# 🔐 ROLE-BASED ACCESS CONTROL REFERENCE GUIDE

## Complete Overview of User Roles & Their Permissions

This guide explains what each user role can do in the SpecSync project management application.

---

## 📊 Permission Levels Summary

| Role | Can Read | Can Create | Can Update | Can Delete | Can Manage Users |
|------|----------|----------|----------|----------|-----------------|
| **Admin** ✅ | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ YES |
| **Business Analyst** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ❌ NO |
| **Developer** | ✅ YES | ❌ NO | ✅ YES | ❌ NO | ❌ NO |
| **QA** | ✅ YES | ❌ NO | ✅ YES | ❌ NO | ❌ NO |
| **Viewer** | ✅ YES | ❌ NO | ❌ NO | ❌ NO | ❌ NO |

---

## 👤 DETAILED ROLE DESCRIPTIONS

### 1️⃣ **ADMIN** (Full Control)
**Email:** `admin@specsync.com` | **Password:** `Demo123!`

#### Permissions:
- `create` - Can create new items
- `read` - Can view all data
- `update` - Can modify existing items
- `delete` - Can remove items
- `manage_users` - Can manage team members

#### What They Can Do:
```
✅ Create Projects
✅ Edit Projects
✅ Delete Projects
✅ Create Requirements
✅ Edit Requirements
✅ Delete Requirements
✅ Create Features
✅ Edit Features
✅ Delete Features
✅ Create Test Cases
✅ Edit Test Cases
✅ Delete Test Cases
✅ Manage User Accounts
✅ Assign/Remove User Roles
✅ View All Reports & Analytics
✅ Access Drift Reports
✅ Manage Project Access
```

#### What They Cannot Do:
- Nothing (Full Control)

#### Use Case:
- Project administrators
- System managers
- Executives who need complete visibility
- Team leads managing all aspects

#### Example Actions:
- Create a new E-Commerce Platform project
- Invite new team members and assign roles
- Delete incomplete projects
- Manage project permissions

---

### 2️⃣ **BUSINESS ANALYST** (Create & Modify)
**Email:** `analyst@specsync.com` | **Password:** `Demo123!`

#### Permissions:
- `create` - Can create new items
- `read` - Can view all data
- `update` - Can modify existing items
- `delete` - Can remove items

#### What They Can Do:
```
✅ Create Requirements
✅ Edit Requirements
✅ Delete Requirements
✅ Create Features
✅ Edit Features
✅ Delete Features
✅ Create Test Cases
✅ Edit Test Cases
✅ Delete Test Cases
✅ View All Projects
✅ View Requirements
✅ View Features
✅ View Test Cases
✅ View Analytics
✅ Comment on Requirements
```

#### What They Cannot Do:
```
❌ Create Projects
❌ Delete Projects
❌ Manage Users
❌ Change User Roles
❌ Delete Project-level Data
```

#### Use Case:
- Business analysts
- Product managers
- Requirements specialists
- Quality assurance leads

#### Example Actions:
- Create detailed requirements for a healthcare system
- Edit requirement priorities and status
- Create test cases for features
- Define feature specifications

---

### 3️⃣ **DEVELOPER** (Read & Update Only)
**Email:** `developer@specsync.com` | **Password:** `Demo123!`

#### Permissions:
- `read` - Can view data
- `update` - Can modify status/details

#### What They Can Do:
```
✅ View All Projects
✅ View Requirements
✅ View Features
✅ View Test Cases
✅ Update Feature Status (Planning → Development → Testing → Complete)
✅ Update Implementation Notes
✅ View Analytics
✅ Add Comments/Notes
✅ View Requirement Versions
✅ Check Drift Reports
```

#### What They Cannot Do:
```
❌ Create New Items
❌ Delete Items
❌ Create Requirements
❌ Delete Requirements
❌ Create Features
❌ Delete Features
❌ Manage Users
❌ Create Test Cases
```

#### Use Case:
- Software developers
- Engineers
- Implementation team members

#### Example Actions:
- Update feature status: "Login Module" → In Development → Testing
- Add implementation notes to a requirement
- View which requirements are critical
- Check what needs to be implemented next
- Review test cases to understand expected behavior

---

### 4️⃣ **QA** (Read & Update Only)
**Email:** `qa@specsync.com` | **Password:** `Demo123!`

#### Permissions:
- `read` - Can view data
- `update` - Can modify test case status

#### What They Can Do:
```
✅ View All Projects
✅ View Requirements
✅ View Features
✅ View Test Cases
✅ Update Test Case Status (Ready → In Progress → Passed → Failed)
✅ Add Test Results
✅ Add Test Comments/Notes
✅ View Analytics Reports
✅ Check Drift Reports
✅ View Requirement Details
✅ View Feature Implementation Status
```

#### What They Cannot Do:
```
❌ Create Test Cases
❌ Delete Test Cases
❌ Create Requirements
❌ Delete Requirements
❌ Create Features
❌ Create Projects
❌ Manage Users
```

#### Use Case:
- Quality assurance engineers
- Test automation engineers
- QA testers
- Test lead

#### Example Actions:
- Update test case status: "Payment Processing" → Passed
- Mark test case as "Failed" and add bug details
- View which tests need to be executed
- Track test execution progress
- Generate test reports

---

### 5️⃣ **VIEWER** (Read Only)
**Email:** `viewer@specsync.com` | **Password:** `Demo123!`

#### Permissions:
- `read` - Can only view data

#### What They Can Do:
```
✅ View All Projects
✅ View Requirements
✅ View Features
✅ View Test Cases
✅ View Analytics
✅ View Drift Reports
✅ View Project Progress
✅ Download Reports
✅ View Requirement History
✅ View Feature Status
```

#### What They Cannot Do:
```
❌ Create Anything
❌ Edit Anything
❌ Delete Anything
❌ Update Status
❌ Add Comments
❌ Manage Users
```

#### Use Case:
- Stakeholders
- Project sponsors
- Executives
- Document reviewers
- Read-only team members
- Temporary audit access

#### Example Actions:
- View project dashboard and statistics
- Check project progress and timelines
- Review requirements for approval
- Generate and download reports
- Monitor team productivity

---

## 🎯 Real-World Scenario Examples

### **Scenario 1: E-Commerce Platform Development**

**Project Setup:**
- **Admin (Manager)**: Assigns team members to project
- **Business Analyst**: Creates 5 requirements for user authentication
- **Developers**: Update feature status as they implement login module
- **QA**: Test the login functionality and update test case status
- **Viewer (Client)**: Reviews progress and approves requirements

**Flow:**
```
1. Admin Creates Project → "E-Commerce Platform"
2. BA Creates Requirement → "User Authentication System"
3. BA Creates Features → "Login Module", "Signup Module"
4. BA Creates Test Cases → "Login with valid credentials"
5. Dev Updates Feature Status → "Login Module" → In Development
6. QA Updates Test Status → Test Case → Passed
7. Viewer Reviews → Sees completion at 80%
```

---

### **Scenario 2: Healthcare System Project**

**Permission Checks:**
- **Patient Registration Feature Creation**
  - Admin ✅ Can create
  - BA ✅ Can create
  - Dev ❌ Cannot create (read-only)
  - QA ❌ Cannot create (read-only)
  - Viewer ❌ Cannot create (read-only)

- **Update Feature Status**
  - Admin ✅ Can update
  - BA ✅ Can update
  - Dev ✅ Can update
  - QA ✅ Can update (test status)
  - Viewer ❌ Cannot update

- **Delete Feature**
  - Admin ✅ Can delete
  - BA ✅ Can delete
  - Dev ❌ Cannot delete
  - QA ❌ Cannot delete
  - Viewer ❌ Cannot delete

---

### **Scenario 3: Team Collaboration Platform**

| Task | Admin | BA | Dev | QA | Viewer |
|------|-------|-------|-------|-------|--------|
| Create Task | ✅ | ✅ | ❌ | ❌ | ❌ |
| Assign Task | ✅ | ✅ | ❌ | ❌ | ❌ |
| Update Status | ✅ | ✅ | ✅ | ✅ | ❌ |
| Add Comment | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete Task | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Report | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 💡 Quick Reference - What Can Each Role Do?

### **Creating Content**
```
Who can CREATE new items?
→ Admin: YES ✅
→ Business Analyst: YES ✅
→ Developer: NO ❌
→ QA: NO ❌
→ Viewer: NO ❌
```

### **Updating Content**
```
Who can UPDATE existing items?
→ Admin: YES ✅
→ Business Analyst: YES ✅
→ Developer: YES ✅ (limited to status)
→ QA: YES ✅ (limited to test status)
→ Viewer: NO ❌
```

### **Deleting Content**
```
Who can DELETE items?
→ Admin: YES ✅
→ Business Analyst: YES ✅
→ Developer: NO ❌
→ QA: NO ❌
→ Viewer: NO ❌
```

### **Managing Users**
```
Who can manage user accounts?
→ Admin: YES ✅
→ Business Analyst: NO ❌
→ Developer: NO ❌
→ QA: NO ❌
→ Viewer: NO ❌
```

### **Viewing Data**
```
Who can VIEW all data?
→ Admin: YES ✅
→ Business Analyst: YES ✅
→ Developer: YES ✅
→ QA: YES ✅
→ Viewer: YES ✅
```

---

## 🔄 Permission Hierarchy (from most to least powerful)

```
1. ADMIN (5/5 permissions)
   ↓
2. BUSINESS ANALYST (4/5 permissions - no user management)
   ↓
3. DEVELOPER (2/5 permissions - read + update only)
   ↓
4. QA (2/5 permissions - read + update only)
   ↓
5. VIEWER (1/5 permissions - read only)
```

---

## 📋 Data Access Matrix

### **What Data Does Each Role See?**

| Data Type | Admin | BA | Dev | QA | Viewer |
|-----------|-------|-------|-------|-------|--------|
| Projects | All | All | All | All | All |
| Requirements | All | All | All | All | All |
| Features | All | All | All | All | All |
| Test Cases | All | All | All | All | All |
| User List | Full | Limited | Limited | Limited | None |
| Reports | Full | Full | Full | Full | Basic |
| Drift Analysis | Full | Full | Full | Full | Full |

---

## 🛡️ Security Points

### **Data Protection:**
- Viewer cannot modify any data → Safe for external stakeholders
- Developer cannot delete → No accidental project destruction
- Only Admin can manage users → Prevents unauthorized access creation
- All actions are logged (createdBy field)

### **Segregation of Duties:**
- BA creates requirements independently
- Dev implements based on requirements
- QA tests independently
- Admin supervises all activities

### **Audit Trail:**
- Every item tracks `createdBy`, `updatedAt`, `createdAt`
- Admin can see who made what changes
- History maintained in RequirementVersion

---

## 🚀 Best Practice Role Assignment

### **For a Small Team (5-10 people):**
```
1 Admin → Project Manager
2-3 BA → Product Manager + Analyst
2-3 Dev → Lead Developer + Junior Developers
2-3 QA → QA Lead + Test Engineers
Stakeholders → Viewers
```

### **For a Large Team (20+ people):**
```
1-2 Admin → Project Manager + Technical Manager
3-5 BA → Product Manager + Business Analysts
8-10 Dev → Dev Teams
3-5 QA → QA Team
Multiple Viewers → Clients, Stakeholders, Executives
```

### **For Client Projects:**
```
Your Team:
- 1 Admin (Your Manager)
- 1-2 BA (Your Requirements Person)
- 3-4 Dev (Your Developers)
- 1-2 QA (Your QA Team)

Client Team:
- All as Viewers (Read-only)
```

---

## 📚 API Endpoints & Role Requirements

### **Projects Endpoints:**
```javascript
POST /api/projects           → Requires: Admin
GET /api/projects            → Requires: Any (All can read)
PATCH /api/projects/:id      → Requires: Admin, BA
DELETE /api/projects/:id     → Requires: Admin
```

### **Requirements Endpoints:**
```javascript
POST /api/requirements                → Requires: Admin, BA
GET /api/requirements                 → Requires: Any (All can read)
PATCH /api/requirements/:id           → Requires: Admin, BA, Dev, QA
DELETE /api/requirements/:id          → Requires: Admin, BA
```

### **Features Endpoints:**
```javascript
POST /api/features                    → Requires: Admin, BA
GET /api/features                     → Requires: Any (All can read)
PATCH /api/features/:id               → Requires: Admin, BA, Dev, QA
DELETE /api/features/:id              → Requires: Admin, BA
```

### **Test Cases Endpoints:**
```javascript
POST /api/testcases                   → Requires: Admin, BA
GET /api/testcases                    → Requires: Any (All can read)
PATCH /api/testcases/:id              → Requires: Admin, BA, QA, Dev
DELETE /api/testcases/:id             → Requires: Admin, BA
```

### **Users Management Endpoints:**
```javascript
GET /api/users                        → Requires: Admin
POST /api/users                       → Requires: Admin
PATCH /api/users/:id                  → Requires: Admin
DELETE /api/users/:id                 → Requires: Admin
```

---

## ✅ Checklist - Assigning Roles to Your Team

- [ ] **Identify Admin** - Usually 1 project manager
- [ ] **Identify Business Analysts** - Usually 1-2 people
- [ ] **Identify Developers** - All implementation team members
- [ ] **Identify QA** - All testing team members
- [ ] **Identify Viewers** - Stakeholders, clients, executives
- [ ] **Test Access** - Try each role to verify permissions
- [ ] **Document Assignments** - Keep record of who is what role
- [ ] **Review Regularly** - Update roles as team changes

---

## 🎓 Summary

**ADMIN** = Complete Control (Manager/Lead)  
**BUSINESS ANALYST** = Create & Manage Content (Requirements Specialist)  
**DEVELOPER** = Read & Update Status (Implementation)  
**QA** = Read & Update Tests (Quality Assurance)  
**VIEWER** = Read Only (Stakeholder/Client)

Each role has specific responsibilities and can only perform their authorized actions. This ensures data integrity, security, and proper workflow management.

---

## 📞 Need Help?

Refer to this guide whenever you need to:
- Understand what a role can do
- Assign roles to team members
- Troubleshoot access issues
- Plan your team structure
- Audit who has what permissions
