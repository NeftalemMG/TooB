import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Collections from './pages/Collections';
import OurStory from './pages/OurStory';
import Atelier from './pages/Atelier';
import Sustainability from './pages/Sustainability';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/atelier" element={<Atelier />} />
      </Routes>
    </Router>
  );
};

export default App;