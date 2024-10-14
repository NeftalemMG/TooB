import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown, Search, User, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import axios from '../api/axios';
import Button from '../components/ui/Button';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import MKTNG4 from '../images/MKTNG 4.jpg';
import MKTNG5 from '../images/MKTNG 5.jpg';
import MKTNG6 from '../images/MKTNG 6.jpg';
import CatchScene from '../images/CatchScene.jpg';
import toobLogo from '../images/toobLogo.png';

const slides = [
  { image: MKTNG4, title: "Nomadic Elegance", subtitle: "Where heritage meets the horizon" },
  { image: MKTNG5, title: "Timeless Style", subtitle: "Crafted for the modern wanderer" },
  { image: CatchScene, title: "Sustainable Luxury", subtitle: "Ethical fashion for a better world" },
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
    <div className="min-h-screen bg-sand-50 text-earth-900">


<header className="bg-earth-900 text-sand-100 py-4 fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">TOOB</Link>
      <nav className="hidden lg:flex space-x-8">
        {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase().replace(' ', '-')}`}
            className="text-sand-100 hover:text-terracotta-300 transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full bg-sand-100 text-earth-900 hover:bg-terracotta-500 hover:text-sand-100 transition-colors duration-300">
          <Search size={20} />
        </button>
        <Link to="/cart" className="p-2 rounded-full bg-sand-100 text-earth-900 hover:bg-terracotta-500 hover:text-sand-100 transition-colors duration-300">
          <ShoppingBag size={20} />
        </Link>
      </div>
    </div>
  </div>
</header>

      <main>


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
                        className="bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors duration-300 text-lg px-10 py-4"
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
        <section className="py-20 bg-sand-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    <div className="absolute top-0 left-0 bg-terracotta-500 text-white px-3 py-1 rounded-br-lg">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-terracotta-500 text-lg mb-4">${product.price.toFixed(2)}</p>
                    <p className="text-earth-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <Button onClick={() => navigate(`/product/${product._id}`)} className="bg-earth-800 text-sand-100 hover:bg-earth-900 transition-colors duration-300">
                        View Product
                      </Button>
                      <button className="p-2 bg-terracotta-100 rounded-full hover:bg-terracotta-200 transition-colors duration-300">
                        <ShoppingBag className="w-5 h-5 text-terracotta-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" onClick={() => navigate('/collections')} className="bg-earth-800 text-sand-100 hover:bg-earth-900 transition-colors duration-300">
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-earth-900 text-sand-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Our Story</h2>
                <p className="text-lg mb-8">TOOB is more than just clothing; it's a journey through time and culture. Our designs weave together the rich tapestry of nomadic heritage with the spirit of modern wanderlust, creating pieces that tell a story with every thread.</p>
                <Button size="lg" onClick={() => navigate('/our-story')} className="bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors duration-300">
                  Discover Our Journey
                </Button>
              </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img src={MKTNG6} alt="Our Story" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            </div>
          </div>
        </section>

        {/* Sustainable Fashion Section */}
        <section className="py-20 bg-sand-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">Sustainable Fashion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Ethical Sourcing', 'Eco-Friendly Materials', 'Zero Waste'].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-8 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-4">{['🌿', '♻️', '🌍'][index]}</div>
                  <h3 className="text-2xl font-semibold mb-4">{item}</h3>
                  <p className="text-earth-700">Our commitment to sustainable fashion drives every aspect of our production process, ensuring a positive impact on both people and the planet.</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" onClick={() => navigate('/sustainability')} className="bg-earth-800 text-sand-100 hover:bg-earth-900 transition-colors duration-300">
                Learn More About Our Practices
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-terracotta-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">Join Our Community</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-center mb-8">Subscribe to our newsletter for exclusive access to new collections, nomadic inspirations, and sustainable fashion insights.</p>
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow py-3 px-4 bg-white text-earth-900 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
                <Button type="submit" className="bg-earth-800 text-sand-100 hover:bg-earth-900 transition-colors duration-300 py-3 px-8">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-earth-900 text-sand-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TOOB</h3>
              <p className="mb-4">Nomadic luxury for the modern wanderer.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <a key={social} href={`https://${social}.com/toob`} target="_blank" rel="noopener noreferrer" className="text-sand-100 hover:text-terracotta-300 transition-colors duration-300">
                    <img src={`/images/${social}-icon.svg`} alt={`${social} icon`} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            {['Shop', 'About', 'Customer Care', 'Legal'].map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {['Collections', 'New Arrivals', 'Best Sellers', 'Sale'].map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sand-300 hover:text-terracotta-300 transition-colors duration-300">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-sand-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 TOOB Nomadic Luxury. All rights reserved.</p>
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
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-earth-900 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <X className="h-8 w-8 text-sand-100" />
                </Button>
              </div>
              <nav className="space-y-6">
                {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-2xl font-medium text-sand-100 hover:text-terracotta-500 transition-colors duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <div className="mt-12 pt-8 border-t border-sand-800">
                <Button 
                  className="w-full bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors duration-300 py-3 text-lg mb-4"
                  onClick={() => {
                    handleNavigation('/login');
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-sand-100 text-earth-900 hover:bg-sand-200 transition-colors duration-300 py-3 text-lg"
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
            className="fixed inset-0 bg-earth-900 bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-sand-100 p-6 rounded-lg shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for nomadic treasures..."
                  className="w-full p-4 bg-sand-200 border-2 border-earth-700 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-earth-900 text-lg"
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
            className="fixed bottom-8 right-8 bg-terracotta-500 text-white p-3 rounded-full shadow-lg hover:bg-terracotta-600 transition-colors duration-300"
          >
            <ChevronDown className="h-6 w-6 transform rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;




