import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle, Flag, Loader2 } from 'lucide-react';
import { CitizenReportItem } from '../types/heritage';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted: (report: CitizenReportItem) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onReportSubmitted }) => {
  const [claimTitle, setClaimTitle] = useState('');
  const [heritageName, setHeritageName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [claimText, setClaimText] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimTitle.trim() || !claimText.trim()) {
      setError('Vui lòng điền tiêu đề và nội dung thông tin nghi vấn.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimTitle,
          heritageName,
          sourceUrl,
          claimText,
          reporterEmail,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Không thể gửi phản ánh. Vui lòng thử lại.');
      }

      onReportSubmitted(json.report);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setClaimTitle('');
        setHeritageName('');
        setSourceUrl('');
        setClaimText('');
        setReporterEmail('');
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Lỗi gửi báo cáo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-stone-300 max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-stone-900 text-amber-300 flex items-center justify-center">
              <Flag className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Gửi Báo Cáo Nghi Vấn Tin Giả Di Sản
              </h3>
              <span className="text-[11px] text-stone-500 font-mono block">
                Cổng giám sát cộng đồng · Mã đề tài J01
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Gửi báo cáo thành công!
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Thông tin nghi vấn đã được đưa vào danh sách thẩm định của Đề tài J01. 
              Chân thành cảm ơn sự đóng góp của bạn vì một không gian văn hóa chuẩn xác.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                Tiêu đề ngắn gọn về nghi vấn <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={claimTitle}
                onChange={(e) => setClaimTitle(e.target.value)}
                placeholder="VD: Nghi vấn bán kiếm cổ thời Lê trên hội nhóm Facebook"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                Di sản / Di tích / Cổ vật liên quan
              </label>
              <input
                type="text"
                value={heritageName}
                onChange={(e) => setHeritageName(e.target.value)}
                placeholder="VD: Cổ vật thời Lê, Chùa Dâu, Trống đồng Đông Sơn..."
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                Đường dẫn liên kết bài đăng (Nếu có)
              </label>
              <input
                type="text"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="VD: facebook.com/groups/... hoặc tiktok.com/@..."
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                Mô tả chi tiết nội dung sai lệch nghi vấn <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                placeholder="Mô tả cụ thể thông tin bạn thấy: người đăng tuyên bố điều gì, hình ảnh có điểm gì bất thường, lý do bạn nghi ngờ..."
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                Email của bạn (Để nhận thông báo khi có kết quả đối chiếu)
              </label>
              <input
                type="email"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 font-medium text-stone-700 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Gửi phản ánh</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
