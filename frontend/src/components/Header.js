

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingBag, Search, User } from 'lucide-react';
// import { isAuthenticated, getUser } from '../utils/auth';
// import SearchComponent from './SearchComponent';

// const Header = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated()) {
//       setUser(getUser());
//     }
//   }, []);

//   return (
//     <header className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold text-earth-900">TOOB</Link>
//           <nav className="hidden lg:flex space-x-8">
//             {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
//               <Link
//                 key={item}
//                 to={`/${item.toLowerCase().replace(' ', '-')}`}
//                 className="text-earth-900 hover:text-green-300 transition-colors duration-300 relative group"
//               >
//                 {item}
//                 <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//               </Link>
//             ))}
//           </nav>
//           <div className="flex items-center space-x-4">
//             <SearchComponent />
//             <Link to="/cart" className="p-2 rounded-full bg-green-100 text-earth-900 hover:bg-green-200 transition-colors duration-300">
//               <ShoppingBag size={20} />
//             </Link>
//             {user ? (
//               <div className="flex items-center">
//                 <User size={20} className="mr-2" />
//                 <span className="text-earth-900">{user.name}</span>
//               </div>
//             ) : (
//               <Link to="/login" className="text-earth-900 hover:text-green-500">Login</Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TOOBLogo from './TOOBLogo';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <TOOBLogo width={120} height={48} />
          </Link>
          <nav className="hidden lg:flex space-x-8">
            {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;