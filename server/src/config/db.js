import mongoose from 'mongoose';

function resolveMongoUri() {
  return process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.MONGO_URI;
}

export async function connectDB() {
  const uri = resolveMongoUri();

  if (!uri) {
    const msg = 'MONGODB_URI is not set. Add your MongoDB Atlas connection string in Railway Variables.';
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL:', msg);
      console.error('Railway fix: open your API service → Variables tab → Raw Editor → paste MONGODB_URI=... → Save → Redeploy');
      console.error(
        'Env check:',
        `MONGODB_URI=${process.env.MONGODB_URI ? 'set' : 'MISSING'}`,
        `DATABASE_URL=${process.env.DATABASE_URL ? 'set' : 'missing'}`,
        `NODE_ENV=${process.env.NODE_ENV || 'unset'}`
      );
      process.exit(1);
    }
    console.warn('Warning:', msg, 'Using local fallback mongodb://127.0.0.1:27017/apurva_portfolio');
    await mongoose.connect('mongodb://127.0.0.1:27017/apurva_portfolio');
  } else {
    await mongoose.connect(uri);
  }

  console.log('MongoDB connected');
}
