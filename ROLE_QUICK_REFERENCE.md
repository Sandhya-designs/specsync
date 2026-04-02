# 🎯 QUICK ROLE REFERENCE (1-PAGE CHEAT SHEET)

## Essential Information at a Glance

### **5 Roles in SpecSync**

```
┌─────────────────────────────────────────────────────────────────┐
│  1. ADMIN          │  Full Control                              │
│     admin@specsync.com                                          │
├─────────────────────────────────────────────────────────────────┤
│  2. ANALYST        │  Create, Read, Update, Delete              │
│     analyst@specsync.com                                        │
├─────────────────────────────────────────────────────────────────┤
│  3. DEVELOPER      │  Read, Update Status Only                  │
│     developer@specsync.com                                      │
├─────────────────────────────────────────────────────────────────┤
│  4. QA             │  Read, Update Test Status Only             │
│     qa@specsync.com                                             │
├─────────────────────────────────────────────────────────────────┤
│  5. VIEWER         │  Read Only                                 │
│     viewer@specsync.com                                         │
└─────────────────────────────────────────────────────────────────┘
```

### **Permission Matrix**

```
Action          │ Admin │ Analyst │ Dev │ QA  │ Viewer
────────────────┼───────┼─────────┼─────┼─────┼────────
Create          │  ✅   │   ✅    │ ❌  │ ❌  │  ❌
Read            │  ✅   │   ✅    │ ✅  │ ✅  │  ✅
Update          │  ✅   │   ✅    │ ✅* │ ✅* │  ❌
Delete          │  ✅   │   ✅    │ ❌  │ ❌  │  ❌
Manage Users    │  ✅   │   ❌    │ ❌  │ ❌  │  ❌
────────────────┴───────┴─────────┴─────┴─────┴────────
* Limited to status updates only
```

---

## **What Each Role Can Do**

### **🔴 ADMIN** - Project Manager/Lead
**Email:** admin@specsync.com | **Password:** Demo123!

✅ Create projects, requirements, features, test cases  
✅ Edit everything  
✅ Delete everything  
✅ Manage team members and assign roles  
✅ View all reports and analytics  
✅ Have complete system control  

**Best For:** Project managers, technical leads, system administrators

---

### **🟠 BUSINESS ANALYST** - Requirements Specialist
**Email:** analyst@specsync.com | **Password:** Demo123!

✅ Create requirements, features, test cases  
✅ Edit requirements, features, test cases  
✅ Delete requirements, features, test cases  
✅ Cannot create projects  
✅ Cannot manage users  

**Best For:** Product managers, business analysts, requirements specialists

---

### **🟡 DEVELOPER** - Implementation Team
**Email:** developer@specsync.com | **Password:** Demo123!

✅ View all projects and requirements  
✅ Update feature status (Planning → Development → Testing → Complete)  
✅ Add implementation notes  
✅ Cannot create new items  
✅ Cannot delete items  
❌ Cannot create requirements or test cases  

**Best For:** Software developers, engineers, implementers

---

### **🔵 QA** - Testing Team
**Email:** qa@specsync.com | **Password:** Demo123!

✅ View all projects and test cases  
✅ Update test case status (Ready → In Progress → Passed/Failed)  
✅ Add test results and notes  
✅ Cannot create new test cases  
✅ Cannot create requirements or features  
❌ Cannot create or delete items  

**Best For:** QA engineers, testers, test automation specialists

---

### **🟢 VIEWER** - Stakeholders/Clients
**Email:** viewer@specsync.com | **Password:** Demo123!

✅ View all projects  
✅ View requirements and features  
✅ View test cases and progress  
✅ Download reports  
❌ Cannot make ANY changes  
❌ Read-only access  

**Best For:** Clients, executives, stakeholders, project sponsors

---

## **Common Tasks by Role**

### **Creating a New Requirement**
- ✅ Admin: Can do
- ✅ Analyst: Can do
- ❌ Developer: Cannot
- ❌ QA: Cannot
- ❌ Viewer: Cannot

### **Updating Feature Status from "Planning" to "In Development"**
- ✅ Admin: Can do
- ✅ Analyst: Can do
- ✅ Developer: **Can do** (Main responsibility)
- ✅ QA: Can do
- ❌ Viewer: Cannot

### **Deleting a Test Case**
- ✅ Admin: Can do
- ✅ Analyst: Can do
- ❌ Developer: Cannot
- ❌ QA: Cannot
- ❌ Viewer: Cannot

