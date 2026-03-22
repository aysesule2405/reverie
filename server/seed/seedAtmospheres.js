const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Atmosphere = require('../models/Atmosphere');
const User = require('../models/User');

dotenv.config();

const presets = [
  {
    title: 'Rainy Evening',
    description: 'The soft patter of rain on a window, warm mug beside you.',
    moodTags: ['rain', 'calm', 'nostalgia'],
    category: 'rain',
    coverImageUrl: '/public/images/rainy-evening.jpg',
    imageUrls: ['/public/images/rain1.jpg', '/public/images/rain2.jpg'],
    songLinks: ['https://youtu.be/rainy-song'],
    visibility: 'public'
  },
  {
    title: 'Beach Sunset',
    description: 'Waves, salt air, and a fading sun.',
    moodTags: ['beach', 'warm', 'calm'],
    category: 'beach',
    coverImageUrl: '/public/images/beach-sunset.jpg',
    imageUrls: ['/public/images/beach1.jpg'],
    songLinks: ['https://youtu.be/beach-song'],
    visibility: 'public'
  },
  {
    title: 'Cozy Bedroom',
    description: 'Soft lamp light, a bed that remembers good dreams.',
    moodTags: ['cozy', 'bedroom', 'comfort'],
    category: 'bedroom',
    coverImageUrl: '/public/images/cozy-bedroom.jpg',
    imageUrls: ['/public/images/bed1.jpg'],
    songLinks: ['https://soundcloud.com/cozy-track'],
    visibility: 'public'
  },
  {
    title: 'After School Memory',
    description: 'A bike ride home, sun low, laughter in the distance.',
    moodTags: ['memory', 'nostalgia'],
    category: 'memory',
    coverImageUrl: '/public/images/after-school.jpg',
    imageUrls: ['/public/images/school1.jpg'],
    songLinks: ['https://open.spotify.com/track/example'],
    visibility: 'public'
  },
  {
    title: 'Late Night Café',
    description: 'The hiss of espresso and quiet conversations.',
    moodTags: ['cafe', 'night', 'calm'],
    category: 'cafe',
    coverImageUrl: '/public/images/cafe.jpg',
    imageUrls: ['/public/images/cafe1.jpg'],
    songLinks: ['https://youtu.be/cafe-song'],
    visibility: 'public'
  },
  {
    title: 'Quiet Meadow',
    description: 'Long grass, distant birds, a gentle breeze.',
    moodTags: ['nature', 'meadow', 'calm'],
    category: 'meadow',
    coverImageUrl: '/public/images/meadow.jpg',
    imageUrls: ['/public/images/meadow1.jpg'],
    songLinks: ['https://youtu.be/meadow-song'],
    visibility: 'public'
  }
];

const run = async () => {
  await connectDB();
  // create or find a demo user
  let user = await User.findOne({ email: 'demo@reverie.app' });
  if (!user) {
    user = await User.create({ name: 'Demo User', email: 'demo@reverie.app', password: 'seeded' });
  }

  // attach createdBy and insert presets
  const docs = presets.map(p => ({ ...p, createdBy: user._id }));
  await Atmosphere.deleteMany({});
  await Atmosphere.insertMany(docs);
  console.log('Seeded atmospheres');
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
