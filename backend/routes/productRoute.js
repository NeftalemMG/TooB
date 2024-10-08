import express from 'express';
import { 
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    deleteProduct,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeatProd
 } 
from '../controllers/product_controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.mw.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/recommendations', getRecommendedProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', protectRoute, adminRoute, createProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeatProd);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);


export { router }; 