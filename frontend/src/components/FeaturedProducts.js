import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const FeaturedWrapper = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.body};
`;

const FeaturedTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedProducts = ({ products }) => {
  return (
    <FeaturedWrapper>
      <FeaturedTitle>Featured Products</FeaturedTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </FeaturedWrapper>
  );
};

export default FeaturedProducts;