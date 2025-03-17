import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, DollarSign, PieChart, Calendar, Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { Button } from '../components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaRupeeSign size={32} className="text-primary-600" />
            </motion.div>
            <span className="ml-2 text-2xl font-bold text-primary-800">Money Track</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Login
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Manage Your Finances 
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Track your earnings and expenses, visualize your spending habits, and take control of your financial future.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Get Started <ChevronRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Dashboard Preview</h3>
                <span className="text-sm text-gray-500">March 2025</span>
              </div>
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <FaRupeeSign size={16} className="text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Monthly Overview</p>
                        <p className="text-xs text-gray-500">Track your monthly expenses</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">₹24,500</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp size={16} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Total Earnings</p>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">₹45,000</span>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full">
                        <TrendingDown size={16} className="text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Total Expenses</p>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">₹20,500</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Money Track provides everything you need to manage your personal finances effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-primary-50 rounded-xl p-6 shadow-md"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaRupeeSign size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Finances</h3>
              <p className="text-gray-600">
                Easily log your earnings and expenses with categorized entries.
              </p>
            </motion.div>
            <motion.div 
              className="bg-primary-50 rounded-xl p-6 shadow-md"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <PieChart size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visualize Data</h3>
              <p className="text-gray-600">
                See where your money goes with intuitive charts and breakdowns.
              </p>
            </motion.div>
            <motion.div 
              className="bg-primary-50 rounded-xl p-6 shadow-md"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bell size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Reports</h3>
              <p className="text-gray-600">
                Receive weekly email summaries of your financial activities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-100">
              Begin your journey towards financial clarity and money management today with Money Track.
          </p>
          <Link to="/register">
          <Button variant="default" size="lg" className="bg-white text-black hover:bg-gray-100">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FaRupeeSign size={24} className="text-primary-400" />
              <span className="ml-2 text-xl font-bold">Money Track</span>
            </div>
            <div className="text-gray-400 text-sm">
              <a 
                href="https://www.linkedin.com/in/chirag-c-s/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                Developed by Chirag C S
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
