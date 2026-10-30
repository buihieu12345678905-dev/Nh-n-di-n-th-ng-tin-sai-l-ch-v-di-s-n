import React, { useEffect, useState } from 'react';
import { Flag, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Plus, ExternalLink } from 'lucide-react';
import { CitizenReportItem } from '../types/heritage';

interface ReportsFeedProps {
  onOpenReportModal: () => void;
  reportsList: CitizenReportItem[];
}

export const ReportsFeed: React.FC<ReportsFeedProps> = ({ onOpenReportModal, reportsList }) => {
  const getStatusBadge = (status: CitizenReportItem['status']) => {
    switch (status) {
      case 'VERIFIED_FALSE':
        return {
          label: 'Đã xác định sai lệch',
          className: 'text-red-700 bg-red-50 border-red-200',
        };
      case 'VERIFIED_TRUE':
        return {
          label: 'Thông tin có căn cứ',
          className: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        };
      case 'INVESTIGATING':
        return {
          label: 'Đang thẩm tra thực địa',
          className: 'text-amber-700 bg-amber-50 border-amber-200',
        };
      case 'PENDING_REVIEW':
      default:
        return {
          label: 'Chờ tiếp nhận',
          className: 'text-stone-600 bg-stone-100 border-stone-200',
        };
    }
  };

  return (
    <section id="reports" className="max-w-7xl mx-auto px-6 py-12 border-t border-stone-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 mb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-500 mb-1">
            <span>Module 05</span>
            <span aria-hidden="true">·</span>
            <span>Cổng Giám Sát Phản Ánh Di Sản Từ Nhân Dân</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Dòng Phản Ánh & Giám Sát Cộng Đồng
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Các tin báo nghi vấn tin giả di sản, hiện vật giả cổ rao bán trái phép và hành vi xâm hại di tích được người dân gửi tới hệ thống đề tài J01.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="cursor-pointer px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Gửi nghi vấn mới</span>
        </button>
      </div>

      <div className="space-y-4">
        {reportsList.map((item) => {
          const badge = getStatusBadge(item.status);
          const dateStr = new Date(item.submittedAt).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-300 p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span>MÃ PHẢN ÁNH: {item.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dateStr}</span>
                </div>
                <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded border self-start sm:self-auto ${badge.className}`}>
                  {badge.label}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  {item.claimTitle}
                </h3>
                <span className="text-xs text-amber-900 font-medium block mt-0.5">
                  Đối tượng phản ánh: {item.heritageName}
                </span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans bg-stone-50 p-3 rounded border border-stone-200">
                "{item.claimText}"
              </p>

              {item.notes && (
                <div className="text-xs text-stone-600 border-l-2 border-amber-800 pl-3 py-0.5 bg-amber-50/40 rounded-r">
                  <strong className="text-stone-800 font-mono text-[11px] block uppercase mb-0.5">
                    Ghi chú từ Ban Giám Định J01:
                  </strong>
                  <span>{item.notes}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
