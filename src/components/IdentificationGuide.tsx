import React, { useState } from 'react';
import { Search, History, Shield, Cpu, Flame, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  redFlags: string[];
  actionTips: string[];
}

export const IdentificationGuide: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const steps: StepItem[] = [
    {
      number: '01',
      title: 'Thẩm tra Xuất xứ & Hành trình tư liệu (Provenance)',
      subtitle: 'Tìm kiếm nguồn gốc nguyên bản và hồ sơ khai quật',
      icon: <History className="w-5 h-5 text-amber-900" />,
      summary: 'Mọi cổ vật, bảo vật hay di tích chân xác đều phải có lai lịch, vị trí địa tầng khai quật cụ thể hoặc được ghi chép trong thư tịch cổ đáng tin cậy. Nếu một món đồ được rao là "đào được dưới lòng đất" mà không có cơ quan khảo cổ tham gia, 99% đó là hàng ngụy chế.',
      redFlags: [
        'Người bán tự nhận "đồ gia truyền hoàng tộc" nhưng không có phả hệ chứng minh.',
        'Trích dẫn các "sách cổ vô danh" hoặc bản chép tay không rõ niên đại xuất xứ.',
        'Mập mờ về địa điểm phát hiện, không có biên bản bàn giao khảo cổ học.',
      ],
      actionTips: [
        'Tra cứu trong hệ thống Danh mục Bảo vật Quốc gia do Thủ tướng Chính phủ công nhận.',
        'Yêu cầu giấy chứng nhận giám định khoa học từ các bảo tàng công lập uy tín.',
        'Đối chiếu với các đợt thám sát khảo cổ học chính thức của Viện Khảo cổ học.',
      ],
    },
    {
      number: '02',
      title: 'So sánh Phong cách Mỹ thuật & Hoa văn Triều đại (Iconography)',
      subtitle: 'Phân biệt mỹ thuật Lý, Trần, Lê, Nguyễn và các luồng ngoại lai',
      icon: <Search className="w-5 h-5 text-amber-900" />,
      summary: 'Mỗi triều đại Việt Nam mang một ngữ hệ thẩm mỹ riêng biệt: Rồng thời Lý uốn lượn hình sin mềm mại, rồng thời Trần khỏe khoắn mập mạp, rồng thời Lê vẩy rồng sắc nhọn, rồng thời Nguyễn đầu lớn bờm uy nghiêm. Sự xuất hiện của các hoa văn lai căng, sừng hươu gồ ghề kiểu Minh-Thanh hoặc sư tử đá Bắc Kinh là dấu hiệu sai lệch.',
      redFlags: [
        'Tuyên bố tượng Phật thời Lý nhưng hoa văn cánh sen lại mang phong cách Tây Tạng.',
        'Trang phục thời Lê nhưng kết cấu áo và hoa văn thêu rồng lại là thời Thanh.',
        'Linh vật sư tử đá há miệng dữ tợn trước cửa đền chùa Việt cổ.',
      ],
      actionTips: [
        'Tham khảo bộ quy chuẩn nhận diện linh vật Việt do Cục Mỹ thuật, Nhiếp ảnh và Triển lãm ban hành.',
        'So sánh hình thái đồ gốm, hoa văn hoa cúc, hoa sen, lá đề đặc trưng từng thời kỳ.',
        'Không để các chi tiết rồng phượng cận đại đánh lừa niên đại thực tế.',
      ],
    },
    {
      number: '03',
      title: 'Tra cứu Danh mục Di sản & Hồ sơ UNESCO (Official Registries)',
      subtitle: 'Xác minh hiện trạng pháp lý và hồ sơ bảo tồn di tích',
      icon: <Shield className="w-5 h-5 text-amber-900" />,
      summary: 'Các thông tin về việc "trùng tu làm hỏng di tích" hoặc "di sản bị UNESCO tước bằng" thường xuyên bị bóp méo để giật gân. Việc trùng tu di sản tại Việt Nam được quản lý nghiêm ngặt bởi Luật Di sản Văn hóa và luôn có hội đồng nghiệm thu khoa học.',
      redFlags: [
        'Bài đăng cắt ghép ảnh cận cảnh màu vôi mới để cáo buộc "phá nát di sản".',
        'Tin đồn lan truyền "UNESCO rút bằng di sản thế giới" mà không có quyết định chính thức.',
        'Xâm phạm ranh giới bảo vệ cấp I, cấp II của di tích quốc gia.',
      ],
      actionTips: [
        'Kiểm tra cổng thông tin Cục Di sản Văn hóa (dsvh.gov.vn) và Trung tâm Di sản Thế giới UNESCO (whc.unesco.org).',
        'Đọc kỹ báo cáo thuyết minh phương án tu bổ thay vì chỉ nhìn vào một bức ảnh chụp trên mạng xã hội.',
        'Tìm hiểu nguyên tắc "bảo tồn thích nghi" và "tính chân xác của cấu kiện".',
      ],
    },
    {
      number: '04',
      title: 'Phát hiện Hình ảnh AI Tạo sinh & Hiện vật Giả cổ (Synthetic Flaws)',
      subtitle: 'Nhận biết các lỗi giải phẫu và chất liệu phi thực tế của công nghệ AI',
      icon: <Cpu className="w-5 h-5 text-amber-900" />,
      summary: 'Các mô hình AI tạo sinh (Midjourney, DALL-E, Stable Diffusion) thường tạo ra những bức ảnh "phục dựng tổ tiên", "cổ vật phát sáng", "đền đài hoành tráng" nhưng chứa đầy lỗi giải phẫu ngón tay, kiến trúc lai căng Trung Quốc - Nhật Bản, và các bề mặt nhẵn bóng phi lý.',
      redFlags: [
        'Cổ vật bằng đồng hoặc đá nhưng bề mặt phản chiếu ánh sáng nhựa dẻo hoặc kim loại viễn tưởng.',
        'Trang phục tổ tiên có vạt áo quấn lộn xộn, hoa văn thêu biến dạng không đối xứng.',
        'Kiến trúc mái ngói có các góc đao cong vút sai quy cách mộng xà gỗ truyền thống Việt.',
      ],
      actionTips: [
        'Phóng to ảnh (zoom 200%) để kiểm tra chi tiết bàn tay, mắt, hoa văn biên mép.',
        'Tìm kiếm nguồn ảnh ngược bằng Google Lens để kiểm tra xem ảnh xuất hiện từ tài khoản AI nào.',
        'Cảnh giác với các tiêu đề "Lần đầu tiên công bố hình ảnh thật 100% của vua chúa ngàn năm trước".',
      ],
    },
    {
      number: '05',
      title: 'Bóc tách Động cơ Giật gân & Mê tín Thương mại hóa (Sensationalism)',
      subtitle: 'Nhận diện các thủ thuật câu view và trục lợi tâm linh',
      icon: <Flame className="w-5 h-5 text-amber-900" />,
      summary: 'Một lượng lớn tin giả về di sản được tạo ra nhằm kích động mê tín dị đoan (bùa chú, phong thủy yểm bùa, kho báu hoàng gia chôn giấu) để bán hàng phong thủy, đồ mỹ nghệ dỏm, hoặc tăng tương tác kênh cá nhân.',
      redFlags: [
        'Tiêu đề giật gân: "Bí mật rùng rợn bị chôn giấu", "Lời nguyền lăng tẩm hoàng đế".',
        'Kèm đường link mua bán vật phẩm "đã khai quang", "trừ tà bùa chú".',
        'Kêu gọi cúng dường vào tài khoản cá nhân núp bóng "trùng tu di sản tâm linh".',
      ],
      actionTips: [
        'Luôn đặt câu hỏi: Ai là người hưởng lợi tài chính từ bài đăng này?',
        'Phân biệt rõ ràng giữa tín ngưỡng dân gian lành mạnh với hành vi mê tín trục lợi.',
        'Báo cáo các tài khoản buôn bán hiện vật nghi vấn tới cơ quan chức năng qua Cổng J01.',
      ],
    },
  ];

  return (
    <section id="heuristics" className="max-w-7xl mx-auto px-6 py-12 border-t border-stone-200">
      <div className="border-b border-stone-200 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-500 mb-1">
          <span>Module 03</span>
          <span aria-hidden="true">·</span>
          <span>Sổ Tay Phương Pháp Luận & Thẩm Định Chuyên Sâu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Quy Trình 5 Bước Nhận Diện Tin Giả Di Sản
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-3xl">
          Bộ tiêu chuẩn kiểm chứng khoa học dành cho người nghiên cứu, báo chí và công chúng 
          nhằm độc lập phân định giữa sự thật lịch sử và thông tin ngụy tạo.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isExpanded = expandedStep === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-300 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setExpandedStep(isExpanded ? null : idx)}
                className="cursor-pointer w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    BƯỚC {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      {step.title}
                    </h3>
                    <span className="text-xs text-stone-500 font-sans block mt-0.5">
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded-full text-stone-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-stone-200/80 space-y-5 bg-stone-50/40">
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    {step.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Red flags */}
                    <div className="p-4 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-900 block font-mono">
                        Dấu hiệu cảnh báo nguy cơ (Red Flags):
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {step.redFlags.map((flag, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action tips */}
                    <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block font-mono">
                        Hành động xác minh khuyến nghị:
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {step.actionTips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
