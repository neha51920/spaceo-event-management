import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app: Application = express();
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow only your frontend URL (adjust if needed)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions)); 


// Safely parse PORT to a number
const PORT = Number(process.env.PORT) || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

// Check MongoDB URI exists
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MongoDB connection URI (MONGO_URI) not found in .env');
  process.exit(1); // Exit app if not found
}

// mongodb connect and server start
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error('❌ MongoDB connection failed:', error));
