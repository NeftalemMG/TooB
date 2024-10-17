import { loadStripe } from '@stripe/stripe-js';

console.log('Stripe Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);