import React from 'react';
import { MessageCircle, Calendar, Sparkles, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function CTASection({ kosInfo }) {
  const waSurveyMessage = `Halo ${kosInfo.name}, saya ingin menjadwalkan survey kamar kost langsung ke lokasi. Apakah hari ini atau besok ada jadwal yang kosong?`;
  const waSurveyUrl = getWhatsAppLink(kosInfo.whatsappNumber, waSurveyMessage);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Ambient circles */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unit Sangat Terbatas</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Tertarik Survey Lokasi atau Langsung Amankan Kamar?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Kamar kost kami cepat terisi terutama saat awal semester dan pergantian bulan. Jadwalkan survey Anda sekarang juga sebelum kehabisan slot!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waSurveyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Jadwalkan Survey via WhatsApp</span>
              </a>

              <a
                href="#kamar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-all"
              >
                <span>Lihat Kamar Lagi</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{kosInfo.address}</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
