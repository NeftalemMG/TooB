// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginMethod, setLoginMethod] = useState('email');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', { email, password });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//           Welcome to Toob
//         </h2>
        
//         <div className="flex justify-center mb-6">
//           <button
//             className={`px-4 py-2 mx-2 rounded-full ${loginMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//             onClick={() => setLoginMethod('email')}
//           >
//             Email
//           </button>
//           <button
//             className={`px-4 py-2 mx-2 rounded-full ${loginMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//             onClick={() => setLoginMethod('phone')}
//           >
//             Phone
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <input
//               type={loginMethod === 'email' ? 'email' : 'tel'}
//               id={loginMethod === 'email' ? 'email' : 'phone'}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder={loginMethod === 'email' ? 'Email' : 'Phone Number'}
//             />
//             {loginMethod === 'email' ? (
//               <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
//             ) : (
//               <User className="absolute left-3 top-3 text-gray-400" size={20} />
//             )}
//           </div>
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//             />
//             <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-400"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold"
//           >
//             Log In
//           </motion.button>
//         </form>

//         <div className="mt-6 text-center">
//           <Link to="/forgot-password" className="text-blue-500 hover:underline">
//             Forgot password?
//           </Link>
//         </div>

//         <div className="mt-6 flex items-center justify-between">
//           <div className="border-t border-gray-300 flex-grow mr-3"></div>
//           <span className="text-gray-500">Or continue with</span>
//           <div className="border-t border-gray-300 flex-grow ml-3"></div>
//         </div>

//         <div className="mt-6 flex justify-center space-x-4">
//           <button className="bg-[#3b5998] text-white p-2 rounded-full">
//             <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//             </svg>
//           </button>
//           <button className="bg-[#1da1f2] text-white p-2 rounded-full">
//             <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//               <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//             </svg>
//           </button>
//           <button className="bg-[#db4437] text-white p-2 rounded-full">
//             <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//               <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.47.697 4.682 1.829l-1.974 1.978c-.517-.545-1.425-1.18-2.708-1.18-2.31 0-4.187 1.9-4.187 4.39 0 2.49 1.877 4.39 4.187 4.39 2.7 0 3.7-1.938 3.833-2.938h-3.833v-2.591h6.355c.06.34.107.692.107 1.15 0 3.848-2.576 6.998-6.462 6.998z"/>
//             </svg>
//           </button>
//         </div>

//         <p className="mt-8 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-blue-500 hover:underline font-semibold">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;