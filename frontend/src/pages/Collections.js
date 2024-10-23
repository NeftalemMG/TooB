import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { ShoppingBag, Heart, Search, Filter, X, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import TOOBLogo from '../components/TOOBLogo';
import Button from '../components/ui/Button';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products', { 
        params: { ...filters, search: searchTerm } 
      });
      setProducts(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({...prevFilters, [key]: value}));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Add a toast notification here
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
    // Add a toast notification here
  };
const ProductCard = ({ product }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`relative overflow-hidden rounded-lg shadow-lg bg-white ${
      view === 'grid' ? 'flex flex-col' : 'flex flex-row h-auto sm:h-64'
    }`}
  >
    <div className={`relative ${view === 'grid' ? 'w-full aspect-w-1 aspect-h-1' : 'w-full sm:w-1/3 h-64 sm:h-full'}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Button 
          onClick={() => navigate(`/product/${product._id}`)}
          className="bg-white text-indigo-600 px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300"
        >
          View Details
        </Button>
      </div>
    </div>
    <div className={`p-4 flex flex-col justify-between ${view === 'grid' ? '' : 'w-full sm:w-2/3'}`}>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-indigo-600 font-bold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button 
          onClick={() => handleAddToCart(product)}
          className="bg-indigo-600 text-white px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button 
          onClick={() => handleWishlist(product)}
          className={`p-2 rounded-full ${
            isInWishlist(product._id) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border border-pink-500'
          } hover:bg-pink-600 hover:text-white transition-colors duration-300`}
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  </motion.div>
);

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center mb-2 sm:mb-0">
            <TOOBLogo width={80} height={32} className="sm:w-[120px] sm:h-[48px]" />
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-6 w-full sm:w-auto justify-end">
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <Link to="/cart">
              <Button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors duration-300">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors duration-300">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4 sm:mb-0">Our Collections</h1>
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
          <Button 
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md text-sm sm:text-base mb-2 sm:mb-0"
          >
            {view === 'grid' ? <List className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Grid className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
            {view === 'grid' ? 'List' : 'Grid'}
          </Button>
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md text-sm sm:text-base"
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="ml-2 w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />}
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Sort By</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm sm:text-base" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <motion.div layout className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 sm:gap-8`}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </main>

    <footer className="bg-indigo-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <TOOBLogo width={80} height={32} className="text-white sm:w-[120px] sm:h-[48px]" />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm sm:text-base">&copy; 2024 TOOB Habesha. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
};

export default Collections;