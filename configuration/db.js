import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL, DB_NAME } = process.env;

const connectionString = `${DB_URL}/${DB_NAME}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
