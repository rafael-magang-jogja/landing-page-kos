import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Wifi, Wind, MapPin, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Hero({ kosInfo, stats }) {
  const waMessage = `Halo ${kosInfo.name}, saya melihat website kost Anda dan tertarik untuk menanyakan ketersediaan kamar kosong. Boleh minta info detailnya?`;
  const waUrl = getWhatsAppLink(kosInfo.whatsappNumber, waMessage);

  return (
    <section id="beranda" className="pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden relative">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Hunian Kost Modern,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Nyaman & Siap Huni
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {kosInfo.subTagline}
            </p>

            {/* Location highlight note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{kosInfo.locationNote}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#kamar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Lihat Pilihan Kamar</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:border-slate-300 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Tanya via WhatsApp</span>
              </a>
            </div>

            {/* Quick feature highlights checklist */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kamar Mandi Dalam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AC Dingin & Bersih</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free WiFi 100 Mbps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CCTV & Smart Lock</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
                  alt="Kamar Kost Graha Asri"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Starting Price Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Harga Sewa Kamar</span>
                    <span className="text-lg font-bold text-slate-900">
                      Mulai <span className="text-emerald-600">{kosInfo.startingPrice}</span>
                      <span className="text-xs text-slate-500 font-normal"> / bln</span>
                    </span>
                  </div>
                  <a
                    href="#kamar"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    Cek Kamar
                  </a>
                </div>
              </div>

              {/* Floating highlight badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Siap Huni</div>
                  <div className="text-xs text-slate-500">Tinggal Bawa Pakaian</div>
                </div>
              </div>

              {/* Floating security badge */}
              <div className="hidden sm:flex absolute -bottom-6 -right-4 p-3.5 rounded-2xl bg-slate-900 text-white shadow-xl items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Keamanan 24 Jam</div>
                  <div className="text-[11px] text-slate-400">Digital Smart Key & CCTV</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
