import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, items } = req.body;

    // Create an order
    const order = new Order({
      user: req.user._id,
      products: items.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: amount,
      stripeSessionId: '' // You can update this after creating the session
    });
    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { orderId: order._id.toString() }
    });

    // Update the order with the Stripe session ID
    order.stripeSessionId = paymentIntent.id;
    await order.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id.toString()
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent', details: error.message });
  }
};