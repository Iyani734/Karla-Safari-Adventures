import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  const experts = [
    {
      name: 'John Kimani',
      role: 'Lead Safari Guide',
      experience: '15+ years',
      description: 'Expert in wildlife tracking and bird identification. Certified by Kenya Professional Safari Guides Association.',
      image: 'Professional safari guide in khaki uniform with binoculars'
    },
    {
      name: 'Sarah Omondi',
      role: 'Conservation Specialist',
      experience: '12+ years',
      description: 'Leads our conservation initiatives and community outreach programs. PhD in Wildlife Conservation.',
      image: 'Female conservationist working with local community'
    },
    {
      name: 'David Mutua',
      role: 'Head of Operations',
      experience: '10+ years',
      description: 'Ensures seamless safari experiences from planning to execution. Expert in logistics and safety protocols.',
      image: 'Safari operations manager reviewing route maps'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <img  
          className="absolute inset-0 w-full h-full object-cover"
          alt="Stunning African savanna sunset with acacia trees and wildlife silhouettes"
         src="https://images.unsplash.com/photo-1598759612090-6fa88db25a1c" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Story</h1>
            <p className="text-xl text-gray-200 mb-8">Discover the passion and purpose behind Safari Adventures, where every journey tells a story of wildlife, conservation, and unforgettable experiences.</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">The Story Behind Our Name</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Safari Adventures was born from a deep love for Africa's wild spaces and a vision to share its magic with the world. The word "Safari" comes from the Swahili word for "journey," and that's exactly what we create – not just tours, but transformative journeys that connect people with nature in its purest form.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Founded in 2009 by wildlife photographer and conservationist James Mwangi, our company has grown from a small local operation to a leading name in African safari experiences, all while maintaining our core values of conservation, community support, and authentic adventures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img  
                className="rounded-2xl shadow-2xl"
                alt="Founder photographing wildlife in African savanna"
               src="https://images.unsplash.com/photo-1690924355813-f5f141bcd867" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img  
                className="rounded-2xl shadow-2xl"
                alt="Local community members participating in conservation efforts"
               src="https://images.unsplash.com/photo-1681834913206-cea9d3ec04d6" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At Safari Adventures, our mission is to create extraordinary African safari experiences that inspire conservation, support local communities, and leave lasting impressions on our travelers. We believe that responsible tourism can be a powerful force for positive change.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 flex-shrink-0 mt-1"></span>
                  <span>Promoting sustainable wildlife conservation through education and experience</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 flex-shrink-0 mt-1"></span>
                  <span>Supporting local communities through employment and development initiatives</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 flex-shrink-0 mt-1"></span>
                  <span>Providing authentic, immersive experiences that connect people with nature</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Experts Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Safari Experts</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our team of experienced guides and conservation specialists are the heart of Safari Adventures, bringing unparalleled expertise and passion to every journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <img  
                    className="w-full h-full object-cover"
                    alt={expert.image}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{expert.name}</h3>
                  <p className="text-orange-400 mb-2">{expert.role}</p>
                  <p className="text-gray-300 mb-4">{expert.description}</p>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{expert.experience} experience</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Sustainability & Impact</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We believe in creating positive impact through responsible tourism. Our partnerships with local communities ensure that tourism benefits those who call these wilderness areas home.
              </p>
              <div className="space-y-6">
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Community Empowerment</h3>
                  <p className="text-gray-300">
                    We work directly with Maasai communities, employing local guides and supporting traditional crafts and cultural experiences.
                  </p>
                </div>
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Conservation Initiatives</h3>
                  <p className="text-gray-300">
                    A portion of every safari booking goes directly to local conservation projects and wildlife protection efforts.
                  </p>
                </div>
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Sustainable Practices</h3>
                  <p className="text-gray-300">
                    We minimize our environmental impact through eco-friendly camps and responsible wildlife viewing practices.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img  
                className="rounded-2xl shadow-2xl mb-6"
                alt="Local Maasai community members participating in cultural activities"
               src="https://images.unsplash.com/photo-1693949156050-166d5019a859" />
              <img  
                className="rounded-2xl shadow-2xl ml-auto w-2/3"
                alt="Wildlife conservation project in action"
               src="https://images.unsplash.com/photo-1694070783203-652eb14e6e9f" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <img  
          className="absolute inset-0 w-full h-full object-cover"
          alt="Dramatic African sunset with silhouetted wildlife"
         src="https://images.unsplash.com/photo-1612851249892-9f3d739605ae" />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your African Adventure?</h2>
            <p className="text-xl text-gray-200 mb-8">
              Let us create your perfect safari experience. Choose how you'd like to begin your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Calendar className="mr-2 h-5 w-5" /> Book a Call
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                <Mail className="mr-2 h-5 w-5" /> Request Quote
              </Button>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="mr-2 h-5 w-5" /> Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;