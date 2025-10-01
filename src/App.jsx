import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import DestinationsPage from '@/pages/DestinationsPage';
import DestinationDetailPage from '@/pages/DestinationDetailPage';
import ToursPage from '@/pages/ToursPage';
import TourDetailPage from '@/pages/TourDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 scroll-smooth">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:tourId" element={<TourDetailPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;