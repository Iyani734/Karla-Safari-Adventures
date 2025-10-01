import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users } from 'lucide-react';

const destinations = [
  {
    id: 'serengeti-migration',
    title: 'Serengeti Great Migration',
    location: 'Tanzania',
    duration: '7 Days',
    bestMonths: 'July - October',
    description: 'Witness the spectacular wildebeest migration across the Serengeti plains',
    image: 'Massive wildebeest migration crossing river in Serengeti with dramatic sky'
  },
  {
    id: 'masai-mara',
    title: 'Masai Mara Safari',
    location: 'Kenya',
    duration: '5 Days',
    bestMonths: 'June - October',
    description: 'Experience the rich wildlife and culture of the famous Masai Mara',
    image: 'Lions resting on rocky outcrop in Masai Mara with acacia trees in background'
  },
  {
    id: 'okavango-delta',
    title: 'Okavango Delta Adventure',
    location: 'Botswana',
    duration: '8 Days',
    bestMonths: 'May - September',
    description: 'Explore the unique water-based ecosystem of the Okavango Delta',
    image: 'Aerial view of Okavango Delta with elephants walking through water'
  },
  {
    id: 'victoria-falls',
    title: 'Victoria Falls & Chobe',
    location: 'Zimbabwe & Botswana',
    duration: '6 Days',
    bestMonths: 'April - October',
    description: 'Discover the mighty Victoria Falls and abundant wildlife of Chobe',
    image: 'Dramatic view of Victoria Falls with rainbow and mist'
  },
  {
    id: 'kilimanjaro-safari',
    title: 'Kilimanjaro & Wildlife',
    location: 'Tanzania',
    duration: '10 Days',
    bestMonths: 'January - March, June - October',
    description: "Combine wildlife viewing with views of Africa's highest peak",
    image: 'Mount Kilimanjaro with elephants in foreground during sunset'
  },
  {
    id: 'namibia-desert',
    title: 'Namibia Desert Explorer',
    location: 'Namibia',
    duration: '9 Days',
    bestMonths: 'May - October',
    description: 'Journey through the stunning landscapes of the Namib Desert',
    image: 'Red sand dunes of Sossusvlei with dead trees in foreground'
  }
];

const DestinationsPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <img  
          className="absolute inset-0 w-full h-full object-cover"
          alt="African safari landscape with dramatic sunset"
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5" 
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Destinations</h1>
            <p className="text-xl text-gray-200">Discover Africa's most spectacular safari destinations and start planning your dream adventure.</p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/destinations/${destination.id}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    {/* Image */}
                    <div className="relative h-80">
                      <img  
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        alt={destination.title}
                        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {destination.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-orange-400" />
                          {destination.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-orange-400" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-orange-400" />
                          Best: {destination.bestMonths}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 line-clamp-2">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;