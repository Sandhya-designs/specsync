import mongoose from 'mongoose';
import Project from './models/Project.js';
import Requirement from './models/Requirement.js';
import RequirementVersion from './models/RequirementVersion.js';
import Feature from './models/Feature.js';
import TestCase from './models/TestCase.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedDemoData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');

    // Get all users
    const adminUser = await User.findOne({ email: 'admin@specsync.com' });
    const analystUser = await User.findOne({ email: 'analyst@specsync.com' });
    const devUser = await User.findOne({ email: 'developer@specsync.com' });
    const qaUser = await User.findOne({ email: 'qa@specsync.com' });
    const viewerUser = await User.findOne({ email: 'viewer@specsync.com' });

    if (!adminUser || !analystUser || !devUser || !qaUser || !viewerUser) {
      console.error('✗ Some users not found. Run seedDemoUsers.js first');
      process.exit(1);
    }

    // Clear all demo data
    await Project.deleteMany({});
    await Requirement.deleteMany({});
    await RequirementVersion.deleteMany({});
    await Feature.deleteMany({});
    await TestCase.deleteMany({});
    console.log('✓ Cleared existing demo data');

    // Helper function to create project with data
    async function createProjectWithData(projectData) {
      const project = await Project.create({
        projectName: projectData.name,
        description: projectData.description,
        owner: adminUser._id,
        createdBy: adminUser._id,
      });

      // Create Requirements
      const requirements = await Requirement.create(
        projectData.requirements.map(req => ({
          ...req,
          projectId: project._id,
          createdBy: adminUser._id,
        }))
      );

      // Create Requirement Versions
      for (let i = 0; i < requirements.length; i++) {
        const req = requirements[i];
        const versionCount = i < 2 ? 3 : (i < 4 ? 2 : 1);
        const versions = [];

        for (let v = 1; v <= versionCount; v++) {
          const version = await RequirementVersion.create({
            requirementId: req._id,
            projectId: project._id,
            versionNumber: v,
            title: v > 1 ? `${req.title} (v${v})` : req.title,
            description: v > 1 ? `${req.description} - Updated in version ${v}` : req.description,
            status: req.status,
            priority: req.priority,
            changeLog: v > 1 ? `Updated with additional features and refinements` : '',
            createdBy: adminUser._id,
          });
          versions.push(version._id);
        }

        req.versions = versions;
        req.currentVersion = versionCount;
        await req.save();
      }

      // Create Features
      const features = await Feature.create(
        projectData.features.map(feat => ({
          ...feat,
          projectId: project._id,
          createdBy: adminUser._id,
        }))
      );

      // Create Test Cases
      const testCases = await TestCase.create(
        projectData.testCases.map(tc => ({
          ...tc,
          projectId: project._id,
          createdBy: adminUser._id,
        }))
      );

      return { project, requirements, features, testCases };
    }

    // Project 1: E-Commerce Platform
    console.log('⏳ Creating E-Commerce Platform...');
    const ecommerce = await createProjectWithData({
      name: 'E-Commerce Platform',
      description: 'Complete online shopping system with payment integration',
      requirements: [
        {
          reqId: 'REQ-001',
          title: 'User Authentication System',
          description: 'User login, signup, and password reset functionality',
          status: 'Approved',
          priority: 'Critical',
        },
        {
          reqId: 'REQ-002',
          title: 'Product Catalog',
          description: 'Display products with categories, filters, and search',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'REQ-003',
          title: 'Shopping Cart Management',
          description: 'Add/remove items, update quantities, calculate totals',
          status: 'In Review',
          priority: 'High',
        },
        {
          reqId: 'REQ-004',
          title: 'Payment Processing',
          description: 'Integrate payment gateway, handle transactions securely',
          status: 'Approved',
          priority: 'Critical',
        },
        {
          reqId: 'REQ-005',
          title: 'Order Management',
          description: 'Track orders, manage order status, generate invoices',
          status: 'Approved',
          priority: 'High',
        },
      ],
      features: [
        { featureName: 'Login Module', description: 'User email/password login with validation', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Signup Module', description: 'New user registration and email verification', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Password Reset', description: 'Secure password reset via email link', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Product Catalog Display', description: 'Display products with images and details', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Product Search', description: 'Search products by name and keywords', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Product Filtering', description: 'Filter by price, rating, category', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Add to Cart', description: 'Add items to shopping cart', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Cart Management', description: 'Update quantities, remove items, view totals', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Checkout Process', description: 'Multi-step checkout flow', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Stripe Integration', description: 'Process credit card payments securely', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Order Tracking', description: 'Track order status in real-time', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Invoice Generation', description: 'Generate PDF invoices for orders', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Email Notifications', description: 'Send order confirmation and shipping updates', status: 'Complete', implementedVersion: 1 },
        { featureName: 'User Reviews', description: 'Allow customers to review products', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Wishlist Feature', description: 'Save products for later purchase', status: 'Planning', implementedVersion: 1 },
      ],
      testCases: [
        { testCaseId: 'TC-001', title: 'Login with valid credentials', description: 'User successfully logs in with correct email and password', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-002', title: 'Login with invalid password', description: 'System rejects login with wrong password', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-003', title: 'Signup new user', description: 'New user can register with email and password', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-004', title: 'Email verification', description: 'Signup email verification works correctly', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-005', title: 'Password reset flow', description: 'User receives password reset email and can update password', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-006', title: 'Search products by keyword', description: 'Search returns relevant products', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'TC-007', title: 'Filter products by price', description: 'Products filtered correctly by price range', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'TC-008', title: 'Add item to cart', description: 'Item added to cart with correct quantity', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-009', title: 'Remove item from cart', description: 'Item removed from cart successfully', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'TC-010', title: 'Update cart quantity', description: 'Cart quantity updated correctly', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'TC-011', title: 'Cart total calculation', description: 'Cart total calculated with tax and shipping', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-012', title: 'Checkout with valid payment', description: 'Successful checkout with valid card', status: 'In Progress', priority: 'Critical' },
        { testCaseId: 'TC-013', title: 'Checkout with invalid payment', description: 'System rejects invalid card details', status: 'In Progress', priority: 'Critical' },
        { testCaseId: 'TC-014', title: 'Order confirmation email', description: 'Order confirmation sent after successful purchase', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-015', title: 'View order history', description: 'User can view past orders and details', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'TC-016', title: 'Track order status', description: 'Real-time order tracking shows current status', status: 'Passed', priority: 'High' },
        { testCaseId: 'TC-017', title: 'Download invoice', description: 'User can download PDF invoice for order', status: 'In Progress', priority: 'Medium' },
        { testCaseId: 'TC-018', title: 'Leave product review', description: 'User can submit product rating and review', status: 'Passed', priority: 'Low' },
        { testCaseId: 'TC-019', title: 'Add to wishlist', description: 'User can save product to wishlist', status: 'Ready', priority: 'Low' },
      ],
    });
    console.log('✓ E-Commerce Platform created');

    // Project 2: Healthcare Management System
    console.log('⏳ Creating Healthcare Management System...');
    const healthcare = await createProjectWithData({
      name: 'Healthcare Management System',
      description: 'Patient management, appointment scheduling, and medical records',
      requirements: [
        {
          reqId: 'HM-001',
          title: 'Patient Registration',
          description: 'Register new patients with medical history',
          status: 'Approved',
          priority: 'Critical',
        },
        {
          reqId: 'HM-002',
          title: 'Appointment Scheduling',
          description: 'Book and manage doctor appointments',
          status: 'In Review',
          priority: 'High',
        },
        {
          reqId: 'HM-003',
          title: 'Medical Records',
          description: 'Store and retrieve patient medical records securely',
          status: 'Approved',
          priority: 'Critical',
        },
        {
          reqId: 'HM-004',
          title: 'Prescription Management',
          description: 'Generate and manage digital prescriptions',
          status: 'Draft',
          priority: 'High',
        },
        {
          reqId: 'HM-005',
          title: 'Billing System',
          description: 'Invoice generation and payment processing',
          status: 'In Review',
          priority: 'High',
        },
      ],
      features: [
        { featureName: 'Patient Registration', description: 'Register new patients with medical history', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Patient Portal', description: 'Patient self-registration and profile management', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Doctor Directory', description: 'List all doctors with specialties and availability', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Appointment Calendar', description: 'Doctor appointment scheduling system', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Appointment Rescheduling', description: 'Allow patients to reschedule appointments', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Calendar View', description: 'Visual calendar for appointment management', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Medical Records Vault', description: 'Secure document storage and retrieval', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Upload Medical Document', description: 'Secure file upload for patient records', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Prescription Module', description: 'Digital prescription generation and management', status: 'Planning', implementedVersion: 1 },
        { featureName: 'Prescription Notification', description: 'Notify patients when prescriptions are ready', status: 'Planning', implementedVersion: 1 },
        { featureName: 'Billing Engine', description: 'Invoice generation and payment management', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Insurance Integration', description: 'Process insurance claims and coverage', status: 'Planning', implementedVersion: 1 },
        { featureName: 'Notification System', description: 'Send appointment and record update notifications', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Patient History', description: 'View complete patient medical history', status: 'Testing', implementedVersion: 1 },
      ],
      testCases: [
        { testCaseId: 'HTC-001', title: 'Patient registration flow', description: 'Register new patient with medical history', status: 'Passed', priority: 'Critical' },
        { testCaseId: 'HTC-002', title: 'Patient data validation', description: 'Validate required patient information', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-003', title: 'View doctor directory', description: 'Display all doctors with specialties', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-004', title: 'Schedule appointment', description: 'Book appointment with doctor', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-005', title: 'Reschedule appointment', description: 'Change appointment to different date/time', status: 'In Progress', priority: 'High' },
        { testCaseId: 'HTC-006', title: 'Cancel appointment', description: 'Cancel existing appointment', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'HTC-007', title: 'View appointment confirmation', description: 'Confirmation email sent to patient', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-008', title: 'Upload medical document', description: 'Securely upload patient medical document', status: 'In Progress', priority: 'Critical' },
        { testCaseId: 'HTC-009', title: 'Retrieve medical records', description: 'Access patient medical records securely', status: 'Passed', priority: 'Critical' },
        { testCaseId: 'HTC-010', title: 'View medical history', description: 'Display complete patient medical timeline', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-011', title: 'Generate prescription', description: 'Create digital prescription from appointment', status: 'In Progress', priority: 'High' },
        { testCaseId: 'HTC-012', title: 'Prescription notification', description: 'Patient receives prescription ready notification', status: 'Ready', priority: 'Medium' },
        { testCaseId: 'HTC-013', title: 'Process insurance claim', description: 'Submit claim to insurance provider', status: 'Ready', priority: 'Medium' },
        { testCaseId: 'HTC-014', title: 'Generate invoice', description: 'Create invoice for patient visit', status: 'Passed', priority: 'High' },
        { testCaseId: 'HTC-015', title: 'Process payment', description: 'Accept payment for medical services', status: 'In Progress', priority: 'High' },
      ],
    });
    console.log('✓ Healthcare Management System created');

    // Project 3: Team Collaboration Platform
    console.log('⏳ Creating Team Collaboration Platform...');
    const collaboration = await createProjectWithData({
      name: 'Team Collaboration Platform',
      description: 'Project management, team communication, and file sharing',
      requirements: [
        {
          reqId: 'TC-001',
          title: 'Team Workspace',
          description: 'Create and manage team workspaces',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'TC-002',
          title: 'Task Management',
          description: 'Create, assign, and track project tasks',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'TC-003',
          title: 'Real-time Chat',
          description: 'Instant messaging and group conversations',
          status: 'In Review',
          priority: 'Medium',
        },
        {
          reqId: 'TC-004',
          title: 'File Sharing',
          description: 'Upload, share, and manage project files',
          status: 'Draft',
          priority: 'High',
        },
        {
          reqId: 'TC-005',
          title: 'Time Tracking',
          description: 'Log and track time spent on tasks',
          status: 'Approved',
          priority: 'Medium',
        },
      ],
      features: [
        { featureName: 'Workspace Creation', description: 'Create team workspaces for projects', status: 'Released', implementedVersion: 2 },
        { featureName: 'Team Member Invite', description: 'Add team members to workspace', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Task Board', description: 'Kanban-style task management with drag-drop', status: 'Complete', implementedVersion: 2 },
        { featureName: 'Task Creation', description: 'Create and assign tasks to team members', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Task Status Workflow', description: 'Track tasks through workflow stages', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Chat Module', description: 'Real-time messaging system for teams', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Direct Messaging', description: 'Private messages between team members', status: 'In Development', implementedVersion: 1 },
        { featureName: 'File Manager', description: 'Centralized file storage and sharing', status: 'Testing', implementedVersion: 1 },
        { featureName: 'File Upload', description: 'Upload and store project files', status: 'Testing', implementedVersion: 1 },
        { featureName: 'File Permissions', description: 'Control access to shared files', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Time Logger', description: 'Task time tracking feature', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Timer Widget', description: 'Start/stop timer for time tracking', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Time Reports', description: 'Generate team time reports', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Notifications', description: 'Real-time notifications for team activity', status: 'Testing', implementedVersion: 1 },
      ],
      testCases: [
        { testCaseId: 'CTC-001', title: 'Create team workspace', description: 'Create new team workspace successfully', status: 'Passed', priority: 'High' },
        { testCaseId: 'CTC-002', title: 'Invite team members', description: 'Send invitations to team members', status: 'Passed', priority: 'High' },
        { testCaseId: 'CTC-003', title: 'Create task', description: 'Create new task in workspace', status: 'Passed', priority: 'High' },
        { testCaseId: 'CTC-004', title: 'Assign task', description: 'Assign task to team member', status: 'Passed', priority: 'High' },
        { testCaseId: 'CTC-005', title: 'Update task status', description: 'Move task through workflow stages', status: 'Passed', priority: 'High' },
        { testCaseId: 'CTC-006', title: 'Send chat message', description: 'Send message in team chat', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'CTC-007', title: 'Direct message user', description: 'Send private message to team member', status: 'In Progress', priority: 'Medium' },
        { testCaseId: 'CTC-008', title: 'Upload file', description: 'Upload and share file with team', status: 'In Progress', priority: 'High' },
        { testCaseId: 'CTC-009', title: 'Download file', description: 'Download shared file from workspace', status: 'In Progress', priority: 'High' },
        { testCaseId: 'CTC-010', title: 'Share file', description: 'Share file with specific team members', status: 'In Progress', priority: 'Medium' },
        { testCaseId: 'CTC-011', title: 'Start time tracking', description: 'Start timer on task', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'CTC-012', title: 'Log time entry', description: 'Log manual time entry for task', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'CTC-013', title: 'View time reports', description: 'Generate team time tracking reports', status: 'In Progress', priority: 'Low' },
        { testCaseId: 'CTC-014', title: 'Receive notifications', description: 'Get real-time activity notifications', status: 'Ready', priority: 'Medium' },
      ],
    });
    console.log('✓ Team Collaboration Platform created');

    // Project 4: Inventory Management System
    console.log('⏳ Creating Inventory Management System...');
    const inventory = await createProjectWithData({
      name: 'Inventory Management System',
      description: 'Stock management, warehouse operations, and supply chain tracking',
      requirements: [
        {
          reqId: 'IM-001',
          title: 'Stock Management',
          description: 'Track inventory levels and stock movements',
          status: 'Approved',
          priority: 'Critical',
        },
        {
          reqId: 'IM-002',
          title: 'Warehouse Operations',
          description: 'Manage warehouse locations and bin assignments',
          status: 'In Review',
          priority: 'High',
        },
        {
          reqId: 'IM-003',
          title: 'Purchase Orders',
          description: 'Create and track purchase orders from suppliers',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'IM-004',
          title: 'Barcode Scanning',
          description: 'Barcode system for inventory tracking',
          status: 'Draft',
          priority: 'Medium',
        },
        {
          reqId: 'IM-005',
          title: 'Reporting & Analytics',
          description: 'Generate inventory reports and analytics',
          status: 'In Review',
          priority: 'Medium',
        },
      ],
      features: [
        { featureName: 'Stock Dashboard', description: 'Real-time stock level monitoring', status: 'Complete', implementedVersion: 2 },
        { featureName: 'Stock Update', description: 'Update inventory levels and movements', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Low Stock Alert', description: 'Alert when stock falls below minimum', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Stock History', description: 'Track historical stock movements', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Warehouse Map', description: 'Visual warehouse location management', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Bin Assignment', description: 'Assign items to warehouse bins', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Location Tracking', description: 'Real-time item location tracking', status: 'Planning', implementedVersion: 1 },
        { featureName: 'PO Management', description: 'Purchase order creation and tracking', status: 'Released', implementedVersion: 1 },
        { featureName: 'PO Creation', description: 'Create purchase orders from stock needs', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Supplier Integration', description: 'Send POs automatically to suppliers', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Barcode Scanner', description: 'Mobile barcode scanning feature', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Item Lookup', description: 'Scan barcode to look up item details', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Report Generator', description: 'Automated inventory reports', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Stock Analysis', description: 'Analyze inventory trends and patterns', status: 'Planning', implementedVersion: 1 },
      ],
      testCases: [
        { testCaseId: 'ITC-001', title: 'View stock levels', description: 'Display current inventory levels', status: 'Passed', priority: 'Critical' },
        { testCaseId: 'ITC-002', title: 'Update stock quantity', description: 'Modify stock quantity after transaction', status: 'Passed', priority: 'High' },
        { testCaseId: 'ITC-003', title: 'Low stock notification', description: 'Alert when stock below minimum threshold', status: 'Passed', priority: 'High' },
        { testCaseId: 'ITC-004', title: 'View stock history', description: 'Display historical stock movements', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'ITC-005', title: 'Assign item to bin', description: 'Place item in warehouse location', status: 'In Progress', priority: 'High' },
        { testCaseId: 'ITC-006', title: 'Track item location', description: 'Find item location in warehouse', status: 'In Progress', priority: 'High' },
        { testCaseId: 'ITC-007', title: 'Create purchase order', description: 'Generate new purchase order', status: 'Passed', priority: 'High' },
        { testCaseId: 'ITC-008', title: 'Send PO to supplier', description: 'Transmit purchase order to supplier', status: 'In Progress', priority: 'High' },
        { testCaseId: 'ITC-009', title: 'Track PO status', description: 'Monitor purchase order status', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'ITC-010', title: 'Receive purchase order', description: 'Record received items from supplier', status: 'Passed', priority: 'High' },
        { testCaseId: 'ITC-011', title: 'Scan barcode', description: 'Scan item barcode for lookup', status: 'Failed', priority: 'Medium' },
        { testCaseId: 'ITC-012', title: 'Barcode lookup details', description: 'Retrieve item details from barcode scan', status: 'Failed', priority: 'Medium' },
        { testCaseId: 'ITC-013', title: 'Generate inventory report', description: 'Create comprehensive inventory report', status: 'In Progress', priority: 'Medium' },
        { testCaseId: 'ITC-014', title: 'Stock forecast', description: 'Predict future stock needs', status: 'Ready', priority: 'Low' },
      ],
    });
    console.log('✓ Inventory Management System created');

    // Project 5: Learning Management System
    console.log('⏳ Creating Learning Management System...');
    const lms = await createProjectWithData({
      name: 'Learning Management System',
      description: 'Online courses, student management, and assessment tracking',
      requirements: [
        {
          reqId: 'LMS-001',
          title: 'Course Management',
          description: 'Create and manage online courses',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'LMS-002',
          title: 'Student Enrollment',
          description: 'Manage student registration and enrollment',
          status: 'Approved',
          priority: 'High',
        },
        {
          reqId: 'LMS-003',
          title: 'Assessment & Quizzes',
          description: 'Create and administer online assessments',
          status: 'In Review',
          priority: 'High',
        },
        {
          reqId: 'LMS-004',
          title: 'Progress Tracking',
          description: 'Track student progress and learning outcomes',
          status: 'Draft',
          priority: 'Medium',
        },
        {
          reqId: 'LMS-005',
          title: 'Certificate Generation',
          description: 'Generate and issue course completion certificates',
          status: 'In Review',
          priority: 'Medium',
        },
      ],
      features: [
        { featureName: 'Course Builder', description: 'Drag-drop course creation tool', status: 'Complete', implementedVersion: 2 },
        { featureName: 'Course Content Upload', description: 'Upload videos, documents, and materials', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Course Publishing', description: 'Publish courses for students', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Course Management', description: 'Edit and manage course settings', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Student Portal', description: 'Student dashboard and course access', status: 'Released', implementedVersion: 1 },
        { featureName: 'Course Enrollment', description: 'Enable students to enroll in courses', status: 'Complete', implementedVersion: 1 },
        { featureName: 'Progress Tracking', description: 'Track student progress through course', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Quiz Engine', description: 'Assessment and quiz management system', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Quiz Builder', description: 'Create quizzes with multiple question types', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Quiz Scoring', description: 'Automatic scoring and grade calculation', status: 'In Development', implementedVersion: 1 },
        { featureName: 'Grade Tracker', description: 'Student performance and grading system', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Student Gradebook', description: 'View all grades and performance metrics', status: 'Testing', implementedVersion: 1 },
        { featureName: 'Certificate Module', description: 'Digital certificate generation', status: 'Planning', implementedVersion: 1 },
        { featureName: 'Certificate Design', description: 'Customize certificate templates', status: 'Planning', implementedVersion: 1 },
      ],
      testCases: [
        { testCaseId: 'LTC-001', title: 'Create course', description: 'Create new online course', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-002', title: 'Add course content', description: 'Upload videos and materials to course', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-003', title: 'Publish course', description: 'Make course available to students', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-004', title: 'Enroll student', description: 'Register student for course', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-005', title: 'View enrolled courses', description: 'Student sees their enrolled courses', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-006', title: 'Track progress', description: 'Monitor student progress through course', status: 'In Progress', priority: 'High' },
        { testCaseId: 'LTC-007', title: 'Create quiz', description: 'Build quiz with multiple choice and essay questions', status: 'In Progress', priority: 'High' },
        { testCaseId: 'LTC-008', title: 'Take quiz', description: 'Student completes assessment', status: 'Passed', priority: 'High' },
        { testCaseId: 'LTC-009', title: 'Auto-score quiz', description: 'System automatically scores quiz', status: 'In Progress', priority: 'High' },
        { testCaseId: 'LTC-010', title: 'View quiz results', description: 'Student sees quiz score and feedback', status: 'Passed', priority: 'Medium' },
        { testCaseId: 'LTC-011', title: 'View gradebook', description: 'Instructor views all student grades', status: 'In Progress', priority: 'Medium' },
        { testCaseId: 'LTC-012', title: 'Generate certificate', description: 'Issue completion certificate to student', status: 'Ready', priority: 'Medium' },
        { testCaseId: 'LTC-013', title: 'Download certificate', description: 'Student downloads certificate PDF', status: 'Ready', priority: 'Low' },
        { testCaseId: 'LTC-014', title: 'Share certificate', description: 'Student shares certificate on social media', status: 'Ready', priority: 'Low' },
      ],
    });
    console.log('✓ Learning Management System created');

    // Summary statistics
    const allProjects = [ecommerce, healthcare, collaboration, inventory, lms];
    const totalReqs = allProjects.reduce((acc, p) => acc + p.requirements.length, 0);
    const totalFeatures = allProjects.reduce((acc, p) => acc + p.features.length, 0);
    const totalTests = allProjects.reduce((acc, p) => acc + p.testCases.length, 0);

    console.log('\n✓✓✓ Demo Data Seeded Successfully! ✓✓✓');
    console.log('\n📊 PROJECTS CREATED:');
    console.log('   1. E-Commerce Platform');
    console.log('   2. Healthcare Management System');
    console.log('   3. Team Collaboration Platform');
    console.log('   4. Inventory Management System');
    console.log('   5. Learning Management System');

    console.log('\n📈 DATA SUMMARY:');
    console.log(`   ✓ Projects: ${allProjects.length}`);
    console.log(`   ✓ Total Requirements: ${totalReqs}`);
    console.log(`   ✓ Total Features: ${totalFeatures} (with realistic statuses)`);
    console.log(`   ✓ Total Test Cases: ${totalTests} (with various statuses)`);

    console.log('\n✨ DATA HIGHLIGHTS:');
    console.log('   • E-Commerce: 15 features (Payment, Notifications, Reviews, Wishlist)');
    console.log('   • Healthcare: 14 features (Appointments, Records, Billing, Prescriptions)');
    console.log('   • Collaboration: 14 features (Chat, File sharing, Time tracking)');
    console.log('   • Inventory: 14 features (Stock, Warehouse, PO, Barcode scanning)');
    console.log('   • Learning: 14 features (Quiz engine, Grades, Certificates)');

    console.log('\n📋 FEATURE STATUS DISTRIBUTION:');
    const completeCount = allProjects.reduce((acc, p) => acc + p.features.filter(f => f.status === 'Complete').length, 0);
    const devCount = allProjects.reduce((acc, p) => acc + p.features.filter(f => f.status === 'In Development').length, 0);
    const testCount = allProjects.reduce((acc, p) => acc + p.features.filter(f => f.status === 'Testing').length, 0);
    const planCount = allProjects.reduce((acc, p) => acc + p.features.filter(f => f.status === 'Planning').length, 0);
    console.log(`   ✓ Complete: ${completeCount}`);
    console.log(`   ↳ In Development: ${devCount}`);
    console.log(`   ⚙️ Testing: ${testCount}`);
    console.log(`   📅 Planning: ${planCount}`);

    console.log('\n📝 TEST CASE STATUS DISTRIBUTION:');
    const passCount = allProjects.reduce((acc, p) => acc + p.testCases.filter(t => t.status === 'Passed').length, 0);
    const failCount = allProjects.reduce((acc, p) => acc + p.testCases.filter(t => t.status === 'Failed').length, 0);
    const inProgCount = allProjects.reduce((acc, p) => acc + p.testCases.filter(t => t.status === 'In Progress').length, 0);
    console.log(`   ✅ Passed: ${passCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   ⏳ In Progress: ${inProgCount}`);

    console.log('\n👥 ROLE-BASED ACCESS CONTROL:');
    console.log('\n   📋 Admin (admin@specsync.com | Demo123!)');
    console.log('      └─ Permissions: Create, Read, Update, Delete, Manage Users');
    console.log('      └─ Can: Create/edit projects, assign users, manage all data');
    console.log('\n   📋 Business Analyst (analyst@specsync.com | Demo123!)');
    console.log('      └─ Permissions: Create, Read, Update, Delete');
    console.log('      └─ Can: Create/edit requirements, features; no user management');
    console.log('\n   📋 Developer (developer@specsync.com | Demo123!)');
    console.log('      └─ Permissions: Read, Update (Status Only)');
    console.log('      └─ Can: View projects, update feature status; no creation/deletion');
    console.log('\n   📋 QA (qa@specsync.com | Demo123!)');
    console.log('      └─ Permissions: Read, Update (Test Status Only)');
    console.log('      └─ Can: View projects, update test cases; no creation/deletion');
    console.log('\n   📋 Viewer (viewer@specsync.com | Demo123!)');
    console.log('      └─ Permissions: Read Only');
    console.log('      └─ Can: View all projects and data; no modifications');

    console.log('\n🔐 REALISTIC SCENARIO DATA:');
    console.log('   ✓ Features at different stages (Complete, Development, Testing, Planning)');
    console.log('   ✓ Test cases with mixed results (Passed, Failed, In Progress, Ready)');
    console.log('   ✓ Requirements with version history (multiple versions tracked)');
    console.log('   ✓ Real-world workflow examples in all 5 projects');
    console.log('   ✓ Clear role separation for RBAC demonstration');

    console.log('\n🚀 NEXT STEPS:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Go to: https://specsync-jn64.vercel.app/');
    console.log('   3. Login with demo credentials to see role-based access');
    console.log('   4. Review each project for realistic data');
    console.log('   5. Check Dashboard & Analytics pages');
    console.log('   6. Explore Drift Reports (Go to Drift page)');

    console.log('\n💡 FEATURES TO TEST:');
    console.log('   • Create new requirement (Analyst only)');
    console.log('   • Update feature status (Developer)');
    console.log('   • Update test case status (QA)');
    console.log('   • View-only access (Viewer)');
    console.log('   • Manage users (Admin only)');
    console.log('   • Try accessing restricted features with different roles');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding data:', error.message);
    process.exit(1);
  }
}

seedDemoData();