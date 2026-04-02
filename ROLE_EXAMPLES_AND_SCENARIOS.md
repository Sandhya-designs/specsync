# 📚 ROLE-BASED EXAMPLES & USE CASES

## Real-World Scenarios with Each Role

---

## **SCENARIO 1: Building E-Commerce Platform**

### **Project Timeline & Role Actions**

#### **Week 1: Planning Phase**
```
ADMIN (Manager):
  ✅ Creates new project: "E-Commerce Platform"
  ✅ Assigns team members:
     - Alex (Analyst)
     - Bob, Carol (Developers)
     - Dave (QA Engineer)
     - Client Team (Viewers)
  ✅ Sets project timeline

ANALYST (Alex):
  ✅ Creates Requirement: "User Authentication"
     - Description: Login/Signup/Password Reset
     - Priority: Critical
  ✅ Creates Requirement: "Product Catalog"
     - Description: Display products with filters
     - Priority: High
  ✅ Creates Feature: "Login Module"
     - Links to "User Authentication"
  ✅ Creates Feature: "Product Search"
     - Links to "Product Catalog"
  ✅ Creates Test Cases:
     - "Login with valid credentials"
     - "Search by product name"

VIEWERS (Client):
  ✅ Sees project created
  ✅ Sees requirements listed
  ✅ Cannot make any changes
```

#### **Week 2-3: Development Phase**
```
DEVELOPER (Bob):
  ✅ Reads requirement: "User Authentication"
  ✅ Checks feature: "Login Module"
  ✅ Updates feature status: "Planning" → "In Development"
  ✅ Implements login functionality
  ✅ Updates notes: "Completed login form and validation"

DEVELOPER (Carol):
  ✅ Reads requirement: "Product Catalog"
  ✅ Updates feature: "Product Search" → "In Development"
  ✅ Implements search functionality

ANALYST (Alex):
  ✅ Monitors progress
  ✅ Answers developer questions
  ✅ Updates requirements based on discoveries

VIEWERS (Client):
  ✅ Sees progress: "Feature status changed to In Development"
  ✅ Cannot modify anything
  ✅ Reviews progress in dashboard
```

#### **Week 4: Testing Phase**
```
DEVELOPER (Bob):
  ✅ Completes coding
  ✅ Updates feature: "In Development" → "Testing"
  ✅ Informs QA team

DEVELOPER (Carol):
  ✅ Updates feature: "In Development" → "Testing"

QA ENGINEER (Dave):
  ✅ Reads test case: "Login with valid credentials"
  ✅ Executes manual test
  ✅ Test PASSES → Updates: "Ready" → "Passed"
  ✅ Reads test case: "Search by product name"
  ✅ Test FAILS → Updates: "Ready" → "Failed"
  ✅ Documents issue: "Search returns no results for partial matches"

DEVELOPER (Bob):
  ✅ Sees test failure notification
  ✅ Fixes search algorithm
  ✅ Updates feature: "Testing" → "In Development"

QA ENGINEER (Dave):
  ✅ Retests after fix
  ✅ Test PASSES → Updates: "Failed" → "Passed"

ANALYST (Alex):
  ✅ Reviews all test results
  ✅ Marks requirements as "Verified"

VIEWERS (Client):
  ✅ Sees: "2 of 2 features completed"
  ✅ Sees test results
  ✅ Reviews final deliverable
```

---

## **SCENARIO 2: Healthcare Management System**

### **Typical Day - What Each Role Does**

#### **Morning Standup (9:00 AM)**
```
ADMIN (Project Manager):
  • Checks overall project health
  • Reviews any blockers reported
  • Ensures team has access to resources

ANALYST (Requirements Lead):
  • Reviews new requirement requests
  • Prioritizes upcoming work
  • Meets with stakeholders

DEVELOPERS (Team):
  • Review assignments
  • Check what needs to be implemented
  • Identify blockers

QA (Testing Lead):
  • Reviews test cases that need execution
  • Plans test coverage
  • Identifies areas at risk

VIEWERS (Hospital Management):
  • Reviews project dashboard
  • Checks progress metrics
  • Approves major features
```

#### **Morning Work (9:30 AM - 12:30 PM)**
```
ANALYST:
  ✅ Creates new requirement: "Appointment Rescheduling"
  ✅ Creates features: "Calendar View", "Notification System"
  ✅ Creates test cases: "Reschedule confirmed appointment"

DEVELOPER 1 (Bob):
  ✅ Reads: "Patient Registration" requirement
  ✅ Sees feature: "Patient Portal" status
  ✅ Updates feature: "Planning" → "In Development"
  ✅ Writes code for patient form
  ✅ Adds note: "Form validation complete, awaiting backend"

DEVELOPER 2 (Carol):
  ✅ Reads: "Medical Records" requirement
  ✅ Checks feature: "Medical Records Vault"
  ✅ Updates: "In Development" → "Testing" (completed their part)
  ✅ Notifies QA team

QA (Dave):
  ✅ Reads test case: "Upload medical document"
  ✅ Prepares test environment
  ✅ Executes test: PASSES → Updates to "Passed"
  ✅ Reads test case: "Retrieve patient records"
  ✅ Executes test: FAILS → Documents error message
```

