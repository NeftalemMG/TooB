import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Recycle, Leaf, Heart, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';

const Sustainability = () => {
  const sustainabilityPillars = [
    { icon: <Leaf className="h-12 w-12 mb-4" />, title: 'Eco-Friendly Materials', description: 'We prioritize organic and sustainably sourced materials in all our products.' },
    { icon: <Recycle className="h-12 w-12 mb-4" />, title: 'Circular Fashion', description: 'Our designs focus on longevity and recyclability to minimize waste.' },
    { icon: <Heart className="h-12 w-12 mb-4" />, title: 'Ethical Production', description: 'We ensure fair wages and safe working conditions for all our artisans.' },
    { icon: <Users className="h-12 w-12 mb-4" />, title: 'Community Support', description: 'We invest in local communities to preserve traditional craftsmanship.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">TOOB Sustainability</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={require('../images/MKTNG 6.jpg')} alt="Sustainable Fashion" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Fashion with a Conscience</h2>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Sustainability Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {pillar.icon}
                <h4 className="text-xl font-bold mb-2">{pillar.title}</h4>
                <p>{pillar.description}</p>
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
              <h3 className="text-3xl font-bold mb-4">Our Commitment to the Planet</h3>
              <p className="text-lg mb-4">
                At TOOB, sustainability isn't just a buzzword - it's at the core of everything we do. We believe that luxury fashion can coexist with environmental responsibility and social consciousness.
              </p>
              <p className="text-lg">
                From sourcing eco-friendly materials to implementing energy-efficient production processes, we're constantly innovating to reduce our environmental footprint while creating beautiful, timeless pieces.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <img src={require('../images/MKTNG 8.jpg')} alt="Sustainable Fashion" className="rounded-lg shadow-lg" />
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Sustainable Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={require('../images/BlandHalfFull.jpeg')} alt="Organic Cotton" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Organic Cotton</h4>
              <p>We use GOTS-certified organic cotton, grown without harmful pesticides or synthetic fertilizers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={require('../images/HandmadeLeatherBags.png')} alt="Vegetable-Tanned Leather" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Vegetable-Tanned Leather</h4>
              <p>Our leather products use vegetable-tanned leather, a more eco-friendly alternative to chrome tanning.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={require('../images/ZastraToteBag.jpg')} alt="Zero-Waste Design" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold mb-2">Zero-Waste Design</h4>
              <p>Our designers create patterns that maximize fabric usage, minimizing waste in the production process.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-4">Environmental Impact</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>50% reduction in water usage since 2020</li>
                <li>100% renewable energy in our production facilities</li>
                <li>30% of our collection made from recycled materials</li>
                <li>Zero single-use plastics in our packaging</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-bold mb-4">Social Impact</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Fair wages for over 500 artisans in Ethiopia</li>
                <li>Skills training program for 100 young adults annually</li>
                <li>Partnership with 10 local cooperatives</li>
                <li>50% of leadership positions held by women</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h3>
          <p className="text-lg mb-6">
            Every TOOB purchase contributes to our sustainable practices and supports our artisan communities. Together, we can create a more sustainable future for fashion.
          </p>
          <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
            Shop Sustainable Fashion
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

export default Sustainability;