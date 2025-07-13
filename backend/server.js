import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // React frontend origin
  credentials: true // if you're using cookies/auth headers (optional)
}));
app.use(express.json())

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