#### **Afternoon Work (2:00 PM - 5:00 PM)**
```
ANALYST:
  ✅ Meets with users about "Appointment Rescheduling"
  ✅ Clarifies requirements with developers
  ✅ Updates requirement based on feedback

DEVELOPER 1 (Bob):
  ✅ Completes patient form backend
  ✅ Notifies QA: "Patient Portal ready for testing"
  ✅ Updates feature: "In Development" → "Testing"

DEVELOPER 2 (Carol):
  ✅ Fixes bug found in medical records retrieval
  ✅ Re-assigns feature: "Testing" remains (waiting for QA retest)

QA (Dave):
  ✅ Retests "Retrieve patient records" after fix: PASSES
  ✅ Updates test status: "Failed" → "Passed"
  ✅ Begins testing: "Upload medical document"
  ✅ Finds edge case issue → Documents as "Failed"
  ✅ Updates feature status: "Testing" with notes about issue

VIEWERS (Hospital Management):
  ✅ Reviews daily progress report
  ✅ Sees: 3 features completed, 2 in testing, 1 in development
  ✅ Reviews test results summary
```

---

## **SCENARIO 3: Team Collaboration Platform**

### **Different Role Perspectives**

#### **What Admin Sees**
```
Dashboard View:
  ✅ All 5 projects visible
  ✅ All team members and their roles
  ✅ All requirements, features, test cases
  ✅ All test results
  ✅ User activity logs
  ✅ System health metrics

Actions Admin Can Take:
  ✅ Create new project
  ✅ Modify any requirement
  ✅ Delete test cases
  ✅ Add new users
  ✅ Change user roles
  ✅ View all reports
  ✅ Configure system settings
```

#### **What Analyst Sees**
```
Dashboard View:
  ✅ All projects (assigned to)
  ✅ All requirements
  ✅ All features
  ✅ All test cases
  ✅ All test results
  ❌ Cannot see user management area

Actions Analyst Can Take:
  ✅ Create requirements
  ✅ Create features
  ✅ Create test cases
  ✅ Edit requirements
  ✅ Edit features
  ✅ Edit test cases
  ✅ Delete items they created
  ❌ Cannot manage users
  ❌ Cannot delete other people's items (depends on config)
```

#### **What Developer Sees**
```
Dashboard View:
  ✅ Assigned project(s)
  ✅ Requirements for their features
  ✅ Features they're implementing
  ✅ Feature status workflow
  ❌ Cannot see user management
  ❌ Cannot create new requirements

Actions Developer Can Take:
  ✅ Read requirements
  ✅ Update feature status: Planning → In Development
  ✅ Update feature status: In Development → Testing
  ✅ Update feature status: Testing → Complete
  ✅ Add implementation notes
  ✅ View test cases to understand requirements
  ❌ Create new requirements
  ❌ Delete anything
  ❌ Create features
```

#### **What QA Sees**
```
Dashboard View:
  ✅ Assigned project(s)
  ✅ Test cases to execute
  ✅ Features being tested
  ✅ Test result history
  ❌ Cannot see user management
  ❌ Cannot create requirements/features

Actions QA Can Take:
  ✅ View test cases
  ✅ Update test status: Ready → In Progress
  ✅ Update test status: In Progress → Passed
  ✅ Update test status: In Progress → Failed
  ✅ Add test results and bugs
  ✅ View features and requirements to understand context
  ✅ Generate test reports
  ❌ Create test cases
  ❌ Create requirements
  ❌ Delete anything
```

#### **What Viewer Sees**
```
Dashboard View:
  ✅ Project overview
  ✅ Feature list and status
  ✅ Completion percentage
  ✅ Test results summary
  ✅ Requirements approved list
  ✅ Reports and analytics
  ❌ Cannot see user management
  ❌ Cannot see user permissions

Actions Viewer Can Take:
  ✅ Read all information
  ✅ Download reports
  ✅ View analytics
  ✅ See project progress
  ✅ Review completed features
  ✅ Approve deliverables (offline/email)
  ❌ Cannot make ANY changes
  ❌ Cannot create items
  ❌ Cannot edit items
  ❌ Cannot delete items
```

