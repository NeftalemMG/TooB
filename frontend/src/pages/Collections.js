import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Filter } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const collections = [
    { name: 'Summer Breeze', image: require('../images/SummerJacket.png'), category: 'Seasonal' },
    { name: 'Urban Chic', image: require('../images/blueCoat.jpg'), category: 'Casual' },
    { name: 'Elegant Evenings', image: require('../images/NexelaDress.jpg'), category: 'Formal' },
    { name: 'Timeless Classics', image: require('../images/brownShirt.jpg'), category: 'Casual' },
    { name: 'Vibrant Hues', image: require('../images/lightOrangePairs.jpg'), category: 'Seasonal' },
    { name: 'Monochrome Magic', image: require('../images/pinkOnPink.jpg'), category: 'Formal' },
  ];

  const filteredCollections = activeFilter === 'All' 
    ? collections 
    : collections.filter(collection => collection.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">TOOB Collections</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            className="h-96 rounded-lg overflow-hidden"
          >
            {collections.map((collection, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full bg-cover bg-center" style={{backgroundImage: `url(${collection.image})`}}>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4">{collection.name}</h2>
                      <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Our Collections</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <select
                className="bg-white border border-gray-300 rounded-md py-2 px-4"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option>All</option>
                <option>Seasonal</option>
                <option>Casual</option>
                <option>Formal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={collection.image} alt={collection.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-gray-600 mb-4">{collection.category}</p>
                  <Button className="w-full">View Collection</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Collections;