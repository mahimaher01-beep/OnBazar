const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://onbazar:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/onbazar';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'Next-Gen Audio Experience',
    image: '/assets/images/Banner/Next-Gen Audio Experience.webp',
    link: '/shop?category=audio',
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/shop?category=audio',
    secondaryBtnText: 'View Details',
    secondaryBtnLink: '/shop',
    order: 1,
    isActive: true,
  },
  {
    title: 'Smart Tech & Smarter Living',
    image: '/assets/images/Banner/Smart Tech Smarter Living.webp',
    link: '/shop?category=electronics',
    primaryBtnText: 'Explore Tech',
    primaryBtnLink: '/shop?category=electronics',
    secondaryBtnText: 'All Gadgets',
    secondaryBtnLink: '/shop',
    order: 2,
    isActive: true,
  },
  {
    title: 'Urban Fashion Collection',
    image: '/assets/images/Banner/Urban Fashion Collection.webp',
    link: '/shop?category=fashion',
    primaryBtnText: 'Browse Collection',
    primaryBtnLink: '/shop?category=fashion',
    secondaryBtnText: 'New Arrivals',
    secondaryBtnLink: '/shop',
    order: 3,
    isActive: true,
  },
  {
    title: 'Premium Wearables & Accessories',
    image: '/assets/images/Banner/Premium Wearables & Accessories.webp',
    link: '/shop?category=accessories',
    primaryBtnText: 'Shop Wearables',
    primaryBtnLink: '/shop?category=accessories',
    secondaryBtnText: 'All Products',
    secondaryBtnLink: '/shop',
    order: 4,
    isActive: true,
  },
  {
    title: 'Step Into Style & Innovation',
    image: '/assets/images/Banner/Step Into Style & Innovation.webp',
    link: '/shop?category=footwear',
    primaryBtnText: 'Shop Footwear',
    primaryBtnLink: '/shop?category=footwear',
    secondaryBtnText: 'Trendy Wear',
    secondaryBtnLink: '/shop',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb://onbazar:xI2QuBaFZsYQ5vRD@ac-jrowhop-shard-00-00.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-01.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-02.e5n1hnl.mongodb.net:27017/onbazar?ssl=true&authSource=admin';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB successfully.');

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
