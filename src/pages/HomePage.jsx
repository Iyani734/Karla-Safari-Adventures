import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Tours from '@/components/Tours';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Tours />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;