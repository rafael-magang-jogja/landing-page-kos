import React, { useState } from 'react';
import { Check, Eye, Maximize2, Sparkles, AlertCircle } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { getWhatsAppLink, formatRupiah } from '../utils/whatsapp';
import RoomModal from './RoomModal';

export default function RoomTypes({ roomTypes, kosInfo }) {
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const displayedRooms = filterAvailableOnly
    ? roomTypes.filter((r) => r.isAvailable)
    : roomTypes;

  return (
    <section id="kamar" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilihan Tipe Kamar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kamar Bersih, Estetik & Siap Huni
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tersedia beberapa pilihan tipe kamar yang dapat disesuaikan dengan kebutuhan dan anggaran Anda. Tinggal bawa koper dan pakaian!
          </p>

          {/* Availability Filter Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/60 text-xs font-semibold">
            <button
              onClick={() => setFilterAvailableOnly(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                !filterAvailableOnly
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Kamar ({roomTypes.length})
            </button>
            <button
              onClick={() => setFilterAvailableOnly(true)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterAvailableOnly
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kamar Kosong Saja ({roomTypes.filter((r) => r.isAvailable).length})
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRooms.map((room) => {
            const waBookingMessage = room.isAvailable
              ? `Halo ${kosInfo.name}, saya berminat dengan ${room.name} (${formatRupiah(room.price)}/bln). Apakah kamar tersebut masih bisa dibooking?`
              : `Halo ${kosInfo.name}, saya melihat ${room.name} sedang penuh. Apakah bisa info jika nanti ada kamar yang kosong?`;
            const waUrl = getWhatsAppLink(kosInfo.whatsappNumber, waBookingMessage);

            return (
              <div
                key={room.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                      !room.isAvailable ? 'grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100' : ''
                    }`}
                  />

                  {/* Dark Overlay + Single Black & White Center Badge when Full */}
                  {!room.isAvailable && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-slate-950 text-white shadow-xl ring-2 ring-white flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                        Kamar Penuh
                      </span>
                    </div>
                  )}
                  
                  {/* Badge Tag */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow">
                      {room.tag}
                    </span>
                  </div>

                  {/* Availability indicator (only shown when available) */}
                  {room.isAvailable && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-md ring-2 ring-white/80 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        Sisa {room.available} Kamar
                      </span>
                    </div>
                  )}

                  {/* Size pill */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col">
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {room.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 mb-4 pb-4 border-b border-slate-100 flex items-baseline gap-2">
                    <span className={`text-2xl font-extrabold ${room.isAvailable ? 'text-slate-900' : 'text-slate-500'}`}>
                      {formatRupiah(room.price)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ {room.period}</span>
                    {room.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatRupiah(room.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Key Amenities Preview */}
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Fasilitas Unggulan:
                    </div>
                    {room.facilities.slice(0, 4).map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="line-clamp-1">{fac}</span>
                      </div>
                    ))}
                    {room.facilities.length > 4 && (
                      <div className="text-xs text-emerald-600 font-medium pl-6">
                        +{room.facilities.length - 4} fasilitas lainnya...
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <Eye className="w-4 h-4 text-slate-500" />
                      <span>Lihat Detail</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-sm ${
                        room.isAvailable
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                          : 'bg-slate-600 hover:bg-slate-700'
                      }`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>{room.isAvailable ? 'Pesan WA' : 'Tanya Antrean'}</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Room Modal */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          kosInfo={kosInfo}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </section>
  );
}
