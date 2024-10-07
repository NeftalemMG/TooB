import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductWrapper = styled(motion.div)`
  display: flex;
  gap: 4rem;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ProductImageWrapper = styled.div`
  width: 50%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #4a5568;
  margin: 0;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
`;

const AddToCartButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #4299e1;
  color: white;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3182ce;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch the product from an API
    // For now, we'll use mock data
    const mockProduct = {
      id: 1,
      name: 'Modern Habesha Dress',
      price: 249.99,
      image: '/api/placeholder/600/800?text=Modern+Habesha+Dress',
      description: 'This stunning Modern Habesha Dress combines traditional Ethiopian design elements with contemporary fashion trends. Featuring intricate embroidery and a flowing silhouette, this dress is perfect for both cultural events and modern celebrations.',
    };
    setProduct(mockProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProductImageWrapper>
        <ProductImage 
          src={product.image} 
          alt={product.name} 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <WishlistButton>
          <Heart size={24} color="#4299e1" />
        </WishlistButton>
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        <AddToCartButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={24} />
          Add to Cart
        </AddToCartButton>
      </ProductInfo>
    </ProductWrapper>
  );
};

export default ProductDetails;