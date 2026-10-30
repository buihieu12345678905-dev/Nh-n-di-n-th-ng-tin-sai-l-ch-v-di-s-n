import React from 'react';
import { Search, Compass, BookOpen, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { presetClaims } from '../data/mockCases';

interface HeroProps {
  onSelectPreset: (claimText: string, type: string) => void;
  onExploreDossiers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPreset, onExploreDossiers }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mission & Curatorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-stone-500 font-mono">
              <span>Đề tài J01</span>
              <span aria-hidden="true">·</span>
              <span>Hệ Thống Thẩm Định Sử Liệu & Chống Tin Giả Di Sản</span>
              <span aria-hidden="true">·</span>
              <span>Phiên bản Nghiên cứu 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.15] text-balance">
              Nhận diện & đính chính thông tin sai lệch về di sản văn hóa
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              Nền tảng trí tuệ nhân tạo đối chiếu sử liệu chính thống, hồ sơ khảo cổ và công ước UNESCO 
              nhằm vạch trần các ngụy thư, cổ vật AI giả mạo, luận điệu xuyên tạc lịch sử và thương mại hóa 
              mê tín dị đoan tại Việt Nam.
            </p>

            {/* Curatorial Principles Strip */}
            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-xs text-stone-600">
              <div>
                <span className="block font-semibold text-stone-900 font-sans">Sử Liệu Thực Chứng</span>
                <span className="text-stone-500 text-[11px]">Đại Việt Sử Ký, Đại Nam Thực Lục</span>
              </div>
              <div>
                <span className="block font-semibold text-stone-900 font-sans">Khảo Cổ & Địa Tầng</span>
                <span className="text-stone-500 text-[11px]">Đo niên đại C14, phân tích hợp kim</span>
              </div>
              <div>
                <span className="block font-semibold text-stone-900 font-sans">Pháp Quy Di Sản</span>
                <span className="text-stone-500 text-[11px]">Luật Di sản Văn hóa & UNESCO</span>
              </div>
            </div>

            {/* Quick preset triggers */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                Các nghi vấn sai lệch phổ biến đang được rà soát:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetClaims.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectPreset(item.claim, item.type)}
                    className="cursor-pointer text-xs px-3 py-1.5 rounded bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 transition-all shadow-xs flex items-center gap-1.5 group text-left"
                  >
                    <Search className="w-3 h-3 text-stone-400 group-hover:text-amber-700" />
                    <span className="truncate max-w-[280px] font-medium">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-stone-300 bg-stone-900 shadow-md">
              <img
                src="/src/assets/images/heritage_hero_temple_1793351455210.jpg"
                alt="Không gian di tích đền đài cổ kính Việt Nam"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] object-cover filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-5 text-stone-100">
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200">
                  Hồ sơ tư liệu thực địa
                </span>
                <h3 className="font-serif text-lg font-medium text-white mt-1">
                  Không gian văn hiến ngàn năm & Sự chân xác di sản
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  Mỗi di tích, hiện vật và truyền thuyết đều chứa đựng căn cước văn hóa độc lập của dân tộc, cần được bảo vệ trước các làn sóng tin giả mạng xã hội.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-300 border-t border-stone-700/60 pt-2">
                  <span>Mã số thẩm định: J01-HERITAGE-VERIFY</span>
                  <button
                    onClick={onExploreDossiers}
                    className="cursor-pointer text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2"
                  >
                    Xem 4 hồ sơ mẫu →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
