import express from 'express';
import { getCartItems, addToCart, removeFromCart, updateCartItem } from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.mw.js';

const router = express.Router();

router.use(authenticate);

router.route('/')
  .get(getCartItems)
  .post(addToCart);

router.route('/:id')
  .delete(removeFromCart)
  .put(updateCartItem);

export default router;