### **Assigning User to Project**
- ✅ Admin: **Only Admin can do this**
- ❌ Analyst: Cannot
- ❌ Developer: Cannot
- ❌ QA: Cannot
- ❌ Viewer: Cannot

---

## **Real Examples**

### **Example 1: E-Commerce Platform**
```
1. Admin Creates Project: "E-Commerce Platform"
   ↓
2. Analyst Creates Requirement: "User Authentication"
   ↓
3. Analyst Creates Features: "Login Module", "Signup Module"
   ↓
4. Developer Updates Status: "Login Module" → In Development
   ↓
5. Developer Updates Status: "Login Module" → Testing
   ↓
6. QA Updates Test Status: "Login with valid credentials" → Passed
   ↓
7. Viewer Sees: Project is 80% complete
```

### **Example 2: Healthcare System**
```
Analyst:  Creates "Patient Registration" requirement
Developer: Checks requirement, updates "Patient Portal" to "In Development"
QA:       Tests feature, updates test case to "Passed"
Viewer:   Sees feature is complete ✅
```

---

## **Permission Level Hierarchy**

```
ADMIN (5 permissions)
  ↓
ANALYST (4 permissions - no user management)
  ↓
DEVELOPER (2 permissions - read + status update)
  ↓
QA (2 permissions - read + test update)
  ↓
VIEWER (1 permission - read only)
```

---

## **Role Assignment Guidelines**

### **Small Team (5 people)**
```
1 Admin   → Project Manager
1 Analyst → Requirements Lead
2 Dev     → Developers
1 QA      → QA Lead
```

### **Medium Team (10 people)**
```
1 Admin    → Project Manager
2 Analyst  → Requirements Team
5 Dev      → Development Team
3 QA       → QA Team
Clients   → Viewers
```

### **Large Team (20+ people)**
```
1-2 Admin     → Managers
3-5 Analyst   → Requirements Team
8-10 Dev      → Development Team
5-7 QA        → QA Team
Multiple Viewers → Stakeholders
```

---

## **Typical Team Workflow**

```
ANALYST Creates Requirement
    ↓
ANALYST Creates Features & Test Cases
    ↓
DEVELOPER Reviews & Updates Feature Status
    ↓
DEVELOPER Marks Feature as "In Development"
    ↓
DEVELOPER Marks Feature as "Testing"
    ↓
QA Executes Tests
    ↓
QA Updates Test Status "Passed" or "Failed"
    ↓
VIEWER Reviews Progress
```

---

## **Cannot Do List by Role**

### **DEVELOPER Cannot:**
- ❌ Create requirements
- ❌ Create test cases
- ❌ Delete items
- ❌ Manage users
- ❌ Create projects

### **QA Cannot:**
- ❌ Create test cases (they execute existing ones)
- ❌ Create requirements
- ❌ Delete items
- ❌ Create features
- ❌ Manage users

### **VIEWER Cannot:**
- ❌ Create anything
- ❌ Update anything
- ❌ Delete anything
- ❌ Manage anything
- ❌ Make ANY changes

### **ANALYST Cannot:**
- ❌ Create projects
- ❌ Manage users
- (Can do everything else)

---

## **Quick Decision Flow**

```
Can this person CREATE items?
├─ YES → Admin or Analyst
└─ NO → Developer, QA, or Viewer

Can this person DELETE items?
├─ YES → Admin or Analyst
└─ NO → Developer, QA, or Viewer

Can this person UPDATE item STATUS?
├─ YES → Admin, Analyst, Developer, or QA
└─ NO → Viewer (Read-only)

Can this person MANAGE USERS?
├─ YES → Admin Only
└─ NO → Everyone else
```

---

## **Demo Account Credentials**

```
Role              │ Email                      │ Password
──────────────────┼────────────────────────────┼──────────────
Admin             │ admin@specsync.com         │ Demo123!
Analyst           │ analyst@specsync.com       │ Demo123!
Developer         │ developer@specsync.com     │ Demo123!
QA                │ qa@specsync.com            │ Demo123!
Viewer            │ viewer@specsync.com        │ Demo123!
```

---

## **Key Points to Remember**

1. **Only Admin** can manage users
2. **Only Admin & Analyst** can create new items
3. **Everyone** can read/view data (except private items)
4. **Developer & QA** can only update status, not create/delete
5. **Viewer** cannot make any changes

---

**For detailed information, refer to:** `ROLE_REFERENCE_GUIDE.md`
