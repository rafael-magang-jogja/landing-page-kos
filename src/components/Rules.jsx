import React from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Rules({ rules }) {
  return (
    <section id="aturan" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Tata Tertib Kost</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Peraturan Demi Kenyamanan Bersama
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Kami berkomitmen menjaga lingkungan tempat tinggal yang tenang, bersih, sopan, dan aman bagi seluruh penghuni.
          </p>
        </div>

        {/* Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rules.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5 hover:border-emerald-200 hover:shadow-md transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {item.rule}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note banner */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Catatan Pengelola:</strong> Peraturan dibuat semata-mata demi keamanan, privasi, dan kenyamanan istirahat Anda selama tinggal bersama kami.
          </span>
        </div>

      </div>
    </section>
  );
}
