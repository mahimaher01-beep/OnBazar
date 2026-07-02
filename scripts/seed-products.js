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
  mongodbUri = 'mongodb+srv://onbazar:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/onbazar';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  // Category 1: Smartphones & Tablets (smartphones-tablets)
  {
    name: 'Vortex Pro Smartphone',
    slug: 'vortex-pro-smartphone',
    description: 'A premium flagship smartphone featuring a lightweight titanium frame, stunning 120Hz AMOLED display, and a pro-grade triple camera system.',
    price: 85000,
    salePrice: 79999,
    discountRate: 6,
    purchasePrice: 65000,
    stock: 50,
    sku: 'OB-PHN-VPS01',
    categorySlug: 'smartphones-tablets',
    images: ['/assets/images/products/vortex_pro_smartphone.webp'],
    tags: ['smartphone', 'flagship', 'vortex', '5g'],
    attributes: [{ key: 'Storage', value: '256GB' }, { key: 'RAM', value: '12GB' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Aura Lite Tablet',
    slug: 'aura-lite-tablet',
    description: 'An ultra-slim, lightweight tablet designed for study, work, and entertainment. Offers a rich 10.4-inch display and dual stereo speakers.',
    price: 32000,
    salePrice: 29999,
    discountRate: 6,
    purchasePrice: 22000,
    stock: 80,
    sku: 'OB-TAB-ALT02',
    categorySlug: 'smartphones-tablets',
    images: ['/assets/images/products/aura_lite_tablet.webp'],
    tags: ['tablet', 'education', 'aura', 'work'],
    attributes: [{ key: 'Screen Size', value: '10.4 inches' }, { key: 'Storage', value: '128GB' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Titan 5G Foldable',
    slug: 'titan-5g-foldable',
    description: 'Experience the future with this premium foldable smartphone. Opens up to an 8-inch workspace screen, powered by the latest octa-core processor.',
    price: 145000,
    salePrice: 139999,
    discountRate: 3,
    purchasePrice: 110000,
    stock: 20,
    sku: 'OB-PHN-TFF03',
    categorySlug: 'smartphones-tablets',
    images: ['/assets/images/products/titan_5g_foldable.webp'],
    tags: ['foldable', 'premium', '5g', 'titan'],
    attributes: [{ key: 'Display', value: '8.0 inches Foldable' }, { key: 'RAM', value: '16GB' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Nova X1 Smartphone',
    slug: 'nova-x1-smartphone',
    description: 'Sleek design meets premium performance. Features an eco-friendly emerald green finish and a high-resolution 64MP primary camera.',
    price: 25000,
    purchasePrice: 18000,
    stock: 120,
    sku: 'OB-PHN-NXS04',
    categorySlug: 'smartphones-tablets',
    images: ['/assets/images/products/nova_x1_smartphone.webp'],
    tags: ['smartphone', 'nova', 'affordable', 'green'],
    attributes: [{ key: 'Camera', value: '64MP' }, { key: 'Battery', value: '5000mAh' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Apex Pad Pro',
    slug: 'apex-pad-pro',
    description: 'A powerful workhorse tablet with stylus support. Ideal for digital artists, designers, and corporate professionals on the go.',
    price: 68000,
    purchasePrice: 50000,
    stock: 45,
    sku: 'OB-TAB-APP05',
    categorySlug: 'smartphones-tablets',
    images: ['/assets/images/products/apex_pad_pro.webp'],
    tags: ['tablet', 'pro', 'stylus', 'design'],
    attributes: [{ key: 'Screen Size', value: '12.9 inches' }, { key: 'Processor', value: 'M2 Chip' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },

  // Category 2: Smart Wearables (smart-wearables)
  {
    name: 'Aero Watch Active',
    slug: 'aero-watch-active',
    description: 'Your ultimate fitness companion. Offers real-time heart rate monitoring, GPS tracking, and multi-sport workout coaching with water resistance.',
    price: 6500,
    salePrice: 5999,
    discountRate: 7,
    purchasePrice: 4200,
    stock: 150,
    sku: 'OB-WER-AWA06',
    categorySlug: 'smart-wearables',
    images: ['/assets/images/products/aero_watch_active.webp'],
    tags: ['smartwatch', 'sports', 'gps', 'waterproof'],
    attributes: [{ key: 'Battery Life', value: 'Up to 7 days' }, { key: 'Water Resistance', value: '5ATM' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Nexus Smart Band 5',
    slug: 'nexus-smart-band-5',
    description: 'A lightweight and budget-friendly smart band featuring a step tracker, sleep monitor, and notifications sync for your phone.',
    price: 3200,
    purchasePrice: 2000,
    stock: 200,
    sku: 'OB-WER-NSB07',
    categorySlug: 'smart-wearables',
    images: ['/assets/images/products/nexus_smart_band_5.webp'],
    tags: ['fitness tracker', 'band', 'nexus', 'budget'],
    attributes: [{ key: 'Screen', value: 'AMOLED' }, { key: 'Weight', value: '22g' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Chronos Lux Smartwatch',
    slug: 'chronos-lux-smartwatch',
    description: 'A luxury hybrid smartwatch with a classic analog look and smart notification integrations. Made with premium stainless steel.',
    price: 18500,
    salePrice: 16999,
    discountRate: 8,
    purchasePrice: 12000,
    stock: 35,
    sku: 'OB-WER-CLS08',
    categorySlug: 'smart-wearables',
    images: ['/assets/images/products/chronos_lux_smartwatch.webp'],
    tags: ['smartwatch', 'luxury', 'hybrid', 'steel'],
    attributes: [{ key: 'Material', value: 'Stainless Steel' }, { key: 'Glass Type', value: 'Sapphire' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Helix Smart Ring',
    slug: 'helix-smart-ring',
    description: 'A sleek, lightweight titanium ring equipped with bio-sensors to track sleep quality, skin temperature, and daily recovery scores.',
    price: 24000,
    salePrice: 21999,
    discountRate: 8,
    purchasePrice: 16000,
    stock: 50,
    sku: 'OB-WER-HSR09',
    categorySlug: 'smart-wearables',
    images: ['/assets/images/products/helix_smart_ring.webp'],
    tags: ['smart ring', 'health', 'titanium', 'sleep tracking'],
    attributes: [{ key: 'Material', value: 'Titanium' }, { key: 'Sensors', value: 'HR, SpO2, Temp' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Aura Sleep Tracker',
    slug: 'aura-sleep-tracker',
    description: 'A comfortable smart headband featuring electroencephalography (EEG) sensors to guide you into deep, relaxing sleep patterns.',
    price: 15000,
    purchasePrice: 10000,
    stock: 40,
    sku: 'OB-WER-AST10',
    categorySlug: 'smart-wearables',
    images: ['/assets/images/products/aura_sleep_tracker.webp'],
    tags: ['sleep tracker', 'headband', 'health', 'eeg'],
    attributes: [{ key: 'Battery', value: '12 hours' }, { key: 'Connectivity', value: 'Bluetooth 5.0' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },

  // Category 3: Audio & Sound (audio-sound)
  {
    name: 'Sonic Buds Wireless',
    slug: 'sonic-buds-wireless',
    description: 'True wireless earbuds with heavy bass boost, touch controls, smart noise cancellation, and a sleek matte charging case.',
    price: 4500,
    salePrice: 3899,
    discountRate: 13,
    purchasePrice: 2500,
    stock: 180,
    sku: 'OB-AUD-SBW11',
    categorySlug: 'audio-sound',
    images: ['/assets/images/products/sonic_buds_wireless.webp'],
    tags: ['earbuds', 'wireless', 'sonic', 'bass'],
    attributes: [{ key: 'Battery with Case', value: '28 hours' }, { key: 'Bluetooth', value: 'v5.3' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Tempo ANC Headphones',
    slug: 'tempo-anc-headphones',
    description: 'Over-ear active noise cancelling headphones. Block out ambient noise completely and enjoy crisp highs and deep lows.',
    price: 12000,
    purchasePrice: 8000,
    stock: 75,
    sku: 'OB-AUD-TAH12',
    categorySlug: 'audio-sound',
    images: ['/assets/images/products/tempo_anc_headphones.webp'],
    tags: ['headphones', 'anc', 'wireless', 'over-ear'],
    attributes: [{ key: 'ANC depth', value: '-40dB' }, { key: 'Battery Life', value: '40 hours' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Echo Pulse Speaker',
    slug: 'echo-pulse-speaker',
    description: 'Take the party anywhere with this portable Bluetooth speaker. Features glowing RGB lights and a robust IPX7 waterproof housing.',
    price: 7500,
    salePrice: 6500,
    discountRate: 13,
    purchasePrice: 4500,
    stock: 100,
    sku: 'OB-AUD-EPS13',
    categorySlug: 'audio-sound',
    images: ['/assets/images/products/echo_pulse_speaker.webp'],
    tags: ['speaker', 'portable', 'bluetooth', 'waterproof'],
    attributes: [{ key: 'Output Power', value: '20W' }, { key: 'IP Rating', value: 'IPX7' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'SoundWave Soundbar',
    slug: 'soundwave-soundbar',
    description: 'Transform your home theater experience with a low-profile premium soundbar offering crystal-clear dialog and deep surround sound.',
    price: 15000,
    purchasePrice: 10000,
    stock: 60,
    sku: 'OB-AUD-SWS14',
    categorySlug: 'audio-sound',
    images: ['/assets/images/products/soundwave_soundbar.webp'],
    tags: ['soundbar', 'home theater', 'speaker', 'soundwave'],
    attributes: [{ key: 'Channels', value: '2.1' }, { key: 'Subwoofer', value: 'Built-in' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Vocal Pro Mic',
    slug: 'vocal-pro-mic',
    description: 'Studio-quality USB microphone designed for creators, podcasters, and streamers. Features a cardioid pick-up pattern and RGB indicators.',
    price: 8800,
    purchasePrice: 5500,
    stock: 90,
    sku: 'OB-AUD-VPM15',
    categorySlug: 'audio-sound',
    images: ['/assets/images/products/vocal_pro_mic.webp'],
    tags: ['microphone', 'podcast', 'streaming', 'usb'],
    attributes: [{ key: 'Pattern', value: 'Cardioid' }, { key: 'Connection', value: 'USB Type-C' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },

  // Category 4: Trendy Fashion Wear (trendy-fashion-wear)
  {
    name: 'Nomad Streetwear Jacket',
    slug: 'nomad-streetwear-jacket',
    description: 'A stylish oversized windbreaker streetwear jacket in classic colors. Features multi-pocket utility design and high-quality premium lining.',
    price: 3500,
    salePrice: 2999,
    discountRate: 14,
    purchasePrice: 1800,
    stock: 120,
    sku: 'OB-FAS-NSJ16',
    categorySlug: 'trendy-fashion-wear',
    images: ['/assets/images/products/nomad_streetwear_jacket.webp'],
    tags: ['jacket', 'streetwear', 'fashion', 'outerwear'],
    attributes: [{ key: 'Material', value: 'Polyester Blend' }, { key: 'Fit', value: 'Oversized' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Classic Denim Overcoat',
    slug: 'classic-denim-overcoat',
    description: 'A timeless blue denim jacket with warm soft lining, perfect for layering over hoodies or t-shirts in chilly weather.',
    price: 4500,
    purchasePrice: 2600,
    stock: 80,
    sku: 'OB-FAS-CDO17',
    categorySlug: 'trendy-fashion-wear',
    images: ['/assets/images/products/classic_denim_overcoat.webp'],
    tags: ['denim', 'jacket', 'fashion', 'classic'],
    attributes: [{ key: 'Fabric', value: '100% Cotton Denim' }, { key: 'Color', value: 'Indigo Blue' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Urban Oversized Hoodie',
    slug: 'urban-oversized-hoodie',
    description: 'Super soft, heavyweight cotton blend hoodie designed for maximum everyday comfort with a clean minimalist silhouette.',
    price: 2800,
    salePrice: 2400,
    discountRate: 14,
    purchasePrice: 1400,
    stock: 150,
    sku: 'OB-FAS-UOH18',
    categorySlug: 'trendy-fashion-wear',
    images: ['/assets/images/products/urban_oversized_hoodie.webp'],
    tags: ['hoodie', 'oversized', 'comfy', 'minimalist'],
    attributes: [{ key: 'GSM', value: '380' }, { key: 'Material', value: 'Cotton Fleece Blend' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Active Dry Fit Jogger',
    slug: 'active-dry-fit-jogger',
    description: 'Breathable, moisture-wicking jogger pants ideal for workouts, running, or casual lounging. Features zippered side pockets.',
    price: 1800,
    purchasePrice: 1000,
    stock: 220,
    sku: 'OB-FAS-ADJ19',
    categorySlug: 'trendy-fashion-wear',
    images: ['/assets/images/products/active_dry_fit_jogger.webp'],
    tags: ['jogger', 'activewear', 'gym', 'sports'],
    attributes: [{ key: 'Stretch', value: '4-Way Stretch' }, { key: 'Pockets', value: 'Zippered' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Minimalist Linen Shirt',
    slug: 'minimalist-linen-shirt',
    description: 'Keep cool in style. Lightweight and breathable pure linen button-up shirt, perfect for warm summer days.',
    price: 2600,
    purchasePrice: 1500,
    stock: 110,
    sku: 'OB-FAS-MLS20',
    categorySlug: 'trendy-fashion-wear',
    images: ['/assets/images/products/minimalist_linen_shirt.webp'],
    tags: ['shirt', 'linen', 'minimalist', 'summer'],
    attributes: [{ key: 'Material', value: '100% Linen' }, { key: 'Fit', value: 'Regular Fit' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // Category 5: Fashion Accessories (fashion-accessories)
  {
    name: 'Aviator Classic Sunglasses',
    slug: 'aviator-classic-sunglasses',
    description: 'Iconic gold-frame aviator sunglasses featuring premium polarized lenses with complete UV400 sun protection.',
    price: 2500,
    purchasePrice: 1200,
    stock: 160,
    sku: 'OB-ACC-ACS21',
    categorySlug: 'fashion-accessories',
    images: ['/assets/images/products/aviator_classic_sunglasses.webp'],
    tags: ['sunglasses', 'aviator', 'polarized', 'uv protection'],
    attributes: [{ key: 'UV Rating', value: 'UV400' }, { key: 'Frame', value: 'Metal' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Vintage Leather Wallet',
    slug: 'vintage-leather-wallet',
    description: 'Handcrafted genuine leather bi-fold wallet. Offers multiple card slots, cash dividers, and RFID blocking technology.',
    price: 1800,
    purchasePrice: 900,
    stock: 140,
    sku: 'OB-ACC-VLW22',
    categorySlug: 'fashion-accessories',
    images: ['/assets/images/products/vintage_leather_wallet.webp'],
    tags: ['wallet', 'leather', 'vintage', 'rfid'],
    attributes: [{ key: 'Material', value: 'Genuine Leather' }, { key: 'RFID Block', value: 'Yes' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Chronograph Premium Watch',
    slug: 'chronograph-premium-watch',
    description: 'A classic men’s chronograph watch featuring a deep blue dial, date display window, and a premium leather strap.',
    price: 12500,
    purchasePrice: 8500,
    stock: 50,
    sku: 'OB-ACC-CPW23',
    categorySlug: 'fashion-accessories',
    images: ['/assets/images/products/chronograph_premium_watch.webp'],
    tags: ['watch', 'chronograph', 'leather', 'analog'],
    attributes: [{ key: 'Movement', value: 'Japanese Quartz' }, { key: 'Strap', value: 'Genuine Leather' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Classic Leather Belt',
    slug: 'classic-leather-belt',
    description: 'A durable and versatile full-grain black leather belt featuring a sleek polished silver-tone buckle.',
    price: 1500,
    purchasePrice: 750,
    stock: 120,
    sku: 'OB-ACC-CLB24',
    categorySlug: 'fashion-accessories',
    images: ['/assets/images/products/classic_leather_belt.webp'],
    tags: ['belt', 'leather', 'black belt', 'classic'],
    attributes: [{ key: 'Width', value: '1.5 inches' }, { key: 'Material', value: 'Full-Grain Leather' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Urban Explorer Backpack',
    slug: 'urban-explorer-backpack',
    description: 'A water-resistant, minimalist everyday laptop backpack featuring dedicated laptop protection and hidden anti-theft compartments.',
    price: 4200,
    purchasePrice: 2500,
    stock: 90,
    sku: 'OB-ACC-UEB25',
    categorySlug: 'fashion-accessories',
    images: ['/assets/images/products/urban_explorer_backpack.webp'],
    tags: ['backpack', 'laptop bag', 'travel', 'anti-theft'],
    attributes: [{ key: 'Capacity', value: '20L' }, { key: 'Fits Laptop', value: 'Up to 15.6 inches' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
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

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Query all categories
    const categoriesList = await Category.find({});
    console.log(`Fetched ${categoriesList.length} categories from DB.`);

    const categoryMap = {};
    categoriesList.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with proper Category ObjectIds
    const finalProducts = productsData.map(p => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }
      const pCopy = { ...p };
      pCopy.categories = [categoryId];
      delete pCopy.categorySlug;
      return pCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);
    insertResult.forEach((prod, i) => {
      console.log(`[Product ${i + 1}] Name: "${prod.name}", SKU: "${prod.sku}"`);
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
