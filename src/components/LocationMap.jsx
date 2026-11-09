import React from 'react';
import { MapPin, Navigation, Clock, ExternalLink, GraduationCap, Train, ShoppingBag, Coffee, Hospital, Building } from 'lucide-react';

const landmarkIconMap = {
  Pendidikan: GraduationCap,
  Transportasi: Train,
  Belanja: ShoppingBag,
  Kuliner: Coffee,
  Kesehatan: Hospital,
  Mall: Building,
};

export default function LocationMap({ kosInfo, nearbyPlaces }) {
  return (
    <section id="lokasi" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Lokasi Sangat Strategis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dekat ke Mana Saja & Bebas Macet
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Terletak di area yang tenang namun sangat dekat dengan pusat mobilitas, transportasi umum, kampus, dan pusat kuliner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Nearby Landmarks & Address */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Box */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Alamat Lengkap</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {kosInfo.address}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{kosInfo.locationNote}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(kosInfo.name + ' ' + kosInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Petunjuk Arah di Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Nearby Highlights List */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Jarak Tempuh ke Fasilitas Terdekat
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {nearbyPlaces.map((place, idx) => {
                  const Icon = landmarkIconMap[place.category] || MapPin;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{place.name}</div>
                          <div className="text-xs text-slate-400">{place.distance} dari lokasi kost</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          <Clock className="w-3 h-3" />
                          {place.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100 aspect-[4/3] sm:aspect-[16/11] relative">
              <iframe
                title="Google Maps Lokasi Kost"
                src={kosInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">
              *Tampilan peta interaktif Google Maps. Anda dapat memperbesar (zoom) atau menggeser peta.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
