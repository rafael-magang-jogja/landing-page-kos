import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function FAQ({ faqs, kosInfo }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const waAskMessage = `Halo ${kosInfo.name}, saya punya pertanyaan mengenai sewa kamar yang belum ada di FAQ...`;
  const waUrl = getWhatsAppLink(kosInfo.whatsappNumber, waAskMessage);

  return (
    <section id="faq" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Jawaban lengkap untuk pertanyaan yang paling sering ditanyakan oleh calon penghuni kost.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? CTA */}
        <div className="mt-10 p-6 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-emerald-950">Punya Pertanyaan Lain?</h4>
            <p className="text-xs sm:text-sm text-emerald-800">
              Tim pengelola kami siap membantu menjawab pertanyaan Anda melalui WhatsApp.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Tanya Pengelola</span>
          </a>
        </div>

      </div>
    </section>
  );
}
