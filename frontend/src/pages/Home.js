import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { ShoppingBag, Menu, X, ChevronDown, Search, User, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import axios from '../api/axios';
import Button from '../components/ui/Button';
import TOOBLogo from '../components/TOOBLogo';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images (assuming they exist)
import MKTNG5 from '../images/MKTNG 5.jpg';
import MKTNG9 from '../images/MKTNG 9.jpeg';
import CatchScene from '../images/CatchScene.jpeg';

const slides = [
  { image: MKTNG5, title: "Nomadic Elegance", subtitle: "Where heritage meets the horizon" },
  { image: MKTNG9, title: "Timeless Style", subtitle: "Crafted for the modern wanderer" },
  { image: CatchScene, title: "Sustainable Luxury", subtitle: "Ethical fashion for a better world" },
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    fetchFeaturedProducts();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/products/featured');
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    navigate(`/collections?search=${encodeURIComponent(searchTerm)}`);
    setSearchOpen(false);
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="20" fill="#4F46E5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>



<header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 fixed top-0 left-0 right-0 z-50">
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors duration-300"
              >
                <Search size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors duration-300"
              >
                <ShoppingBag size={20} />
              </motion.button>
              {user ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4"
                >
                  <span className="text-indigo-600 font-semibold">{user.name}</span>
                  <Button
                    onClick={logout}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Button>
                </motion.div>
              ) : (
                <Link to="/login">
                  <Button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
                    <User size={20} />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Slider (Unchanged) */}
        <section className="relative h-screen">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            effect="fade"
            className="h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 tracking-tighter">{slide.title}</h1>
                      <p className="text-xl md:text-2xl lg:text-3xl mb-10">{slide.subtitle}</p>
                      <Button 
                        size="lg" 
                        onClick={() => navigate('/collections')} 
                        className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 text-lg px-10 py-4 rounded-full shadow-lg"
                      >
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-white bg-opacity-90">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-indigo-900">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-96">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-indigo-600 text-xl mb-4 font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <Button onClick={() => navigate(`/product/${product._id}`)} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-6 py-2">
                        View Product
                      </Button>
                      <button className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors duration-300">
                        <Heart className="w-6 h-6 text-pink-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button size="lg" onClick={() => navigate('/collections')} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-10 py-4 text-lg shadow-lg">
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Our Story</h2>
                <p className="text-lg mb-8 leading-relaxed">TOOB is more than just clothing; it's a journey through time and culture. Our designs weave together the rich tapestry of nomadic heritage with the spirit of modern wanderlust, creating pieces that tell a story with every thread.</p>
                <Button size="lg" onClick={() => navigate('/our-story')} className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors duration-300 rounded-full px-10 py-4 text-lg shadow-lg">
                  Discover Our Journey
                </Button>
              </div>
              <div className="relative h-96 overflow-hidden rounded-3xl shadow-2xl">
                <img src={MKTNG9} alt="Our Story" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            </div>
          </div>
        </section>

        {/* Sustainable Fashion Section */}
        <section className="py-20 bg-white bg-opacity-90">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-indigo-900">Sustainable Fashion</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Ethical Sourcing', 'Eco-Friendly Materials', 'Zero Waste'].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -10 }}
                >
                  <div className="text-6xl mb-6">{['🌿', '♻️', '🌍'][index]}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-900">{item}</h3>
                  <p className="text-gray-700">Our commitment to sustainable fashion drives every aspect of our production process, ensuring a positive impact on both people and the planet.</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button size="lg" onClick={() => navigate('/sustainability')} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-10 py-4 text-lg shadow-lg">
                Learn More About Our Practices
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">Join Our Community</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-center mb-8">Subscribe to our newsletter for exclusive access to new collections, nomadic inspirations, and sustainable fashion insights.</p>
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow py-4 px-6 bg-white text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg"
                />
                <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-10 py-4 text-lg shadow-lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <TOOBLogo width={120} height={48} className="text-white" />
              <p className="mt-4 mb-4">Nomadic luxury for the modern wanderer.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <a key={social} href={`https://${social}.com/toob`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-300 transition-colors duration-300">
                    <img src={`/images/${social}-icon.svg`} alt={`${social} icon`} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-indigo-300 transition-colors duration-300">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p>Bole Square, Addis Ababa</p>
              <p>Email: info@toob.com</p>
              <p>Phone: +251979126678 </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 TOOB Habesha. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <X className="h-8 w-8 text-gray-900" />
                </Button>
              </div>
              <nav className="space-y-6">
                {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-2xl font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Button 
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 py-3 text-lg mb-4 rounded-full"
                  onClick={() => {
                    handleNavigation('/login');
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors duration-300 py-3 text-lg rounded-full"
                  onClick={() => {
                    setSearchOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for nomadic treasures..."
                  className="w-full p-4 bg-gray-100 border-2 border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-lg"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            <ChevronDown className="h-6 w-6 transform rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;