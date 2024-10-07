import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Eye, Shirt } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';

const Atelier = () => {
  const craftSteps = [
    { icon: <Shirt className="h-12 w-12 mb-4" />, title: 'Material Selection', description: 'We source the finest Ethiopian cotton and leather.' },
    { icon: <Ruler className="h-12 w-12 mb-4" />, title: 'Pattern Making', description: 'Our designers create unique patterns inspired by Habesha culture.' },
    { icon: <Scissors className="h-12 w-12 mb-4" />, title: 'Precision Cutting', description: 'Expert artisans cut each piece with meticulous care.' },
    { icon: <Eye className="h-12 w-12 mb-4" />, title: 'Quality Control', description: 'Every item undergoes rigorous inspection to ensure perfection.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-md py-4 ">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TOOB Atelier</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={require('../images/Making The Clothes.png')} alt="TOOB Atelier" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Where Tradition Meets Innovation</h2>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Craftsmanship</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.icon}
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4">The Art of Handcrafting</h3>
              <p className="text-lg mb-4">
                At TOOB, we believe in the power of human touch. Each piece in our collection is lovingly crafted by skilled artisans who have honed their craft over generations. This dedication to handcrafting ensures that every TOOB item is not just a product, but a work of art.
              </p>
              <p className="text-lg">
                Our atelier is where traditional Ethiopian craftsmanship meets modern luxury. Here, ancient techniques are preserved and reimagined, resulting in pieces that are both timeless and contemporary.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <img src={require('../images/GreenTotemBag.png')} alt="Handcrafted Bag" className="rounded-lg shadow-lg" />
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Signature Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={require('../images/Making Threads 2.png')} alt="Traditional Weaving" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Traditional Weaving</h4>
              <p>Our scarves and fabrics are woven using time-honored Ethiopian techniques, creating intricate patterns that tell a story.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={require('../images/GreenEdiatShoes.jpeg')} alt="Leather Crafting" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Leather Crafting</h4>
              <p>We use premium Ethiopian leather, known for its durability and beauty, to create our luxurious shoes and bags.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={require('../images/GreenGoldScarg.jpeg')} alt="Embroidery" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Embroidery</h4>
              <p>Our artisans use both traditional and modern embroidery techniques to add unique, eye-catching details to our pieces.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4">Experience TOOB Craftsmanship</h3>
          <p className="text-lg mb-6">
            Every TOOB piece is a testament to the skill, passion, and heritage of our artisans. Explore our collections to experience the beauty of Ethiopian craftsmanship.
          </p>
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
            View Our Collections
          </Button>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Atelier;