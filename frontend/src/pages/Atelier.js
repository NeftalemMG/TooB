import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Eye, Shirt } from 'lucide-react';
import Button from '../components/ui/Button';
import TOOBLogo from '../components/TOOBLogo';


import makingClothesImage from '../images/Making The Clothes.png';
import greenTotemBagImage from '../images/GreenTotemBag.png';
import makingThreadsImage from '../images/Making Threads 2.png';
import greenEdiatShoesImage from '../images/GreenEdiatShoes.jpeg';
import greenGoldScargImage from '../images/GreenGoldScarg.jpeg';
import tailorIconImage from '../images/tailor-icon.png';
// import danglingClothesImage from '../images/dangling-clothes.png';


const Atelier = () => {
  const craftSteps = [
    { icon: <Shirt className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />, title: 'Material Selection', description: 'We source the finest Ethiopian cotton and leather.' },
    { icon: <Ruler className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />, title: 'Pattern Making', description: 'Our designers create unique patterns inspired by Habesha culture.' },
    { icon: <Scissors className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />, title: 'Precision Cutting', description: 'Expert artisans cut each piece with meticulous care.' },
    { icon: <Eye className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />, title: 'Quality Control', description: 'Every item undergoes rigorous inspection to ensure perfection.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-2 sm:py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <TOOBLogo width={80} height={32} className="sm:w-[120px] sm:h-[48px]" />
            </Link>
            <nav className="hidden lg:flex space-x-4 sm:space-x-8">
              {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm sm:text-base text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 sm:h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <div className="relative h-64 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <img src={makingClothesImage} alt="TOOB Atelier" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">Where Tradition Meets Innovation</h2>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12 relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-900">Our Craftsmanship</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {craftSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.icon}
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-indigo-800">{step.title}</h4>
                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Scissors className="w-full h-full text-indigo-500" />
          </motion.div>
        </section>

        <section className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-indigo-900">The Art of Handcrafting</h3>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-700">
                At TOOB, we believe in the power of human touch. Each piece in our collection is lovingly crafted by skilled artisans who have honed their craft over generations. This dedication to handcrafting ensures that every TOOB item is not just a product, but a work of art.
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                Our atelier is where traditional Ethiopian craftsmanship meets modern luxury. Here, ancient techniques are preserved and reimagined, resulting in pieces that are both timeless and contemporary.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img src={greenTotemBagImage} alt="Handcrafted Bag" className="rounded-2xl sm:rounded-3xl shadow-lg" />
            </motion.div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-900">Our Signature Techniques</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Traditional Weaving", image: makingThreadsImage, content: "Our scarves and fabrics are woven using time-honored Ethiopian techniques, creating intricate patterns that tell a story." },
              { title: "Leather Crafting", image: greenEdiatShoesImage, content: "We use premium Ethiopian leather, known for its durability and beauty, to create our luxurious shoes and bags." },
              { title: "Embroidery", image: greenGoldScargImage, content: "Our artisans use both traditional and modern embroidery techniques to add unique, eye-catching details to our pieces." }
            ].map((technique, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={technique.image} alt={technique.title} className="w-full h-40 sm:h-48 object-cover rounded-xl sm:rounded-2xl mb-3 sm:mb-4" />
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-indigo-800">{technique.title}</h4>
                <p className="text-sm sm:text-base text-gray-600">{technique.content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-indigo-900">Experience TOOB Craftsmanship</h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700">
            Every TOOB piece is a testament to the skill, passion, and heritage of our artisans. Explore our collections to experience the beauty of Ethiopian craftsmanship.
          </p>
          <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-lg transform hover:scale-105">
            View Our Collections
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 text-white py-8 sm:py-12 mt-8 sm:mt-16">
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

export default Atelier;