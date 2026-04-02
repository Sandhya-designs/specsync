import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const assignAdditionalTeamMembers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the E-Commerce Platform project
    const project = await Project.findOne({ projectName: 'E-Commerce Platform' });
    if (!project) {
      console.error('❌ E-Commerce Platform project not found');
      process.exit(1);
    }
    console.log(`✅ Found project: ${project.projectName}`);

    // Find BusinessAnalyst and Viewer users
    const businessA = await User.findOne({ email: 'analyst@specsync.com' });
    const viewer = await User.findOne({ email: 'viewer@specsync.com' });

    if (!businessA) {
      console.error('❌ BusinessAnalyst user not found');
      process.exit(1);
    }
    if (!viewer) {
      console.error('❌ Viewer user not found');
      process.exit(1);
    }
    console.log(`✅ Found BusinessAnalyst: ${businessA.firstName} ${businessA.lastName}`);
    console.log(`✅ Found Viewer: ${viewer.firstName} ${viewer.lastName}`);

    // Check if they're already in the team
    const baInTeam = project.team.some(member => member.userId.equals(businessA._id));
    const viewerInTeam = project.team.some(member => member.userId.equals(viewer._id));

    // Add to team if not already present
    if (!baInTeam) {
      project.team.push({
        userId: businessA._id,
        role: 'BusinessAnalyst'
      });
      console.log(`✅ Added BusinessAnalyst to team`);
    } else {
      console.log(`⚠️  BusinessAnalyst already in team`);
    }

    if (!viewerInTeam) {
      project.team.push({
        userId: viewer._id,
        role: 'Viewer'
      });
      console.log(`✅ Added Viewer to team`);
    } else {
      console.log(`⚠️  Viewer already in team`);
    }

    // Save the project
    await project.save();
    console.log(`\n✅ PROJECT UPDATED SUCCESSFULLY\n`);

    // Display team members
    console.log('📋 Current Team Members:');
    await project.populate('team.userId');
    project.team.forEach(member => {
      console.log(`   • ${member.userId.firstName} ${member.userId.lastName} (${member.role})`);
    });

    console.log(`\n✅ All 5 roles now have access to E-Commerce Platform!`);
    console.log(`   • Admin: Full access`);
    console.log(`   • BusinessAnalyst: Reqs, Features, Drift, Analytics`);
    console.log(`   • Developer: Reqs, Features, Drift`);
    console.log(`   • QA: Reqs, Features, TestCases, Drift`);
    console.log(`   • Viewer: Reqs, Features (read-only)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

assignAdditionalTeamMembers();
