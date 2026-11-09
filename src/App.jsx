import React, { useState, useEffect } from 'react';
import initialKosData from './data/kosData.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomTypes from './components/RoomTypes';
import Facilities from './components/Facilities';
import LocationMap from './components/LocationMap';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminDashboard from './components/AdminDashboard';

const STORAGE_KEY = 'kos_data_override';

export default function App() {
  // Load overridden data from localStorage if available
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage', e);
    }
    return initialKosData;
  });

  // Track if current route is /admin or #admin
  const [isAdminView, setIsAdminView] = useState(() => {
    return (
      window.location.hash === '#admin' ||
      window.location.pathname.startsWith('/admin')
    );
  });

  useEffect(() => {
    const handleHashOrPop = () => {
      setIsAdminView(
        window.location.hash === '#admin' ||
        window.location.pathname.startsWith('/admin')
      );
    };
    window.addEventListener('hashchange', handleHashOrPop);
    window.addEventListener('popstate', handleHashOrPop);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPop);
      window.removeEventListener('popstate', handleHashOrPop);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const handleBackToLanding = () => {
    window.location.hash = '';
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminView(false);
  };

  const handleSaveData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage', e);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan data ke default bawaan?')) {
      localStorage.removeItem(STORAGE_KEY);
      setData(initialKosData);
    }
  };

  if (isAdminView) {
    return (
      <AdminDashboard
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  const {
    kosInfo,
    stats,
    roomTypes,
    facilities,
    nearbyPlaces,
    faqs,
  } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar kosInfo={kosInfo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero kosInfo={kosInfo} stats={stats} />
        <RoomTypes roomTypes={roomTypes} kosInfo={kosInfo} />
        <Facilities facilities={facilities} />
        <LocationMap kosInfo={kosInfo} nearbyPlaces={nearbyPlaces} />
        <FAQ faqs={faqs} kosInfo={kosInfo} />
        <CTASection kosInfo={kosInfo} />
      </main>

      {/* Footer with Admin Shortcut */}
      <Footer kosInfo={kosInfo} onOpenAdmin={handleOpenAdmin} />

      {/* Sticky Floating WhatsApp Quick Chat */}
      <WhatsAppFloat kosInfo={kosInfo} />
    </div>
  );
}
