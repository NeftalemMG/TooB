import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 px-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold">Toob Habesha</Link>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-purple-400 transition-colors">Products</Link></li>
            <li><Link to="/cart" className="hover:text-purple-400 transition-colors">Cart</Link></li>
            <li><Button variant="primary">Login</Button></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; 2024 Toob Habesha. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
