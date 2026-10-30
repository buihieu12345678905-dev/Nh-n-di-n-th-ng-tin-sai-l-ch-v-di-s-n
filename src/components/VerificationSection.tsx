import React, { useState } from 'react';
import { Search, Upload, Image as ImageIcon, X, AlertCircle, Loader2, Sparkles, RefreshCw, FileText } from 'lucide-react';
import { HeritageCategory, VerificationResultData } from '../types/heritage';
import { presetClaims } from '../data/mockCases';
import { VerificationResult } from './VerificationResult';

interface VerificationSectionProps {
  initialClaim?: string;
  initialType?: string;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  initialClaim = '',
  initialType = 'Khảo cổ & Cổ vật',
}) => {
  const [claimText, setClaimText] = useState(initialClaim);
  const [category, setCategory] = useState<HeritageCategory>('Khảo cổ & Cổ vật');
  const [contextInfo, setContextInfo] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResultData | null>(null);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialClaim) {
      setClaimText(initialClaim);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
    if (initialType) {
      setCategory(initialType as HeritageCategory);
    }
  }, [initialClaim, initialType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn tệp định dạng hình ảnh (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Dung lượng hình ảnh tối đa là 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      const base64Data = resultStr.split(',')[1];
      setImageBase64(base64Data);
      setImageMimeType(file.type);
      setImageFileName(file.name);
      setError(null);
    };
    reader.onerror = () => {
      setError('Không thể đọc tệp hình ảnh.');
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageBase64(null);
    setImageMimeType(null);
    setImageFileName(null);
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!claimText.trim()) {
      setError('Vui lòng nhập nội dung hoặc nhận định về di sản cần thẩm định.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: claimText,
          claimType: category,
          contextInfo,
          imageBase64: imageBase64 || undefined,
          mimeType: imageMimeType || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Quá trình đối chiếu sử liệu gặp sự cố.');
      }

      setResult(json.data);
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ thẩm định.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: typeof presetClaims[0]) => {
    setClaimText(preset.claim);
    setCategory(preset.type as HeritageCategory);
    setContextInfo(`Nghi vấn từ cộng đồng mạng về: ${preset.title}`);
    removeImage();
    setError(null);
    setResult(null);
  };

  const clearForm = () => {
    setClaimText('');
    setContextInfo('');
    removeImage();
    setError(null);
    setResult(null);
  };

  return (
    <section id="verify-engine" className="max-w-7xl mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="border-b border-stone-200 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-500 mb-1">
          <span>Module 01</span>
          <span aria-hidden="true">·</span>
          <span>Công Cụ Thẩm Định Tuyên Bố & Đính Chính Sử Liệu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Tra cứu & Đối chiếu Chân xác Sử liệu
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-3xl">
          Nhập một phát ngôn, bài đăng trên mạng xã hội, tin đồn lịch sử hoặc đính kèm ảnh cổ vật nghi vấn.
          Mô hình AI sẽ đối chiếu với kho tàng sử ký chính thống, niên biểu khảo cổ và quy định xếp hạng di sản.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleVerify} className="bg-white rounded-xl border border-stone-300 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Phân loại lĩnh vực di sản
                </label>
                <span className="text-[11px] text-stone-400">Chọn lĩnh vực tương ứng</span>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as HeritageCategory)}
                className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900"
              >
                <option value="Khảo cổ & Cổ vật">Khảo cổ & Cổ vật (Trống đồng, tượng cổ, ấn tín...)</option>
                <option value="Văn hóa vật thể">Văn hóa vật thể (Chùa chiền, đền tháp, thành quách, di tích)</option>
                <option value="Phi vật thể">Phi vật thể (Dân ca, Nhã nhạc, Lễ hội, Ca trù...)</option>
                <option value="Trang phục & Mỹ thuật">Trang phục & Mỹ thuật (Áo dài, hoa văn, biểu tượng rồng/nghê)</option>
                <option value="Lễ hội & Tín ngưỡng">Lễ hội & Tín ngưỡng (Tục thờ, truyền thuyết, lễ nghi)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Nội dung thông tin / Tuyên bố cần thẩm định <span className="text-red-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={clearForm}
                  className="cursor-pointer text-[11px] text-stone-500 hover:text-stone-800 underline"
                >
                  Làm mới ô nhập
                </button>
              </div>
              <textarea
                rows={5}
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                placeholder="Ví dụ: 'Trống đồng Đông Sơn thực chất do người Trung Quốc đúc và truyền bá sang', hoặc 'Chùa Cầu trùng tu xong quét vôi màu lạ làm hỏng di tích'..."
                className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg p-3.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900 leading-relaxed font-sans placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Bối cảnh bổ sung hoặc Nguồn gốc bài đăng (Tùy chọn)
              </label>
              <input
                type="text"
                value={contextInfo}
                onChange={(e) => setContextInfo(e.target.value)}
                placeholder="Ví dụ: Bài đăng viral trên TikTok với 1.2M lượt xem, nhóm buôn đồ cổ Facebook..."
                className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900 placeholder:text-stone-400"
              />
            </div>

            {/* Optional Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Ảnh hiện vật / Ảnh chụp bài đăng nghi vấn (Tùy chọn)
              </label>
              {imageBase64 ? (
                <div className="relative rounded-lg border border-stone-300 overflow-hidden bg-stone-100 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`data:${imageMimeType};base64,${imageBase64}`}
                      alt="Ảnh tải lên"
                      className="w-14 h-14 object-cover rounded border border-stone-200"
                    />
                    <div className="text-xs">
                      <span className="font-medium text-stone-800 block truncate max-w-[220px]">
                        {imageFileName}
                      </span>
                      <span className="text-stone-500 text-[11px]">Đã sẵn sàng đối chiếu hình thái học</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="cursor-pointer p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border border-dashed border-stone-300 hover:border-stone-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/50">
                  <Upload className="w-5 h-5 text-stone-400 mb-1" />
                  <span className="text-xs font-medium text-stone-700">Tải ảnh hiện vật hoặc ảnh chụp màn hình</span>
                  <span className="text-[11px] text-stone-500">Hỗ trợ JPG, PNG (tối đa 8MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer flex-1 py-3 px-5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Đang đối chiếu sử liệu chính thống...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-amber-300" />
                    <span>Bắt Đầu Giám Định Chuyên Sâu</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preset Cases Strip */}
          <div className="bg-stone-100/70 rounded-xl border border-stone-200 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
              Hoặc chọn nhanh vụ việc thực tế để kiểm tra thử:
            </span>
            <div className="space-y-2">
              {presetClaims.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="cursor-pointer w-full text-left p-2.5 rounded bg-white hover:bg-amber-50/50 border border-stone-200 transition-colors flex items-center justify-between group"
                >
                  <div className="truncate mr-2">
                    <span className="text-xs font-semibold text-stone-800 block group-hover:text-amber-900">
                      {preset.title}
                    </span>
                    <span className="text-[11px] text-stone-500 truncate block">
                      {preset.claim}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-stone-100 text-stone-600 rounded shrink-0">
                    {preset.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verification Results or Curatorial Guidance */}
        <div className="lg:col-span-6">
          {isLoading ? (
            <div className="h-full min-h-[460px] bg-white rounded-xl border border-stone-300 p-8 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-amber-800 animate-spin" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                Hệ thống đang truy xuất & giải mã sử liệu
              </h3>
              <p className="text-xs text-stone-600 max-w-md leading-relaxed mb-4">
                Đối chiếu nội dung với Đại Việt Sử Ký Toàn Thư, Khâm Định Việt Sử Thông Giám Cương Mục, 
                hồ sơ địa tầng Viện Khảo cổ học và danh mục Di sản Văn hóa Quốc gia...
              </p>
              <div className="text-[11px] font-mono text-stone-400 animate-pulse">
                Kiểm định phong cách mỹ thuật · Tra cứu niên biểu · Rà soát dấu hiệu ngụy thư
              </div>
            </div>
          ) : result ? (
            <VerificationResult result={result} onReset={clearForm} />
          ) : (
            <div className="h-full bg-white rounded-xl border border-stone-300 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-900 tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Quy Chuẩn Thẩm Định J01</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">
                  Nguyên tắc đối chiếu sử liệu khách quan
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-5">
                  Mỗi kết quả giám định của hệ thống được xây dựng trên 4 trụ cột khoa học:
                </p>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">
                      1. Chính Sử & Cổ Thư Nguyên Bản
                    </span>
                    <span className="text-xs text-stone-600 leading-relaxed block">
                      Ưu tiên tuyệt đối thư tịch cổ có niên đại xuất hiện gần nhất với sự kiện lịch sử, phân biệt rõ huyền sử truyền kỳ với chính sử ghi chép.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">
                      2. Khảo Cổ Học & Khoa Học Tự Nhiên
                    </span>
                    <span className="text-xs text-stone-600 leading-relaxed block">
                      Căn cứ vào địa tầng di chỉ, đo carbon phóng xạ C14, phân tích quang phổ huỳnh quang (XRF) để bác bỏ các tuyên bố ngụy tạo niên đại.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">
                      3. Lịch Sử Mỹ Thuật So Sánh
                    </span>
                    <span className="text-xs text-stone-600 leading-relaxed block">
                      Phân định rạch ròi quy chuẩn mỹ thuật từng triều đại (Lý, Trần, Lê, Mạc, Nguyễn) và đặc trưng văn hóa Đại Việt so với khu vực Đông Á.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">
                      4. Hồ Sơ Di Sản Quốc Gia & UNESCO
                    </span>
                    <span className="text-xs text-stone-600 leading-relaxed block">
                      Căn cứ hồ sơ khoa học lưu trữ tại Cục Di sản Văn hóa và UNESCO để đánh giá các hành vi trùng tu hoặc tuyên bố sai lệch.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-6 flex items-center justify-between text-xs text-stone-500">
                <span>Hệ cơ sở dữ liệu đối chiếu: &gt;1.500 tài liệu lịch sử</span>
                <span className="font-mono text-stone-400">J01-VERIFY-ENGINE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
