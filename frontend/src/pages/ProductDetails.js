import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';
import { ShoppingBag, Heart, Star, Truck, RefreshCw, ChevronDown, ChevronUp, ArrowLeft, Share2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import TOOBLogo from '../components/TOOBLogo';
import Button from '../components/ui/Button';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
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

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          {/* <Button
            onClick={() => navigate('/collections')}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to Collections
          </Button> */}
        </div>
      </div>
    );
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">Product not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <TOOBLogo width={120} height={48} />
            </Link>
            <nav className="hidden lg:flex space-x-8">
              {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors duration-300">
                <ShoppingBag className="w-6 h-6" />
              </Button>
              <Button className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors duration-300">
                <Heart className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* <Link to="/collections" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-300">
          <ArrowLeft size={20} className="mr-2" />
          Back to Collections
        </Link> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-3xl shadow-xl"
          >
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-2xl object-cover" />
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>
              <Button onClick={handleShare} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-3xl font-bold text-indigo-600 mb-6">${product.price.toFixed(2)}</p>
            <p className="text-lg mb-8 text-gray-700">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Size</h3>
              <div className="flex space-x-4">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <Button
                    key={size}
                    className={`w-12 h-12 rounded-full ${
                      selectedSize === size ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-300'
                    } hover:bg-indigo-600 hover:text-white transition-colors duration-300`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  className="w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-xl text-gray-800 font-medium">{quantity}</span>
                <Button
                  className="w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <Button
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2" />
                Add to Cart
              </Button>
              <Button
                className={`flex-1 py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center ${
                  isInWishlist(product._id)
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                onClick={handleWishlist}
              >
                <Heart className="mr-2" />
                {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { icon: Truck, title: 'Free Shipping', content: 'On orders over $100' },
                { icon: RefreshCw, title: 'Easy Returns', content: '30-day return policy' },
              ].map((item, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <item.icon className="w-8 h-8 mr-4 text-indigo-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                onClick={() => toggleSection(section.title)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                {expandedSection === section.title ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-indigo-600" />}
              </button>
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-4 text-gray-600 pb-4">{section.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <TOOBLogo width={120} height={48} className="text-white" />
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Please Select a Size</h3>
              <p className="text-gray-600 mb-6">Please select a size before adding the item to your cart.</p>
              <Button
                onClick={() => setShowSizeError(false)}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Share This Product</h3>
              <div className="flex justify-around mb-6">
                <Button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Button>
                <Button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </Button>
              </div>
              <Button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;