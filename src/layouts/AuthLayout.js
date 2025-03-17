import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 md:px-10">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaRupeeSign size={28} className="text-primary-600" />
            </motion.div>
            <span className="ml-2 text-xl font-bold text-primary-800">Money Track</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Money Track. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