---

## **SCENARIO 4: Inventory Management System**

### **Typical Issue & Role Responses**

#### **Issue: "Stock Levels Not Updating Correctly"**

```
VIEWER (Warehouse Manager):
  1. Reviews dashboard
  2. Sees stock level discrepancy
  3. Reports issue to Analyst
  ❌ Cannot investigate directly

ANALYST (Requirements Specialist):
  1. Receives report from stakeholder
  2. Creates requirement: "Fix stock calculation bug"
  3. Analyzes issue
  4. Creates test case: "Verify stock level after transaction"
  5. Assigns to development team

DEVELOPER (Senior Dev):
  1. Reads requirement: "Fix stock calculation bug"
  2. Checks feature: "Stock Dashboard"
  3. Reviews test case requirements
  4. Updates feature: "Complete" → "In Development" (regression)
  5. Debugs code
  6. Finds issue: Wrong calculation formula
  7. Fixes code
  8. Updates: "In Development" → "Testing"
  9. Adds note: "Fixed calculation logic - awaiting QA"

QA ENGINEER:
  1. Reads test case: "Verify stock level after transaction"
  2. Executes test with sample data
  3. Result: PASSES
  4. Updates test: "Ready" → "Passed"
  5. Runs additional edge cases → All PASS
  6. Updates feature in notes: "All tests passed"

ANALYST:
  1. Reviews test results
  2. Confirms issue is resolved
  3. Updates requirement status: "Approved"
  4. Creates internal note: "Issue resolved in v2.1"

ADMIN:
  1. Reviews issue resolution
  2. Approves fix for production
  3. Marks as complete
  4. Documents in changelog

VIEWER (Warehouse Manager):
  1. Sees requirement marked as "Approved"
  2. Product is updated
  3. Verifies stock levels are now correct
  4. Confirms issue resolved
```

---

## **SCENARIO 5: Learning Management System**

### **New Feature Request Process**

#### **Step 1: Request Received**
```
VIEWER/Client:
  "We need the ability for instructors to create quizzes"
  
ADMIN:
  Receives request
  
ANALYST:
  Creates requirement: "Quiz Creation for Instructors"
  Status: Draft
  Priority: High
```

#### **Step 2: Analysis & Creation**
```
ANALYST:
  ✅ Refines requirement
  ✅ Creates features:
     - "Quiz Builder"
     - "Question Editor"
     - "Answer Validation"
  ✅ Creates 8 test cases:
     - "Create multiple choice quiz"
     - "Set quiz time limit"
     - "Save quiz as draft"
     - "Publish quiz"
     - etc.
  ✅ Updates requirement status: "Draft" → "In Review"

ADMIN:
  ✅ Reviews requirement
  ✅ Updates: "In Review" → "Approved"
```

#### **Step 3: Development**
```
DEVELOPER 1:
  ✅ Takes feature: "Quiz Builder"
  ✅ Updates: "Planning" → "In Development"
  ✅ Implements UI and logic
  ✅ Updates: "In Development" → "Testing"

DEVELOPER 2:
  ✅ Takes feature: "Question Editor"
  ✅ Updates: "Planning" → "In Development"
  ✅ Implements question types
  ✅ Updates: "In Development" → "Testing"

DEVELOPER 3:
  ✅ Takes feature: "Answer Validation"
  ✅ Updates: "Planning" → "In Development"
  ✅ Implements scoring logic
  ✅ Updates: "In Development" → "Testing"
```

#### **Step 4: Testing**
```
QA ENGINEER 1:
  ✅ Test: "Create multiple choice quiz"
  ✅ Result: PASSED → Updates status
  ✅ Test: "Save quiz as draft"
  ✅ Result: FAILED → Documents issue
  ✅ Reports back to developer

DEVELOPER 1:
  ✅ Reads failing test report
  ✅ Fixes save functionality
  ✅ Not updates feature status as still testing

QA ENGINEER 1:
  ✅ Retests: "Save quiz as draft"
  ✅ Result: PASSED → Updates status

QA ENGINEER 2:
  ✅ Test: "Set quiz time limit"
  ✅ Result: PASSED
  ✅ Test: "Publish quiz"
  ✅ Result: PASSED
  [... all tests pass ...]
```

#### **Step 5: Completion**
```
ANALYST:
  ✅ Reviews all test results
  ✅ Verifies all requirements met
  ✅ Updates requirement: "Approved"

DEVELOPERS:
  ✅ Update all features: "Testing" → "Complete"

ADMIN:
  ✅ Final review
  ✅ Approves for deployment
  ✅ Marks requirement as "Delivered"

VIEWER (Client):
  ✅ Sees feature: "Quiz Creation" → COMPLETE
  ✅ Tests feature
  ✅ Approves delivery (offline)
```

