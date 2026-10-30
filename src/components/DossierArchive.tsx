import React, { useState } from 'react';
import { BookOpen, ShieldCheck, AlertCircle, ArrowUpRight, X, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { HeritageCategory, HeritageDossier } from '../types/heritage';
import { mockDossiers } from '../data/mockCases';

export const DossierArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDossier, setActiveDossier] = useState<HeritageDossier | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả hồ sơ' },
    { id: 'Khảo cổ & Cổ vật', label: 'Khảo cổ & Cổ vật' },
    { id: 'Văn hóa vật thể', label: 'Di tích & Kiến trúc' },
    { id: 'Trang phục & Mỹ thuật', label: 'Trang phục & Hoa văn' },
  ];

  const filteredDossiers = selectedCategory === 'all'
    ? mockDossiers
    : mockDossiers.filter((d) => d.category === selectedCategory);

  return (
    <section id="dossiers" className="max-w-7xl mx-auto px-6 py-12 border-t border-stone-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-500 mb-1">
            <span>Module 02</span>
            <span aria-hidden="true">·</span>
            <span>Kho Lưu Trữ Hồ Sơ Giám Định Đã Thẩm Tra</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Hồ Sơ Đính Chính Di Sản Điển Hình
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Các chuyên án rà soát thông tin sai lệch về di tích lịch sử, bảo vật quốc gia và văn hóa bản địa đã được các chuyên gia đối chiếu và công bố chính thức.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Controls as buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDossiers.map((dossier) => (
          <article
            key={dossier.id}
            onClick={() => setActiveDossier(dossier)}
            className="group cursor-pointer bg-white rounded-xl border border-stone-300 overflow-hidden shadow-xs hover:border-amber-900/60 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={dossier.image}
                  alt={dossier.heritageName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <span className="font-mono text-[10px] text-amber-300 block uppercase tracking-wider">
                      {dossier.period}
                    </span>
                    <span className="font-serif font-medium text-sm line-clamp-1">
                      {dossier.heritageName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 space-y-3">
                {/* Metadata without pills */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                  <span>{dossier.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className={dossier.verdict === 'FALSE' ? 'text-red-700 font-semibold' : 'text-amber-700 font-semibold'}>
                    {dossier.verdictLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{dossier.views.toLocaleString()} lượt đọc</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                  {dossier.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {dossier.rumorSummary}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span className="truncate max-w-[260px] text-stone-500 font-mono text-[11px]">
                {dossier.fabricationPattern}
              </span>
              <span className="flex items-center gap-1 font-semibold text-stone-900 group-hover:text-amber-900 group-hover:translate-x-0.5 transition-all shrink-0">
                Xem sử liệu đối chiếu <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Detail Dossier View */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-stone-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 p-5 flex items-start justify-between z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
                  <span>Mã hồ sơ: {activeDossier.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDossier.category}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {activeDossier.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDossier(null)}
                className="cursor-pointer p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Media banner */}
              <div className="rounded-lg overflow-hidden border border-stone-300 bg-stone-900 relative">
                <img
                  src={activeDossier.image}
                  alt={activeDossier.heritageName}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-stone-100 text-xs text-stone-600 italic border-t border-stone-200">
                  {activeDossier.imageCaption}
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-900 block font-mono">
                    Luận điệu đồn thổi / Xuyên tạc:
                  </span>
                  <p className="text-xs text-stone-800 leading-relaxed">
                    {activeDossier.rumorSummary}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block font-mono">
                    Sự thật lịch sử đã chứng thực:
                  </span>
                  <p className="text-xs text-stone-800 leading-relaxed">
                    {activeDossier.historicalFact}
                  </p>
                </div>
              </div>

              {/* Deep Analysis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-mono">
                  Bản chất của thủ thuật ngụy tạo:
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-200">
                  {activeDossier.debunkAnalysis}
                </p>
              </div>

              {/* Primary Sources */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 font-mono">
                  Tài liệu & Thư tịch cổ làm bằng chứng đối chiếu:
                </h4>
                <ul className="space-y-2">
                  {activeDossier.primarySources.map((source, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-200">
                      <BookOpen className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-stone-200 p-4 bg-stone-50 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-mono">
                Cơ sở dữ liệu Đề tài J01 · Trung tâm Sử liệu Quốc gia
              </span>
              <button
                onClick={() => setActiveDossier(null)}
                className="cursor-pointer px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium transition-colors"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
