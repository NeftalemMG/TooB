import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as authRoutes } from './routes/authRoute.js';
import { router as productRoutes } from './routes/productRoute.js';
// import { router as cartRoutes } from './routes/cartRoutes.js';
import { router as couponRoutes } from './routes/couponRoute.js';
// import { router as paymentRoutes } from './routes/paymentRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoute.js';
import orderRoutes from './routes/orderRoute.js';

import { connectDB } from './lib/db.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: "10mb"}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
    connectDB();
});