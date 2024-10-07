import React from 'react';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: #fff;
  text-align: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const HeroButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Hero = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <HeroTitle>Welcome to Toob</HeroTitle>
        <HeroSubtitle>Discover the beauty of Habesha clothing</HeroSubtitle>
        <HeroButton>Shop Now</HeroButton>
      </HeroContent>
    </HeroWrapper>
  );
};

export default Hero;