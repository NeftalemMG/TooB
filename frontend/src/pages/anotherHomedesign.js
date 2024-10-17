import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import toobLogo from '../images/toobLogo.png';

import blueCoat from '../images/blueCoat.jpg';
// import brownShirt from '../images/brownShirt.jpg';
import lightOrangePairs from '../images/lightOrangePairs.jpg';
import pinkOnPink from '../images/pinkOnPink.jpg';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: 'Blue Coat', price: 299.99, image: blueCoat, category: 'outerwear' },
    // { id: 2, name: 'Brown Shirt', price: 89.99, image: brownShirt, category: 'tops' },
    { id: 3, name: 'Light Orange Pairs', price: 399.99, image: lightOrangePairs, category: 'sets' },
    { id: 4, name: 'Pink on Pink', price: 249.99, image: pinkOnPink, category: 'sets' },
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">TOOB</Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-800 hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/login" className="text-gray-800 hover:text-blue-600 transition-colors">Login</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/cart">
              <Button variant="outline" size="icon">
                <ShoppingBag className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero relative h-[100vh] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="ethiopianPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <path d="M0 5 L10 5 M5 0 L5 10" stroke="#00000022" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#ethiopianPattern)" />
            </svg>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-800 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <img src={toobLogo} alt="Toob Logo" className="w-[800px] h-auto mb-8 mx-auto" />
              <p className="text-2xl mb-8 max-w-2xl mx-auto">
                Where Habesha tradition intertwines with contemporary fashion
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg shadow-lg">
                Explore Collection
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            initial={{ y: 32 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <svg viewBox="0 0 1440 320" className="w-full h-full">
              <path fill="#FFFFFF" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </motion.div>
        </section>

        <section className="featured-products py-24 bg-white">
          <h2 className="text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Future Fashions
          </h2>
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setActiveTab('all')}
              className={`mx-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              All
            </Button>
            <Button
              onClick={() => setActiveTab('outerwear')}
              className={`mx-2 ${activeTab === 'outerwear' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Outerwear
            </Button>
            <Button
              onClick={() => setActiveTab('tops')}
              className={`mx-2 ${activeTab === 'tops' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Tops
            </Button>
            <Button
              onClick={() => setActiveTab('sets')}
              className={`mx-2 ${activeTab === 'sets' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Sets
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">{product.name}</h3>
                    <p className="text-xl text-blue-300 font-bold mb-4">${product.price}</p>
                    <Button className="bg-white text-gray-800 hover:bg-blue-100">Add to Cart</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="newsletter py-24 px-4 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Join the Fashion Revolution
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              Subscribe for exclusive access to our latest designs and special offers
            </p>
            <form className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg w-full md:w-auto"
              />
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
        </section>

      </main>

      <footer className="bg-gray-800 py-12 px-4 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Toob</h3>
            <p>Toob is a modern fashion brand inspired by Habesha culture, blending traditional designs with contemporary styles.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/products" className="hover:text-blue-300">Products</Link></li>
              <li><Link to="/about" className="hover:text-blue-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Toob Habesha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

