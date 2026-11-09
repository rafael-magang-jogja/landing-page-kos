import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function WhatsAppFloat({ kosInfo }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = `Halo ${kosInfo.name}, saya ingin menanyakan ketersediaan kamar kost dan jadwal survey. Terima kasih!`;
  const waUrl = getWhatsAppLink(kosInfo.whatsappNumber, defaultMessage);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0 mt-1.5" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Admin Online</p>
            <p className="text-slate-500">Ada pertanyaan seputar kost? Chat kami di WhatsApp!</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Pemilik Kost"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
