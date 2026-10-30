import React from 'react';
import { BookMarked, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800 text-xs">
          {/* Col 1 */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-amber-400 text-stone-950 flex items-center justify-center font-serif text-sm font-bold">
                J01
              </span>
              <span className="text-base font-serif font-bold text-white tracking-wide">
                Hệ Thống Thẩm Định Di Sản Thực Chứng
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Đề tài J01: Nhận diện thông tin sai lệch về di sản văn hóa. Ứng dụng trí tuệ nhân tạo 
              và phân tích văn bản sử học để bảo vệ tính chân xác của kho tàng di sản dân tộc.
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Cơ sở dữ liệu đối chiếu: Viện Sử học, Viện Khảo cổ học, Cục Di sản Văn hóa.
            </div>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold block mb-1">
              Khung Tham Chiếu Sử Liệu
            </span>
            <ul className="space-y-1 text-stone-400">
              <li>· Đại Việt Sử Ký Toàn Thư (Ngô Sĩ Liên)</li>
              <li>· Khâm Định Việt Sử Thông Giám Cương Mục (Quốc sử quán triều Nguyễn)</li>
              <li>· Đại Nam Thực Lục & Phủ Biên Tạp Lục</li>
              <li>· Công ước UNESCO 1972 & Luật Di sản Văn hóa Việt Nam</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold block mb-1">
              Phạm Vi Thẩm Quyền
            </span>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Dữ liệu phân tích phục vụ mục đích nghiên cứu học thuật, giáo dục công chúng và hỗ trợ 
              truyền thông báo chí phát hiện thông tin ngụy tạo trên không gian số.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div className="font-sans">
            © 2026 Di Sản Thực Chứng · Mã đề tài J01. Bản quyền nghiên cứu.
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Tiêu chuẩn WCAG AA</span>
            <span aria-hidden="true">·</span>
            <span>Đối chiếu sử liệu chính thống</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
