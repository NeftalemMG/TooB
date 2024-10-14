import express from 'express';
import { protectRoute } from "../middleware/auth.mw.js";
import { checkoutSuccess, createCheckoutSession, getOrderDetails  } from "../controllers/payment_controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.get("/order-details", protectRoute, getOrderDetails);

export { router };