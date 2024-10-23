import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Box, Users, ShoppingBag, Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/admin' },
    { title: 'Products', icon: Box, path: '/admin/products' },
    { title: 'Users', icon: Users, path: '/admin/users' },
    { title: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { title: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-6 py-3 hover:bg-gray-100 ${
            location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
