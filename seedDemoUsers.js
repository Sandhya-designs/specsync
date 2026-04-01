import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const demoUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@specsync.com',
    password: 'Demo123!',
    role: 'Admin'
  },
  {
    firstName: 'Analyst',
    lastName: 'User',
    email: 'analyst@specsync.com',
    password: 'Demo123!',
    role: 'BusinessAnalyst'
  },
  {
    firstName: 'Developer',
    lastName: 'User',
    email: 'developer@specsync.com',
    password: 'Demo123!',
    role: 'Developer'
  },
  {
    firstName: 'QA',
    lastName: 'User',
    email: 'qa@specsync.com',
    password: 'Demo123!',
    role: 'QA'
  },
  {
    firstName: 'Viewer',
    lastName: 'User',
    email: 'viewer@specsync.com',
    password: 'Demo123!',
    role: 'Viewer'
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');

    // Delete existing demo users
    await User.deleteMany({ email: { $in: demoUsers.map(u => u.email) } });
    console.log('✓ Cleaned existing demo users');

    // Create new users
    const createdUsers = await User.create(demoUsers);
    console.log(`✓ Created ${createdUsers.length} demo users:`);
    
    createdUsers.forEach(user => {
      console.log(`  - ${user.email} (${user.role})`);
    });

    console.log('\n✓ Demo users seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding users:', error.message);
    process.exit(1);
  }
}

seedUsers();
