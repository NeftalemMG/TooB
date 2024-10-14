import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Collections from './pages/Collections';
import OurStory from './pages/OurStory';
import Atelier from './pages/Atelier';
import Sustainability from './pages/Sustainability';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}

            <Route path="/collections" element={<Collections />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />


            <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />

          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;