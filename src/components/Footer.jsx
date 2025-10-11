import React from 'react';
import { color, motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Safari Tours', href: '#tours' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#' },
    { name: 'Reviews', href: '#' }
  ];

  const destinations = [
    'Serengeti National Park',
    'Masai Mara Reserve',
    'Kruger National Park',
    'Okavango Delta',
    'Amboseli National Park',
    'Chobe National Park'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-300' },
    { icon: Youtube, href: '#', color: 'hover:text-red-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 safari-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gradient">Karla Safari Adventures</span>
                <p className="text-xs text-orange-400">African Wildlife Tours</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating unforgettable African safari experiences for over 4 years. We connect travelers with the wild heart of Africa through responsible tourism and conservation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>+254 745 969 305</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>karlatoursandtravel@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xl font-bold text-white mb-6 block">Quick Links</span>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xl font-bold text-white mb-6 block">Top Destinations</span>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xl font-bold text-white mb-6 block">Stay Connected</span>
            
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for safari tips, wildlife updates, and exclusive offers.
            </p>

            {/* Newsletter Signup */}
       <div className="mb-6">
  <div className="flex">
    <input
      type="email"
      placeholder="Your email address"
      className="flex-1 bg-slate-700/50 border border-slate-600 rounded-l-lg px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors"
    />
    <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-r-lg font-semibold text-sm sm:text-base transition-all duration-300">
      Subscribe
    </button>
  </div>
</div>

            {/* Social Links */}
            <div>
              <span className="text-white font-semibold mb-4 block">Follow Us</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-700 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm">
              <p>&copy; 2025 Karla Safari Adventures. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Developer Credits</span>
              
              <a href='https://iyannibuildsweb.netlify.app/' target='_blank' >iyannibuilds.com</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;