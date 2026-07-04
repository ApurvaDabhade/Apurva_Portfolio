import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const msg = 'MONGODB_URI is not set. Add your MongoDB Atlas connection string in Railway/Vercel environment variables.';
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL:', msg);
      process.exit(1);
    }
    console.warn('Warning:', msg, 'Using local fallback mongodb://127.0.0.1:27017/apurva_portfolio');
    await mongoose.connect('mongodb://127.0.0.1:27017/apurva_portfolio');
  } else {
    await mongoose.connect(uri);
  }

  console.log('MongoDB connected');
}
