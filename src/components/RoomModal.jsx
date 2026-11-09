import React, { useState } from 'react';
import { X, Check, MessageCircle, Maximize2, Shield, Zap } from 'lucide-react';
import { getWhatsAppLink, formatRupiah } from '../utils/whatsapp';

export default function RoomModal({ room, kosInfo, onClose }) {
  if (!room) return null;

  const [activeImage, setActiveImage] = useState(room.image);

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  const waBookingMessage = `Halo ${kosInfo.name}, saya tertarik untuk booking / survey ${room.name} (Harga: ${formatRupiah(room.price)}/bln). Apakah masih tersedia?`;
  const waUrl = getWhatsAppLink(kosInfo.whatsappNumber, waBookingMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-scrollbar bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop click close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-100 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-all hover:scale-105"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Images Preview */}
        <div className="relative bg-slate-950 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
          <img
            src={activeImage}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Badge over photo */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md">
              {room.tag}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              room.isAvailable ? 'bg-white text-emerald-800' : 'bg-red-500 text-white'
            }`}>
              {room.isAvailable ? `Sisa ${room.available} Kamar` : 'Penuh'}
            </span>
          </div>

          {/* Room Name & Size overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-bold">{room.name}</h3>
            <p className="text-sm text-slate-200 flex items-center gap-1.5 mt-0.5">
              <Maximize2 className="w-4 h-4" /> Luas Kamar: {room.size}
            </p>
          </div>
        </div>

        {/* Image Thumbnails if more than 1 image */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-slate-100 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === img ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Pricing Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Biaya Sewa Kamar</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatRupiah(room.price)}
                </span>
                <span className="text-sm text-slate-500">/ {room.period}</span>
                {room.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatRupiah(room.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Pesan Kamar Ini via WA</span>
            </a>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Deskripsi Kamar</h4>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {room.description}
            </p>
          </div>

          {/* Facilities list */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Fasilitas di Dalam Kamar</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.facilities.map((fac, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Biaya Lain & Ketentuan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
              {room.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-emerald-50/50 text-emerald-900 px-3 py-2 rounded-lg border border-emerald-100">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
