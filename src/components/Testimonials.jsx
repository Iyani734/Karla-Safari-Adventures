import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Camera, Heart } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'The Serengeti migration tour was absolutely breathtaking! Our guide was incredibly knowledgeable and we saw the Big Five in just three days. This was truly the adventure of a lifetime.',
      tour: 'Serengeti Great Migration',
      image: 'Professional headshot of smiling woman with blonde hair wearing safari hat'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Sydney, Australia',
      rating: 5,
      text: 'Safari Adventures exceeded all expectations. The attention to detail, safety measures, and authentic cultural experiences made this trip unforgettable. Already planning our return!',
      tour: 'Masai Mara Classic',
      image: 'Professional headshot of Asian man with dark hair smiling outdoors'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      location: 'London, UK',
      rating: 5,
      text: 'From the moment we arrived, everything was perfectly organized. The wildlife encounters were magical, and the accommodations were luxurious yet authentic. Highly recommended!',
      tour: 'Kruger National Park',
      image: 'Professional headshot of woman with brown hair wearing khaki safari shirt'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      text: 'The Okavango Delta experience was pure magic. Gliding through the waterways in a mokoro while elephants bathed nearby was surreal. Professional guides made all the difference.',
      tour: 'Okavango Delta',
      image: 'Professional headshot of man with beard wearing safari vest and hat'
    },
    {
      id: 5,
      name: 'Lisa Park',
      location: 'Seoul, South Korea',
      rating: 5,
      text: 'As a solo female traveler, I felt completely safe and welcomed. The small group size allowed for intimate wildlife viewing and genuine connections with fellow adventurers.',
      tour: 'Amboseli Elephant Paradise',
      image: 'Professional headshot of Asian woman with long black hair smiling warmly'
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Toronto, Canada',
      rating: 5,
      text: 'The photography opportunities were endless! Our guide knew exactly where to position us for the best shots. Came home with thousands of incredible photos and memories.',
      tour: 'Chobe River Safari',
      image: 'Professional headshot of man with gray hair holding camera and smiling'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

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
            What Our Travelers Say
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Stories from the
            <span className="text-gradient block">African Wilderness</span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Hear from adventurers who have experienced the magic of Africa with us. Their stories inspire our commitment to creating unforgettable journeys.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="glass-effect rounded-3xl p-4 md:p-8 relative group hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Tour Badge */}
              <div className="mb-6">
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.tour}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img  
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-400/50" 
                    alt={`${testimonial.name} testimonial photo`}
                   src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.location}</div>
                </div>
              </div>

              {/* Hover Effect Icons */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  <Camera className="w-4 h-4 text-orange-400" />
                  <Heart className="w-4 h-4 text-red-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: '4.9/5', label: 'Average Rating', icon: Star },
            { number: '800+', label: 'Happy Travelers', icon: Heart },
            { number: '98%', label: 'Return Rate', icon: Camera },
            { number: '4+', label: 'Years Experience', icon: Quote }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6 text-lg">Ready to create your own African adventure story?</p>
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
