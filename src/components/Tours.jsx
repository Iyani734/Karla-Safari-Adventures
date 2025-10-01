import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Star, Clock, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Tours = () => {
  const tours = [
    {
      id: 1,
      title: 'Serengeti Great Migration',
      location: 'Tanzania',
      duration: '7 Days',
      price: '$2,499',
      rating: 4.9,
      reviews: 156,
      groupSize: '8-12',
      highlights: ['Wildebeest Migration', 'Big Five', 'Ngorongoro Crater'],
      image: 'Massive wildebeest migration crossing river in Serengeti with dramatic sky',
      featured: true
    },
    {
      id: 2,
      title: 'Masai Mara Classic',
      location: 'Kenya',
      duration: '5 Days',
      price: '$1,899',
      rating: 4.8,
      reviews: 203,
      groupSize: '6-10',
      highlights: ['Masai Culture', 'Lion Prides', 'Hot Air Balloon'],
      image: 'Lions resting on rocky outcrop in Masai Mara with acacia trees in background'
    },
    {
      id: 3,
      title: 'Kruger National Park',
      location: 'South Africa',
      duration: '6 Days',
      price: '$1,699',
      rating: 4.7,
      reviews: 89,
      groupSize: '4-8',
      highlights: ['Leopard Tracking', 'Bush Walks', 'Luxury Lodges'],
      image: 'Leopard resting on tree branch in Kruger National Park during golden hour'
    },
    {
      id: 4,
      title: 'Okavango Delta',
      location: 'Botswana',
      duration: '8 Days',
      price: '$3,299',
      rating: 5.0,
      reviews: 67,
      groupSize: '6-8',
      highlights: ['Mokoro Rides', 'Elephant Herds', 'Water Safari'],
      image: 'Elephants drinking water in Okavango Delta with lush vegetation and clear water'
    },
    {
      id: 5,
      title: 'Amboseli Elephant Paradise',
      location: 'Kenya',
      duration: '4 Days',
      price: '$1,299',
      rating: 4.8,
      reviews: 124,
      groupSize: '8-12',
      highlights: ['Mount Kilimanjaro Views', 'Elephant Families', 'Maasai Villages'],
      image: 'Large elephant herd walking with Mount Kilimanjaro in the background'
    },
    {
      id: 6,
      title: 'Chobe River Safari',
      location: 'Botswana',
      duration: '3 Days',
      price: '$999',
      rating: 4.6,
      reviews: 91,
      groupSize: '10-15',
      highlights: ['River Cruise', 'Hippo Pods', 'Sunset Views'],
      image: 'Hippos in Chobe River with safari boat in background during sunset'
    }
  ];

  const featuredTour = tours.find(tour => tour.featured);
  const regularTours = tours.filter(tour => !tour.featured);

  return (
    <section id="tours" className="py-12 sm:py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-orange-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Safari Packages
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Choose Your
            <span className="text-gradient block">African Adventure</span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            From the Great Migration to intimate wildlife encounters, discover our carefully crafted safari experiences across Africa's most iconic destinations.
          </motion.p>
        </motion.div>

        {/* Featured Tour - Most Popular */}
        {featuredTour && (
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg">
                Most Popular
              </div>

              {/* Image */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img  
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`${featuredTour.title} safari tour in ${featuredTour.location}`}
                  src="https://images.unsplash.com/photo-1632178151697-fd971baa906f" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="glass-effect p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400 font-medium text-base sm:text-lg">{featuredTour.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white text-base sm:text-lg">{featuredTour.rating} ({featuredTour.reviews} reviews)</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                  {featuredTour.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-base sm:text-lg">{featuredTour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span className="text-base sm:text-lg">{featuredTour.groupSize} people</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                    {featuredTour.price}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredTour.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-500/20 text-orange-300 px-3 py-2 rounded-full text-sm sm:text-base font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button className="w-full sm:w-auto sm:px-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-full py-3 sm:py-4 text-base sm:text-lg group-hover:shadow-lg transition-all duration-300">
                  Book This Tour
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img  
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`${tour.title} safari tour in ${tour.location}`}
                  src="https://images.unsplash.com/photo-1632178151697-fd971baa906f" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="glass-effect p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-medium text-sm sm:text-base">{tour.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{tour.rating} ({tour.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {tour.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{tour.groupSize}</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-orange-400">
                    {tour.price}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-full py-2 sm:py-3 text-sm sm:text-base group-hover:shadow-lg transition-all duration-300">
                  Book This Tour
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6 text-sm sm:text-base px-4 sm:px-0">Can't find the perfect tour? We create custom safari experiences.</p>
          <Button 
            variant="outline" 
            size="lg"
            className="glass-effect text-white border-orange-400 hover:bg-orange-400/20 px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base"
          >
            <Camera className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Create Custom Tour
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Tours;
