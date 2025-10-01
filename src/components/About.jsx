import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Globe, Award, Users, Camera } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Professional guides and safety protocols ensure your adventure is secure and worry-free.'
    },
    {
      icon: Heart,
      title: 'Conservation Focus',
      description: 'Supporting local communities and wildlife conservation through responsible tourism.'
    },
    {
      icon: Globe,
      title: 'Expert Knowledge',
      description: 'Local guides with deep understanding of wildlife behavior and African culture.'
    }
  ];

  const achievements = [
    { icon: Award, number: '20+', text: 'Awards Won' },
    { icon: Users, number: '800+', text: 'Happy Clients' },
    { icon: Camera, number: '1M+', text: 'Photos Captured' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 safari-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-orange-400 font-semibold text-lg mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Safari Adventures
            </motion.span>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Your Gateway to
              <span className="text-gradient block">African Wilderness</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              For over 4 years, we've been crafting extraordinary safari experiences that connect travelers with Africa's incredible wildlife and rich cultures. Our passion for conservation and adventure drives us to create journeys that inspire and transform.
            </motion.p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-lg block mb-1">{feature.title}</span>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.text}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <achievement.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{achievement.number}</div>
                  <div className="text-gray-400 text-sm leading-tight">
                    {achievement.text.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex} className="block sm:inline">
                        {word}
                        {wordIndex < achievement.text.split(' ').length - 1 && <span className="hidden sm:inline"> </span>}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img  
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" 
                    alt="Lion pride resting under acacia tree"
                   src="https://images.unsplash.com/photo-1483571384819-f48ff81c7f78" />
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img  
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" 
                    alt="Safari guide with binoculars"
                   src="https://images.unsplash.com/photo-1698618784321-0d54b2efb8a9" />
                </div>
              </motion.div>
              
              <motion.div
                className="space-y-4 mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img  
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" 
                    alt="Giraffe family in African wilderness"
                   src="https://images.unsplash.com/photo-1587617155153-43eafab275c7" />
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img  
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" 
                    alt="Safari vehicle on adventure"
                   src="https://images.unsplash.com/photo-1553456408-09e017af8d07" />
                </div>
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -top-4 -right-2 sm:-right-4 glass-effect rounded-full p-4 sm:p-6 text-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-xl sm:text-2xl font-bold text-orange-400">15+</div>
              <div className="text-white text-xs sm:text-sm">Years</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;