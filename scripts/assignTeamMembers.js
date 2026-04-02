import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const assignTeamMembers = async () => {
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

    // Find Developer and QA users
    const developer = await User.findOne({ email: 'developer@specsync.com' });
    const qa = await User.findOne({ email: 'qa@specsync.com' });

    if (!developer) {
      console.error('❌ Developer user not found');
      process.exit(1);
    }
    if (!qa) {
      console.error('❌ QA user not found');
      process.exit(1);
    }
    console.log(`✅ Found Developer: ${developer.firstName} ${developer.lastName}`);
    console.log(`✅ Found QA: ${qa.firstName} ${qa.lastName}`);

    // Check if they're already in the team
    const devInTeam = project.team.some(member => member.userId.equals(developer._id));
    const qaInTeam = project.team.some(member => member.userId.equals(qa._id));

    // Add to team if not already present
    if (!devInTeam) {
      project.team.push({
        userId: developer._id,
        role: 'Developer'
      });
      console.log(`✅ Added Developer to team`);
    } else {
      console.log(`⚠️  Developer already in team`);
    }

    if (!qaInTeam) {
      project.team.push({
        userId: qa._id,
        role: 'QA'
      });
      console.log(`✅ Added QA to team`);
    } else {
      console.log(`⚠️  QA already in team`);
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

    console.log(`\n✅ Developer and QA now have access to E-Commerce Platform project!`);
    console.log(`   • Can view all 9 requirements`);
    console.log(`   • Can view all 10 features`);
    console.log(`   • QA can view all 10 test cases`);
    console.log(`   • Can run drift detection`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

assignTeamMembers();
