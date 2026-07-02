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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What is the warranty policy for electronics and gadgets purchased on OnBazar?',
    answer: 'All electronic devices and smart gadgets come with a manufacturer warranty ranging from 6 months to 2 years, depending on the brand. The warranty details are listed on each product details page.',
    order: 1,
    isActive: true,
  },
  {
    question: 'Can I exchange the size of a fashion product if it does not fit?',
    answer: 'Yes, we offer a hassle-free size exchange within 7 days of delivery. The item must be unused, with all original tags intact and in its original packaging. Contact our support team to initiate an exchange.',
    order: 2,
    isActive: true,
  },
  {
    question: 'What are the delivery times and charges for nationwide shipping?',
    answer: 'We deliver all over Bangladesh. Inside Dhaka, delivery takes 24-48 hours (Charge: ৳60), and outside Dhaka, it takes 3-5 business days (Charge: ৳120). Enjoy free shipping on orders above ৳2,000.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Are the electronics and fashion items sold on OnBazar authentic?',
    answer: 'Absolutely! We guarantee 100% authenticity for all our products. We source directly from authorized distributors and official brand stores to ensure you receive genuine electronic devices and apparel.',
    order: 4,
    isActive: true,
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support Cash on Delivery (COD) nationwide. We also accept online payments via bKash, Nagad, Rocket, Visa, Mastercard, and other major credit/debit cards through our secure payment gateway.',
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

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i + 1}] Question: "${f.question}"`);
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
