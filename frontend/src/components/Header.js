import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.glassBorder};
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo to="/">Toob</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login">Login</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;