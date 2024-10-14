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

