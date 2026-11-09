import React, { useState } from 'react';
import {
  Wind,
  Bath,
  Bed,
  Briefcase,
  Layers,
  Sun,
  Wifi,
  Utensils,
  Coffee,
  Shirt,
  Users,
  TreePine,
  ShieldCheck,
  Key,
  Car,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

const iconMap = {
  Wind,
  Bath,
  Bed,
  Briefcase,
  Layers,
  Sun,
  Wifi,
  Utensils,
  Coffee,
  Shirt,
  Users,
  TreePine,
  ShieldCheck,
  Key,
  Car,
  Clock,
};

export default function Facilities({ facilities }) {
  const [activeTab, setActiveTab] = useState('kamar');

  const tabs = [
    { id: 'kamar', label: 'Fasilitas Kamar', count: facilities.kamar.length },
    { id: 'bersama', label: 'Fasilitas Bersama', count: facilities.bersama.length },
    { id: 'keamanan', label: 'Keamanan & Parkir', count: facilities.keamanan.length },
  ];

  const currentFacilities = facilities[activeTab] || [];

  return (
    <section id="fasilitas" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fasilitas Terlengkap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Semua Kebutuhan Anda Sudah Tersedia
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Fasilitas lengkap dirancang untuk kenyamanan istirahat, fokus belajar, maupun produktivitas kerja jarak jauh (WFH).
          </p>

          {/* Tab Navigation */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-700 shadow-md shadow-slate-200/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                    activeTab === tab.id ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {currentFacilities.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || HelpCircle;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
