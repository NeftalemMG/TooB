import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${({ theme }) => theme.text};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const ProductCard = ({ product }) => {
  return (
    <Card to={`/product/${product.id}`}>
      <CardImage src={product.image} alt={product.name} />
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardPrice>${product.price.toFixed(2)}</CardPrice>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
