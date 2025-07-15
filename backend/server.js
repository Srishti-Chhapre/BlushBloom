import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // allow credentials (cookies or auth headers)
  })
);

//  Middleware
app.use(express.json()); // Parse JSON request body

//  Routes
app.use('/api/auth', authRoutes);// Auth & profile routes

//  Global error handler (optional for future)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
