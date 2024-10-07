import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, Star, Filter } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulating API call
    const fetchProducts = async () => {
      // In a real application, you would fetch products from an API
      const mockProducts = [
        { id: 1, name: 'Habesha Dress', price: 129.99, category: 'Dresses', rating: 4.5, image: 'https://example.com/habesha-dress.jpg' },
        { id: 2, name: 'Traditional Scarf', price: 39.99, category: 'Accessories', rating: 4.2, image: 'https://example.com/traditional-scarf.jpg' },
        { id: 3, name: 'Embroidered Shirt', price: 79.99, category: 'Tops', rating: 4.7, image: 'https://example.com/embroidered-shirt.jpg' },
        { id: 4, name: 'Habesha Shoes', price: 89.99, category: 'Footwear', rating: 4.0, image: 'https://example.com/habesha-shoes.jpg' },
        { id: 5, name: 'Traditional Jewelry', price: 59.99, category: 'Accessories', rating: 4.8, image: 'https://example.com/traditional-jewelry.jpg' },
        { id: 6, name: 'Habesha Coffee Set', price: 99.99, category: 'Home', rating: 4.6, image: 'https://example.com/habesha-coffee-set.jpg' },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );
    setFilteredProducts(results.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    }));
  }, [searchTerm, selectedCategory, sortBy, products]);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Our Products
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center md:hidden"
        >
          <Filter size={20} className="mr-2" /> Filters
        </button>

        <div className={`md:flex space-x-4 items-center ${showFilters ? 'block' : 'hidden md:flex'}`}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600 transition-colors">
                    <ShoppingCart size={20} className="mr-2" /> Add to Cart
                  </button>
                  <button className="text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <motion.p
          className="text-center text-gray-600 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          No products found. Try adjusting your filters or search term.
        </motion.p>
      )}
    </div>
  );
};

export default Products;