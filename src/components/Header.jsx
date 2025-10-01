import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tours', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <>
     {/* Top Bar - Responsive */}
  <div className="bg-orange-600 text-white py-2 px-4 text-xs sm:text-sm">
    <div className="container mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 " />
            <span className='tracking-widest'>+254 745 969 305 / +254 717 849 140</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className=' tracking-wider'>karlatoursandtravel@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Nairobi, Kenya</span>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs">+254 745 969 305 / +254 717 849 140</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs">Nairobi</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs">karlatoursandtravel@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Main Header - Responsive */}
  <motion.header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent mt-8 sm:mt-10'
    }`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Logo - Responsive */}
        <Link to="/">
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg lg:text-xl">SA</span>
            </div>
            <div className="block xs:block">
              {/* Mobile: Show short version */}
              {/* <div className="sm:hidden">
                <span className="text-lg font-bold text-gradient">Karla Safari</span>
                <p className="text-xs text-orange-400">Wildlife Tours</p>
              </div> */}
              {/* Desktop: Show full version */}
              <div className=" sm:block">
                <span className="sm:text-xs md:text-xl lg:text-2xl font-bold text-gradient">Karla Safari Adventures</span>
                <p className="text-xs text-orange-400">African Wildlife Tours</p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-white hover:text-orange-400 transition-colors duration-300 font-medium ${
                (location.pathname === item.href || (item.href.includes('#') && location.pathname === '/' && location.hash === item.href.substring(item.href.indexOf('#'))))
                ? 'text-orange-400' : ''
              }`}
            >
              <motion.span
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.span>
            </Link>
          ))}
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 xl:px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Book Now
          </Button>
        </div>

        {/* Tablet Navigation (md-lg) */}
        <div className="hidden md:flex lg:hidden items-center space-x-4">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-white hover:text-orange-400 transition-colors duration-300 font-medium text-sm ${
                (location.pathname === item.href || (item.href.includes('#') && location.pathname === '/' && location.hash === item.href.substring(item.href.indexOf('#'))))
                ? 'text-orange-400' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-3 py-1.5 rounded-full font-semibold text-sm">
            Book
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden mt-4 bg-slate-800/95 backdrop-blur-md rounded-lg p-4 shadow-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`block py-3 px-2 text-white hover:text-orange-400 hover:bg-white/5 rounded-lg transition-all duration-300 font-medium ${
                     (location.pathname === item.href || (item.href.includes('#') && location.pathname === '/' && location.hash === item.href.substring(item.href.indexOf('#'))))
                    ? 'text-orange-400 bg-orange-500/10' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </nav>
  </motion.header>
    </>
  );
};

export default Header;