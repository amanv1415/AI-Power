import mongoose from 'mongoose';
import { MediaItem } from '../models/MediaItem.js';
import{ User } from '../models/User.js';
import { mockMediaContent } from '../utils/mockData.js';
import { hashPassword } from '../utils/password.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-media-hub';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await MediaItem.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed sample users
    const users = [
      {
        email: 'demo@example.com',
        username: 'demouser',
        password: await hashPassword('demo123'),
        preferences: {
          categories: ['Technology', 'Entertainment'],
          aiRecommendations: true,
          theme: 'dark',
        },
      },
      {
        email: 'curator@example.com',
        username: 'contentcurator',
        password: await hashPassword('curator123'),
        preferences: {
          categories: ['Music', 'Health'],
          aiRecommendations: true,
          theme: 'light',
        },
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} sample users`);

    // Seed sample content
    const content = await MediaItem.insertMany(mockMediaContent);
    console.log(`✓ Created ${content.length} sample content items`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('Demo Credentials:');
    console.log('  Email: demo@example.com');
    console.log('  Password: demo123');
    console.log('\nTry accessing the app and logging in with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
