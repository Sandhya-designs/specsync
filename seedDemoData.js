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

    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@specsync.com' });
    if (!adminUser) {
      console.error('✗ Admin user not found. Run seedDemoUsers.js first');
      process.exit(1);
    }

    // Clear existing demo data
    await Project.deleteMany({ projectName: 'E-Commerce Platform' });
    await Requirement.deleteMany({});
    await RequirementVersion.deleteMany({});
    await Feature.deleteMany({});
    await TestCase.deleteMany({});
    console.log('✓ Cleared existing demo data');

    // Create Projects
    const project = await Project.create({
      projectName: 'E-Commerce Platform',
      description: 'Complete online shopping system with payment integration',
      owner: adminUser._id,
      createdBy: adminUser._id,
    });
    console.log('✓ Created project: E-Commerce Platform');

    // Create Requirements (with varied priorities for better distribution)
    const requirements = await Requirement.create([
      {
        projectId: project._id,
        reqId: 'REQ-001',
        title: 'User Authentication System',
        description: 'User login, signup, and password reset functionality',
        status: 'Approved',
        priority: 'Critical',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-002',
        title: 'Product Catalog',
        description: 'Display products with categories, filters, and search',
        status: 'Approved',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-003',
        title: 'Shopping Cart Management',
        description: 'Add/remove items, update quantities, calculate totals',
        status: 'In Review',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-004',
        title: 'Payment Processing',
        description: 'Integrate payment gateway, handle transactions securely',
        status: 'Approved',
        priority: 'Critical',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-005',
        title: 'Order Management',
        description: 'Track orders, manage order status, generate invoices',
        status: 'Approved',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-006',
        title: 'User Notifications',
        description: 'Email and push notifications for order updates',
        status: 'Draft',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-007',
        title: 'Analytics Dashboard',
        description: 'Display sales metrics and user behavior analytics',
        status: 'Draft',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-008',
        title: 'Product Reviews',
        description: 'Allow users to rate and review products',
        status: 'In Review',
        priority: 'Low',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        reqId: 'REQ-009',
        title: 'Wishlist Feature',
        description: 'Save products to wishlist for later purchase',
        status: 'In Review',
        priority: 'Low',
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✓ Created ${requirements.length} requirements with:`);

    // Create Requirement Versions (with multiple versions for some to show modification history)
    const versionHistories = [];
    for (let i = 0; i < requirements.length; i++) {
      const req = requirements[i];
      const versionCount = i < 2 ? 3 : (i < 4 ? 2 : 1); // First 2 have 3 versions, next 2 have 2, last has 1
      
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
      
      // Update requirement with all version references
      req.versions = versions;
      req.currentVersion = versionCount;
      await req.save();
      versionHistories.push({ reqId: req.reqId, versions: versionCount });
    }
    console.log('✓ Created requirement versions with history:');
    versionHistories.forEach(v => console.log(`   - ${v.reqId}: ${v.versions} versions`));

    // Create Features
    const features = await Feature.create([
      {
        projectId: project._id,
        featureName: 'Login Module',
        description: 'User email/password login',
        status: 'In Development',
        requirementId: requirements[0]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Signup Module',
        description: 'New user registration',
        status: 'In Development',
        requirementId: requirements[0]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Product Search',
        description: 'Search products by name, category',
        status: 'Complete',
        requirementId: requirements[1]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Product Filtering',
        description: 'Filter by price, rating, category',
        status: 'In Development',
        requirementId: requirements[1]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Add to Cart',
        description: 'Add items to shopping cart',
        status: 'Complete',
        requirementId: requirements[2]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Cart Checkout',
        description: 'Proceed to payment',
        status: 'In Development',
        requirementId: requirements[2]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Stripe Integration',
        description: 'Process credit card payments',
        status: 'Testing',
        requirementId: requirements[3]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Order Tracking',
        description: 'Track order status in real-time',
        status: 'Released',
        requirementId: requirements[4]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Email Notifications',
        description: 'Send email alerts for order updates',
        status: 'In Development',
        requirementId: requirements[5]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Push Notifications',
        description: 'Mobile push notifications for orders',
        status: 'Planning',
        requirementId: requirements[5]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Sales Dashboard',
        description: 'View sales metrics and revenue charts',
        status: 'In Development',
        requirementId: requirements[6]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'User Analytics',
        description: 'Track user behavior and engagement',
        status: 'Planning',
        requirementId: requirements[6]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Product Ratings',
        description: '5-star rating system for products',
        status: 'In Development',
        requirementId: requirements[7]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        featureName: 'Wishlist',
        description: 'Save favorite products',
        status: 'Planning',
        requirementId: requirements[8]._id,
        implementedVersion: 1,
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✓ Created ${features.length} features`);

    // Create Test Cases
    const testCases = await TestCase.create([
      {
        projectId: project._id,
        testCaseId: 'TC-001',
        title: 'Login with valid credentials',
        description: 'User should successfully login with Email and Password',
        featureId: features[0]._id,
        requirementId: requirements[0]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-002',
        title: 'Login with invalid password',
        description: 'User enters wrong password, should show error',
        featureId: features[0]._id,
        requirementId: requirements[0]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-003',
        title: 'Signup new user',
        description: 'Register new user with email and password',
        featureId: features[1]._id,
        requirementId: requirements[0]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-004',
        title: 'Search products by keyword',
        description: 'User searches for laptop, relevant products should display',
        featureId: features[2]._id,
        requirementId: requirements[1]._id,
        status: 'Passed',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-005',
        title: 'Filter products by price',
        description: 'Filter products between $100-$500 price range',
        featureId: features[3]._id,
        requirementId: requirements[1]._id,
        status: 'Passed',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-006',
        title: 'Add item to cart',
        description: 'Add product to shopping cart',
        featureId: features[4]._id,
        requirementId: requirements[2]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-007',
        title: 'Remove item from cart',
        description: 'Remove product from shopping cart',
        featureId: features[4]._id,
        requirementId: requirements[2]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-008',
        title: 'Process payment with Stripe',
        description: 'Complete payment transaction using Stripe',
        featureId: features[6]._id,
        requirementId: requirements[3]._id,
        status: 'Failed',
        priority: 'Critical',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-009',
        title: 'View order history',
        description: 'User views past orders with details',
        featureId: features[7]._id,
        requirementId: requirements[4]._id,
        status: 'Passed',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-010',
        title: 'Print invoice',
        description: 'Generate and download PDF invoice for order',
        featureId: features[7]._id,
        requirementId: requirements[4]._id,
        status: 'Passed',
        priority: 'Low',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-011',
        title: 'Send order confirmation email',
        description: 'Email notification sent after order placement',
        featureId: features[8]._id,
        requirementId: requirements[5]._id,
        status: 'Passed',
        priority: 'High',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-012',
        title: 'View sales metrics',
        description: 'Display total sales, revenue, and top products',
        featureId: features[10]._id,
        requirementId: requirements[6]._id,
        status: 'In Progress',
        priority: 'Medium',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-013',
        title: 'Rate product',
        description: 'User gives 5-star rating to product',
        featureId: features[12]._id,
        requirementId: requirements[7]._id,
        status: 'Passed',
        priority: 'Low',
        createdBy: adminUser._id,
      },
      {
        projectId: project._id,
        testCaseId: 'TC-014',
        title: 'Add product to wishlist',
        description: 'Save product for later purchase',
        featureId: features[13]._id,
        requirementId: requirements[8]._id,
        status: 'Ready',
        priority: 'Low',
        createdBy: adminUser._id,
      },
    ]);
    console.log(`✓ Created ${testCases.length} test cases`);

    console.log('\n✓✓✓ Demo Data Seeded Successfully! ✓✓✓');
    console.log('\n📊 Data Summary:');
    console.log(`   - Projects: 1`);
    console.log(`   - Requirements: ${requirements.length} (with version history)`);
    console.log(`   - Features: ${features.length}`);
    console.log(`   - Test Cases: ${testCases.length}`);
    console.log(`\n📈 Priority Distribution:`);
    console.log(`   - Critical: ${requirements.filter(r => r.priority === 'Critical').length}`);
    console.log(`   - High: ${requirements.filter(r => r.priority === 'High').length}`);
    console.log(`   - Medium: ${requirements.filter(r => r.priority === 'Medium').length}`);
    console.log(`   - Low: ${requirements.filter(r => r.priority === 'Low').length}`);
    console.log('\n🔗 Go to: https://specsync-jn64.vercel.app/drift');
    console.log('   Select "E-Commerce Platform" to see analytics & drift reports');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding data:', error.message);
    process.exit(1);
  }
}

seedDemoData();
