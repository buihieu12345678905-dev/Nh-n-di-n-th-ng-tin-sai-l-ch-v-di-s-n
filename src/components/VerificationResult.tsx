import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Share2, 
  Copy, 
  Check, 
  CornerDownRight, 
  ShieldAlert, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { VerificationResultData, VerdictType } from '../types/heritage';

interface VerificationResultProps {
  result: VerificationResultData;
  onReset: () => void;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case 'FALSE':
        return {
          icon: <XCircle className="w-5 h-5 text-red-700" />,
          bgColor: 'bg-red-50 text-red-900 border-red-200',
          titleColor: 'text-red-950',
          label: 'Sai lệch hoàn toàn',
        };
      case 'PARTIALLY_MISLEADING':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-700" />,
          bgColor: 'bg-amber-50 text-amber-900 border-amber-200',
          titleColor: 'text-amber-950',
          label: 'Xuyên tạc một phần',
        };
      case 'LACKS_CONTEXT':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-yellow-700" />,
          bgColor: 'bg-yellow-50 text-yellow-900 border-yellow-200',
          titleColor: 'text-yellow-950',
          label: 'Thiếu bối cảnh lịch sử',
        };
      case 'VERIFIED':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
          bgColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          titleColor: 'text-emerald-950',
          label: 'Thông tin chính xác',
        };
      case 'UNVERIFIED':
      default:
        return {
          icon: <HelpCircle className="w-5 h-5 text-stone-700" />,
          bgColor: 'bg-stone-100 text-stone-900 border-stone-200',
          titleColor: 'text-stone-900',
          label: 'Chưa đủ chứng cứ',
        };
    }
  };

  const badge = getVerdictBadge(result.verdict);

  const handleCopySummary = () => {
    const textToCopy = `[HỆ THỐNG GIÁM ĐỊNH DI SẢN J01]
Đối tượng thẩm định: ${result.heritageItem}
Kết luận: ${result.verdictLabel} (Độ tin cậy: ${result.confidenceScore}%)
Tóm lược: ${result.summary}
Sự thật sử liệu: ${result.historicalTruth}
Nguồn đối chiếu: ${result.historicalSources.map(s => s.title).join(', ')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-300 p-6 shadow-xs space-y-6">
      {/* Header Result Card */}
      <div className={`p-4 rounded-lg border ${badge.bgColor} flex items-start justify-between gap-4`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{badge.icon}</div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-0.5">
              <span>Kết quả giám định</span>
              <span aria-hidden="true">·</span>
              <span>{result.category}</span>
            </div>
            <h3 className={`text-lg font-serif font-bold ${badge.titleColor}`}>
              {result.verdictLabel || badge.label}
            </h3>
            <span className="text-xs text-stone-600 block mt-0.5">
              Đối tượng: <strong className="text-stone-900">{result.heritageItem}</strong>
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-mono block">
            Độ chuẩn xác sử liệu
          </span>
          <span className="text-xl font-bold font-mono tabular-nums text-stone-900">
            {result.confidenceScore}%
          </span>
        </div>
      </div>

      {/* Summary Narrative */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 font-sans">
          Tóm tắt kết luận thẩm định
        </h4>
        <p className="text-sm text-stone-800 leading-relaxed font-sans bg-stone-50 p-3.5 rounded-lg border border-stone-200">
          {result.summary}
        </p>
      </div>

      {/* Misinformation Points & Manipulation Techniques */}
      {result.misinformationPoints && result.misinformationPoints.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Các điểm sai lệch & ngụy tạo được vạch trần:</span>
          </h4>
          <ul className="space-y-2 text-xs text-stone-700">
            {result.misinformationPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-red-50/40 p-2.5 rounded border border-red-100">
                <CornerDownRight className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Historical Truth */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sự thật lịch sử & Hồ sơ khoa học đã chứng thực:</span>
        </h4>
        <div className="bg-emerald-50/40 p-3.5 rounded-lg border border-emerald-200/80 text-xs text-stone-800 leading-relaxed font-sans">
          {result.historicalTruth}
        </div>
      </div>

      {/* Primary Historical Sources */}
      {result.historicalSources && result.historicalSources.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Căn cứ nguồn sử liệu & Văn bản đối chiếu:</span>
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {result.historicalSources.map((source, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-stone-900 font-serif text-sm">{source.title}</span>
                  <span className="text-[11px] text-stone-500 font-mono">{source.authorOrAuthority}</span>
                </div>
                <p className="text-stone-600 leading-relaxed text-[11px] italic">
                  "{source.context}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fabrication Techniques tags */}
      {result.fabricationTechniques && result.fabricationTechniques.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-stone-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
            Thủ thuật đánh lừa nhận thức:
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs text-stone-600">
            {result.fabricationTechniques.map((tech, idx) => (
              <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-[11px] border border-stone-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Utility Actions */}
      <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onReset}
          className="cursor-pointer text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-stone-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Thẩm định nội dung khác</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="cursor-pointer text-xs bg-stone-900 hover:bg-stone-800 text-white font-medium py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-300" />
                <span>Trích xuất biên bản</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
