import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  User, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { signOut } from '../utils/supabase';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/earnings', label: 'Earnings', icon: TrendingUp },
    { path: '/expenses', label: 'Expenses', icon: TrendingDown },
    { path: '/monthly', label: 'Monthly', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 md:hidden">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DollarSign size={28} className="text-primary-600" />
            </motion.div>
            <span className="ml-2 text-xl font-bold text-primary-800">Money Track</span>
          </Link>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
          <div className="p-6">
            <Link to="/dashboard" className="flex items-center">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DollarSign size={28} className="text-primary-600" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-primary-800">Money Track</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} className={`mr-3 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 w-1 h-8 bg-primary-600 rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <div className="absolute inset-0 bg-gray-800 bg-opacity-50" onClick={toggleMobileMenu}></div>
              <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center">
                      <DollarSign size={24} className="text-primary-600" />
                      <span className="ml-2 text-xl font-bold text-primary-800">Money Track</span>
                    </Link>
                    <button 
                      onClick={toggleMobileMenu}
                      className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <nav className="px-4 py-6">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon size={18} className={`mr-3 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
