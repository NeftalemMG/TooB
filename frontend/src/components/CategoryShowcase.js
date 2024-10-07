import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CategoryName = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

const CategoryShowcase = ({ categories }) => {
  return (
    <Grid>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <CategoryImage src={category.image} alt={category.name} />
          <CategoryName>{category.name}</CategoryName>
        </CategoryCard>
      ))}
    </Grid>
  );
};

export default CategoryShowcase;

// import React from 'react';
// import { motion } from 'framer-motion';

// const categories = [
//   { name: 'Traditional Dresses', image: '/api/placeholder/400/300?text=Traditional+Dresses' },
//   { name: 'Modern Fusion', image: '/api/placeholder/400/300?text=Modern+Fusion' },
//   { name: 'Accessories', image: '/api/placeholder/400/300?text=Accessories' },
//   { name: 'Ceremonial Wear', image: '/api/placeholder/400/300?text=Ceremonial+Wear' },
// ];

// const CategoryShowcase = () => {
//   return (
//     <section className="py-16 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
//           Explore Our Collections
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category.name}
//               className="group relative overflow-hidden rounded-lg shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
//               <div className="absolute inset-0 flex items-end justify-center p-4">
//                 <motion.h3
//                   className="text-xl font-bold text-white text-center"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.3, delay: 0.1 }}
//                 >
//                   {category.name}
//                 </motion.h3>
//               </div>
//               <motion.div
//                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//               >
//                 <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
//                   Shop Now
//                 </button>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryShowcase;