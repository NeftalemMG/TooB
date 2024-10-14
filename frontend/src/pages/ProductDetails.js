import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';
import { ShoppingBag, Heart, Star, Truck, RefreshCw, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product. Please try again.');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    try {
      await addToCart({ ...product, size: selectedSize, quantity });
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-earth-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center bg-sand-50">Product not found</div>;

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-earth-900 text-sand-100 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold">TOOB</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-earth-900">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
              <span className="ml-2 text-earth-600">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl text-terracotta-600 mb-6">${product.price.toFixed(2)}</p>
            <p className="text-lg mb-8 text-earth-700">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-earth-800">Size</h3>
              <div className="flex space-x-4">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 rounded-full ${
                      selectedSize === size ? 'bg-earth-800 text-white' : 'bg-white text-earth-800 border border-earth-300'
                    } hover:bg-earth-800 hover:text-white transition-colors duration-300`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-earth-800">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  className="w-10 h-10 rounded-full bg-earth-200 text-earth-800 hover:bg-earth-300 transition-colors duration-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-xl text-earth-800">{quantity}</span>
                <button
                  className="w-10 h-10 rounded-full bg-earth-200 text-earth-800 hover:bg-earth-300 transition-colors duration-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <button
                className="flex-1 bg-terracotta-500 text-white py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2" />
                Add to Cart
              </button>
              <button
                className={`flex-1 py-3 rounded-full transition-colors duration-300 flex items-center justify-center ${
                  isInWishlist(product._id)
                    ? 'bg-earth-800 text-white hover:bg-earth-900'
                    : 'bg-white text-earth-800 border border-earth-300 hover:bg-earth-100'
                }`}
                onClick={handleWishlist}
              >
                <Heart className="mr-2" />
                {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            <div className="space-y-4">
              {[
                { icon: Truck, title: 'Free Shipping', content: 'On orders over $100' },
                { icon: RefreshCw, title: 'Easy Returns', content: '30-day return policy' },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="w-6 h-6 mr-4 text-terracotta-500" />
                  <div>
                    <h3 className="font-semibold text-earth-800">{item.title}</h3>
                    <p className="text-earth-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="mt-12 space-y-6">
          {[
            { title: 'Product Details', content: product.details },
            { title: 'Size & Fit', content: product.sizeFit },
            { title: 'Shipping & Returns', content: product.shippingReturns },
          ].map((section, index) => (
            <div key={index} className="border-b border-earth-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleSection(section.title)}
              >
                <h3 className="text-xl font-semibold text-earth-800">{section.title}</h3>
                {expandedSection === section.title ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === section.title && (
                <p className="mt-4 text-earth-600">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-earth-900 text-sand-100 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">TOOB</h2>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 TOOB habesha. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showSizeError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-earth-900">Please Select a Size</h3>
              <p className="text-earth-600 mb-6">Please select a size before adding the item to your cart.</p>
              <button
                onClick={() => setShowSizeError(false)}
                className="bg-terracotta-500 text-white px-4 py-2 rounded-full hover:bg-terracotta-600 transition-colors duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;