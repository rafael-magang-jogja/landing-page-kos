import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ gallery }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['Semua', ...new Set(gallery.map((item) => item.category))];

  const filteredPhotos = activeCategory === 'Semua'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="galeri" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Nyata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Suasana & Fasilitas Kost
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Foto nyata tanpa rekayasa berlebihan, menghadirkan gambaran lingkungan kost yang bersih dan nyaman sebelum Anda datang berkunjung.
          </p>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Title container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={filteredPhotos[lightboxIndex].image}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="text-center text-white mt-4">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <h4 className="text-lg font-bold">
                {filteredPhotos[lightboxIndex].title}
              </h4>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
