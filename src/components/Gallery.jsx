import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Heart } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      title: 'Majestic Lion',
      category: 'Wildlife',
      description: 'Male lion with magnificent mane resting in golden grassland during sunset',
      likes: 234
    },
    {
      id: 2,
      title: 'Elephant Family',
      category: 'Wildlife',
      description: 'Elephant family with baby elephant walking through African savanna',
      likes: 189
    },
    {
      id: 3,
      title: 'Cheetah Sprint',
      category: 'Action',
      description: 'Cheetah running at full speed across the plains in pursuit of prey',
      likes: 312
    },
    {
      id: 4,
      title: 'Sunset Safari',
      category: 'Landscape',
      description: 'Safari vehicle silhouetted against dramatic African sunset with acacia trees',
      likes: 156
    },
    {
      id: 5,
      title: 'Rhino Portrait',
      category: 'Wildlife',
      description: 'Close-up portrait of white rhinoceros with detailed texture and horn',
      likes: 278
    },
    {
      id: 6,
      title: 'Zebra Herd',
      category: 'Wildlife',
      description: 'Large herd of zebras grazing in the Serengeti with mountains in background',
      likes: 203
    },
    {
      id: 7,
      title: 'Leopard in Tree',
      category: 'Wildlife',
      description: 'Leopard resting on tree branch with spotted coat pattern clearly visible',
      likes: 267
    },
    {
      id: 8,
      title: 'Hippo Pool',
      category: 'Wildlife',
      description: 'Group of hippos in muddy water with some heads visible above surface',
      likes: 145
    },
    {
      id: 9,
      title: 'Giraffe Silhouette',
      category: 'Landscape',
      description: 'Tall giraffe silhouetted against orange and purple sunset sky',
      likes: 198
    }
  ];

  const categories = ['All', 'Wildlife', 'Landscape', 'Action'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 safari-pattern opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            Photo Gallery
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Captured
            <span className="text-gradient block">Moments in the Wild</span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the breathtaking beauty of African wildlife through our lens. Each photo tells a story of adventure and wonder.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-full p-2 hidden sm:flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Mobile Grid Layout */}
          <div className="glass-effect rounded-2xl p-3 grid grid-cols-2 gap-3 sm:hidden max-w-xs w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-full font-medium transition-all duration-300 text-base ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(image)}
                layout
              >
                <div className="relative h-80 overflow-hidden">
                  <img  
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={image.title}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-400 text-sm font-medium">{image.category}</span>
                        <div className="flex items-center space-x-1 text-white">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{image.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-[90vh] bg-slate-800 rounded-2xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img  
                    className="w-full h-auto max-h-[70vh] object-cover" 
                    alt={selectedImage.title}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                      <span className="text-orange-400 font-medium">{selectedImage.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">Ready to capture your own African adventure?</p>
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="inline-block mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            Book Your Safari
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
