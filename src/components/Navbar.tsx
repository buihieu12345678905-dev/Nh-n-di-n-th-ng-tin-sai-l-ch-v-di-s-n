import React from 'react';
import { ShieldCheck, Flag } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('verify')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-100 flex items-center justify-center font-serif text-lg font-bold">
              J01
            </span>
            <span className="text-xl font-bold tracking-tight text-stone-900 font-serif whitespace-nowrap shrink-0">
              Di Sản Thực Chứng
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('verify')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
              activeTab === 'verify' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
            }`}
          >
            Thẩm Định Nhanh
          </button>
          <button
            onClick={() => setActiveTab('dossiers')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
              activeTab === 'dossiers' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
            }`}
          >
            Hồ Sơ Đính Chính
          </button>
          <button
            onClick={() => setActiveTab('heuristics')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
              activeTab === 'heuristics' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
            }`}
          >
            Quy Trình 5 Bước
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
              activeTab === 'quiz' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
            }`}
          >
            Mắt Thần Di Sản
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
              activeTab === 'reports' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
            }`}
          >
            Cổng Giám Sát Dân Cư
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Flag className="w-3.5 h-3.5 text-amber-400" />
            <span>Gửi Báo Cáo Nghi Vấn</span>
          </button>
        </div>
      </div>
    </header>
  );
};
