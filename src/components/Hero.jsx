import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Users, Award, X } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const stats = [
    { icon: Users, value: '800+', label: 'Happy Travelers' },
    { icon: Award, value: '4+', label: 'Years Experience' },
    { icon: Star, value: '4.9', label: 'Average Rating' }
  ];

  const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    };
    
    const sizes = {
      default: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 py-3 text-lg'
    };
    
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={2}
            src={"/elephants_sunset.jpeg"}
            alt={"elephants at sunset"}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Floating Elements - Hidden on mobile for better performance */}
      <div className="absolute inset-0 z-10 hidden md:block">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-orange-500/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 lg:w-32 lg:h-32 bg-red-500/20 rounded-full blur-xl"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Experience the
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent block mt-2">
              Wild Heart of Africa
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Embark on unforgettable safari adventures through Africa's most spectacular wildlife destinations. Witness the Big Five in their natural habitat.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group"
            >
              Start Your Adventure
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto backdrop-blur-sm bg-white/10 text-white border-white/30 hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg group"
              onClick={scrollToReviews}
            >
              <Star className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              Hear from our Travelers
            </Button>
          </motion.div>

          {/* Stats - Mobile optimized for screens < 400px */}
          <motion.div
            className="max-w-4xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Mobile layout for screens < 400px */}
            <div className="block max-[400px]:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Compact layout for screens < 400px */}
            <div className="hidden max-[400px]:block">
              <motion.div
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4 text-center max-w-xs mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex flex-col items-center flex-1">
                      <stat.icon className="w-5 h-5 text-orange-400 mb-1.5" />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-gray-300 text-xs">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="text-center flex-1 leading-tight">
                      <div className="flex flex-col">
                        <span>{stat.label.split(' ')[0]}</span>
                        <span>{stat.label.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;