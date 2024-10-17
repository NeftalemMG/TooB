import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Recycle, Leaf, Heart, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import TOOBLogo from '../components/TOOBLogo';

// Import images
import sustainableFashionImage from '../images/MKTNG 6.jpg';
import commitmentImage from '../images/MKTNG 8.jpg';
import organicCottonImage from '../images/BlandHalfFull.jpeg';
import leatherImage from '../images/HandmadeLeatherBags.png';
import zeroWasteImage from '../images/ZastraToteBag.jpg';

const Sustainability = () => {
  const sustainabilityPillars = [
    { icon: <Leaf className="h-12 w-12 mb-4" />, title: 'Eco-Friendly Materials', description: 'We prioritize organic and sustainably sourced materials in all our products.' },
    { icon: <Recycle className="h-12 w-12 mb-4" />, title: 'Circular Fashion', description: 'Our designs focus on longevity and recyclability to minimize waste.' },
    { icon: <Heart className="h-12 w-12 mb-4" />, title: 'Ethical Production', description: 'We ensure fair wages and safe working conditions for all our artisans.' },
    { icon: <Users className="h-12 w-12 mb-4" />, title: 'Community Support', description: 'We invest in local communities to preserve traditional craftsmanship.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 sticky top-0 z-50">
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
            <img src={sustainableFashionImage} alt="Sustainable Fashion" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Fashion with a Conscience</h2>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center text-indigo-900">Our Sustainability Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {pillar.icon}
                <h4 className="text-xl font-bold mb-2 text-indigo-800">{pillar.title}</h4>
                <p className="text-gray-600">{pillar.description}</p>
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
              <h3 className="text-3xl font-bold mb-4 text-indigo-900">Our Commitment to the Planet</h3>
              <p className="text-lg mb-4 text-gray-700">
                At TOOB, sustainability isn't just a buzzword - it's at the core of everything we do. We believe that luxury fashion can coexist with environmental responsibility and social consciousness.
              </p>
              <p className="text-lg text-gray-700">
                From sourcing eco-friendly materials to implementing energy-efficient production processes, we're constantly innovating to reduce our environmental footprint while creating beautiful, timeless pieces.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img src={commitmentImage} alt="Sustainable Fashion" className="rounded-3xl shadow-lg" />
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-full h-full text-green-500" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center text-indigo-900">Our Sustainable Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Organic Cotton", image: organicCottonImage, content: "We use GOTS-certified organic cotton, grown without harmful pesticides or synthetic fertilizers." },
              { title: "Vegetable-Tanned Leather", image: leatherImage, content: "Our leather products use vegetable-tanned leather, a more eco-friendly alternative to chrome tanning." },
              { title: "Zero-Waste Design", image: zeroWasteImage, content: "Our designers create patterns that maximize fabric usage, minimizing waste in the production process." }
            ].map((practice, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={practice.image} alt={practice.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                <h4 className="text-xl font-bold mb-2 text-indigo-800">{practice.title}</h4>
                <p className="text-gray-600">{practice.content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center text-indigo-900">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Environmental Impact", items: [
                "50% reduction in water usage since 2020",
                "100% renewable energy in our production facilities",
                "30% of our collection made from recycled materials",
                "Zero single-use plastics in our packaging"
              ]},
              { title: "Social Impact", items: [
                "Fair wages for over 500 artisans in Ethiopia",
                "Skills training program for 100 young adults annually",
                "Partnership with 10 local cooperatives",
                "50% of leadership positions held by women"
              ]}
            ].map((impact, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
              >
                <h4 className="text-xl font-bold mb-4 text-indigo-800">{impact.title}</h4>
                <ul className="space-y-2">
                  {impact.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Leaf className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4 text-indigo-900">Join Us in Making a Difference</h3>
          <p className="text-lg mb-6 text-gray-700">
            Every TOOB purchase contributes to our sustainable practices and supports our artisan communities. Together, we can create a more sustainable future for fashion.
          </p>
          <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-8 py-3 text-lg shadow-lg transform hover:scale-105">
            Shop Sustainable Fashion
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <TOOBLogo width={120} height={48} className="text-white" />
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 TOOB Habesha. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sustainability;