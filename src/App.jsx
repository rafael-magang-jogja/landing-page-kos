import React, { useState, useEffect } from 'react';
import initialKosData from './data/kosData.json';
import { supabase, isSupabaseConfigured } from './lib/supabase';
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
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage', e);
    }
    return initialKosData;
  });

  const [isLoadingSupabase, setIsLoadingSupabase] = useState(isSupabaseConfigured);

  // Fetch live data from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoadingSupabase(false);
      return;
    }

    const fetchSupabaseData = async () => {
      try {
        const { data: row, error } = await supabase
          .from('kos_settings')
          .select('data')
          .eq('id', 'main')
          .single();

        if (error) {
          console.warn('Gagal mengambil data dari Supabase (menggunakan fallback):', error.message);
        } else if (row && row.data) {
          setData(row.data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(row.data));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Error koneksi Supabase:', err);
      } finally {
        setIsLoadingSupabase(false);
      }
    };

    fetchSupabaseData();
  }, []);

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

  const handleSaveData = async (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage', e);
    }

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('kos_settings')
          .upsert({
            id: 'main',
            data: newData,
            updated_at: new Date().toISOString(),
          });

        if (error) {
          throw error;
        }
        return { success: true };
      } catch (err) {
        console.error('Gagal menyimpan ke Supabase:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, isLocalOnly: true };
  };

  const handleResetData = async () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan data ke default bawaan?')) {
      localStorage.removeItem(STORAGE_KEY);
      setData(initialKosData);

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('kos_settings').upsert({
            id: 'main',
            data: initialKosData,
            updated_at: new Date().toISOString(),
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  if (isAdminView) {
    return (
      <AdminDashboard
        data={data}
        isSupabaseConnected={isSupabaseConfigured}
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