---

## **SCENARIO 6: Access Denied Examples**

### **What Happens When Someone Tries Wrong Action**

#### **Developer Trying to Create a Requirement**
```
Developer clicks: "Create Requirement"
System checks: Does Developer have 'create' permission?
Answer: NO (Developer only has 'read' and 'update')
Result: ❌ ACCESS DENIED
Message: "You don't have permission to create requirements"
```

#### **QA Trying to Delete a Test Case**
```
QA clicks: "Delete Test Case"
System checks: Does QA have 'delete' permission?
Answer: NO (QA only has 'read' and 'update' for tests)
Result: ❌ ACCESS DENIED
Message: "You don't have permission to delete test cases"
```

#### **Viewer Trying to Update Feature Status**
```
Viewer clicks: "Update Feature to 'In Development'"
System checks: Does Viewer have 'update' permission?
Answer: NO (Viewer only has 'read')
Result: ❌ ACCESS DENIED
Message: "You don't have permission to modify this feature"
```

#### **Analyst Trying to Manage Users**
```
Analyst goes to: User Management page
System checks: Does Analyst have 'manage_users' permission?
Answer: NO (Only Admin has manage_users)
Result: ❌ PAGE NOT VISIBLE
Message: User management section is hidden/disabled
```

---

## **SCENARIO 7: Mixed Team Project**

### **All Roles Working Together on Inventory System**

```
TIMELINE: Monday Morning Meeting

ADMIN:
  "Today we're starting the Inventory Management System"
  "I've created the project and assigned everyone"
  "Analyst Alex will lead requirements"
  "Developers Bob and Carol will implement"
  "QA Dave will test"
  "Finance team will review as viewers"

ANALYST ALEX:
  "I have 3 requirements ready"
  "Stock Management, Warehouse Operations, Purchase Orders"
  "I'll create features and test cases by end of day"
  "Dev team will have detailed specs to work from"

DEVELOPER BOB:
  "I'll take Stock Management and Warehouse Operations"
  "I'll plan the database design"
  "Give me the detailed requirements"

DEVELOPER CAROL:
  "I'll handle Purchase Orders and integrations"
  "I need the API specifications from you (pointing to Analyst)"

QA DAVE:
  "I'm ready to test as soon as dev is ready"
  "I'll follow the test cases Alex creates"
  "I'll work closely with dev to verify fixes"

VIEWER (Finance Director):
  "I just want to see progress"
  "I'll review when it's ready"
  "Can't modify anything, that's fine"

```

#### **Tuesday Morning Status**

```
ANALYST ALEX:
  ✅ COMPLETED:
     - 3 requirements defined
     - 10 features created
     - 25 test cases written

DEVELOPER BOB:
  ✅ STARTED:
     - Stock Management feature → "In Development"
  ❌ BLOCKED:
     - Waiting for database schema from Analyst

DEVELOPER CAROL:
  ✅ PLANNED:
     - Purchase Orders architecture designed
  ⏳ WAITING:
     - API specs from backend team

QA DAVE:
  ⏳ READY:
     - All test cases reviewed
     - Test environment prepared
     - Waiting for dev to announce "Testing" status

VIEWER (Finance Director):
  ✅ REVIEWED:
     - Project dashboard
     - Requirements list
     - Timeline looks good
```

---

## **Key Learning Points from Scenarios**

1. **Analyst Creates** everything needed (requirements, features, tests)
2. **Developer Implements** based on Analyst's specifications
3. **Developer Updates** feature status as work progresses
4. **QA Tests** based on Analyst-created test cases
5. **QA Updates** test case status (Passed/Failed)
6. **Admin Coordinates** team and approves major decisions
7. **Viewer Approves** deliverables and tracks progress

---

## **Testing Each Role**

### **How to Verify Roles Work Correctly**

```
1. Login as Admin
   ✅ Can create project
   ✅ Can modify any requirement
   ✅ Can delete features
   ✅ Can manage users
   
2. Login as Analyst
   ✅ Can create requirement
   ✅ Can delete test case
   ❌ Cannot manage users
   ❌ Cannot delete project
   
3. Login as Developer
   ✅ Can view requirements
   ✅ Can update feature status
   ❌ Cannot create feature
   ❌ Cannot delete items
   
4. Login as QA
   ✅ Can view test cases
   ✅ Can update test status
   ❌ Cannot create test case
   ❌ Cannot delete items
   
5. Login as Viewer
   ✅ Can view everything
   ✅ Can download reports
   ❌ Cannot edit anything
   ❌ Cannot create anything
```

---

This document provides practical examples of how all roles interact in real projects!
