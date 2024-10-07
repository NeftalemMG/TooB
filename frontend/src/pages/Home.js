import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown, Search, User, Globe, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const products = [
    { id: 1, name: 'BG Kimono', price: 199.99, image: require('../images/BG Kimono Dress.png'), category: 'outerwear' },
    { id: 2, name: 'Timeless Brown Shirt', price: 99.99, image: require('../images/brownShirt.jpg'), category: 'tops' },
    { id: 3, name: 'Sunset Orange Ensemble', price: 999.99, image: require('../images/lightOrangePairs.jpg'), category: 'sets' },
    { id: 4, name: 'Men Pink Linen', price: 19.99, image: require('../images/Men Pink Linen.png'), category: 'sets' },
    { id: 5, name: 'LY Full Set', price: 499.99, image: require('../images/LY Fullset.png'), category: 'dresses' },
    { id: 6, name: 'BLWH Dresses.png', price: 349.99, image: require('../images/BL:WH Dresses.png'), category: 'outerwear' },
  ];


  const categories = [
    { name: 'Outerwear', image: require('../images/blueCoat.jpg') },
    { name: 'Dresses', image: require('../images/Light Green Fabric Dress.png') },
    { name: 'Accessories', image: require('../images/WG Head Beads.png') },
    { name: 'Footwear', image: require('../images/GreenEdiatShoes.jpeg') },
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-gray-900 tracking-tight">TOOB</Link>

          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/collections" className="text-gray-800 hover:text-blue-600 transition-colors">Collections</Link>
            <Link to="/our-story" className="text-gray-800 hover:text-blue-600 transition-colors">Our Story</Link>
            <Link to="/atelier" className="text-gray-800 hover:text-blue-600 transition-colors">Atelier</Link>
            <Link to="/sustainability" className="text-gray-800 hover:text-blue-600 transition-colors">Sustainability</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => handleNavigation('/login')}>
              <User className="h-5 w-5" />
            </Button>
            {/* <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => handleNavigation('/language')}>
              <Globe className="h-5 w-5" />
            </Button> */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleNavigation('/cart')}>
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="mt-8 space-y-4">
                <Link to="/" className="block text-lg font-medium text-gray-900 hover:text-blue-600">Home</Link>
                <Link to="/collections" className="block text-lg font-medium text-gray-900 hover:text-blue-600">Collections</Link>
                <Link to="/our-story" className="block text-lg font-medium text-gray-900 hover:text-blue-600">Our Story</Link>
                <Link to="/atelier" className="block text-lg font-medium text-gray-900 hover:text-blue-600">Atelier</Link>
                <Link to="/sustainability" className="block text-lg font-medium text-gray-900 hover:text-blue-600">Sustainability</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">

      {location.pathname === '/' && (
          <>

        <section className="hero relative h-[80vh] overflow-hidden bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            className="h-full"
          >
            <SwiperSlide>
              <div className="relative h-full bg-cover bg-center" style={{backgroundImage: `url(${require('../images/GuyWIthTheHorse.jpg')})`}}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Elegance Redefined</h1>
                    <p className="text-xl md:text-2xl mb-8">Where Habesha heritage meets modern luxury</p>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
                      Explore Fall Collection
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* <div className="relative h-full bg-cover bg-center" style={{backgroundImage: "url('../images/brownShirt.jpg')"}}> */}
              <div className="relative h-full bg-cover bg-center" style={{backgroundImage: `url(${require('../images/brownShirt.jpg')})`}}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Timeless Craftsmanship</h1>
                    <p className="text-xl md:text-2xl mb-8">Discover our artisanal techniques</p>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
                      Visit Our Atelier
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>


<section className="featured-categories py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Curated Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg h-80"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Shop Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        <section className="featured-products py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Signature Pieces</h2>
            <div className="flex justify-center mb-8 space-x-4 overflow-x-auto pb-4">
              {['all', 'outerwear', 'tops', 'sets', 'dresses'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  className="capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price.toLocaleString()}</p>
              <div className="flex justify-between items-center">
                <Button onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}>Add to Cart</Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); /* Add to wishlist logic */ }}>
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
          </div>
        </section>

        <section className="sustainability py-24 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Commitment to Sustainability</h2>
                <p className="text-xl mb-8">At Toob, we believe in preserving our planet while celebrating our heritage. Our sustainable practices ensure that every piece not only looks good but feels good too.</p>
                <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
                  Learn More
                </Button>
              </div>
              <div className="relative h-96">
                {/* <img src="/images/MKTNG 4.jpg" alt="Sustainable Fashion" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl" /> */}
                <img src={require('../images/MKTNG 4.jpg')} alt="Sustainable Fashion" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl" />

              </div>
            </div>
          </div>
        </section>

        <section className="newsletter py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Toob Family</h2>
              <p className="text-xl mb-8">Subscribe for exclusive access to new collections, special offers, and Habesha fashion insights.</p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white text-gray-900 placeholder-gray-500 w-full sm:w-96"
                /> */}
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
        </>
        )}





      </main>

      <footer className="bg-gray-900 py-12 px-4 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Toob</h3>
            <p>Elevating Habesha heritage through contemporary luxury fashion.</p>
          </div>
          <div>
          <h3 className="text-xl font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-blue-300">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-300">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-blue-300">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-blue-300">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white hover:text-blue-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="text-sm">© 2024 Toob Luxury. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronDown className="h-6 w-6 transform rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;