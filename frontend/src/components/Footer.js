import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ theme }) => theme.glassBorder};
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <div>&copy; 2024 Toob. All rights reserved.</div>
        <FooterLinks>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;