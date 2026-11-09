import React from 'react';
import kosData from './data/kosData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomTypes from './components/RoomTypes';
import Facilities from './components/Facilities';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import Rules from './components/Rules';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  const {
    kosInfo,
    stats,
    roomTypes,
    facilities,
    gallery,
    nearbyPlaces,
    rules,
    testimonials,
    faqs,
  } = kosData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar kosInfo={kosInfo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero kosInfo={kosInfo} stats={stats} />
        <RoomTypes roomTypes={roomTypes} kosInfo={kosInfo} />
        <Facilities facilities={facilities} />
        <Gallery gallery={gallery} />
        <LocationMap kosInfo={kosInfo} nearbyPlaces={nearbyPlaces} />
        <Rules rules={rules} />
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} kosInfo={kosInfo} />
        <CTASection kosInfo={kosInfo} />
      </main>

      {/* Footer */}
      <Footer kosInfo={kosInfo} />

      {/* Sticky Floating WhatsApp Quick Chat */}
      <WhatsAppFloat kosInfo={kosInfo} />
    </div>
  );
}
