import express from 'express';
import { getOrderById } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', authenticate, getOrderById);

export default router;