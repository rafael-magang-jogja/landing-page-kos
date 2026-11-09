import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Cerita Penghuni</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Mereka yang Pernah Tinggal?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Kenyamanan penghuni adalah prioritas utama kami. Dengarkan langsung pengalaman para penghuni kost.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-lg transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-5 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
