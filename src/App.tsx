/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VerificationSection } from './components/VerificationSection';
import { DossierArchive } from './components/DossierArchive';
import { IdentificationGuide } from './components/IdentificationGuide';
import { HeritageQuiz } from './components/HeritageQuiz';
import { ReportsFeed } from './components/ReportsFeed';
import { ReportModal } from './components/ReportModal';
import { Footer } from './components/Footer';
import { CitizenReportItem } from './types/heritage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('verify');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activePresetClaim, setActivePresetClaim] = useState<string>('');
  const [activePresetType, setActivePresetType] = useState<string>('Khảo cổ & Cổ vật');
  const [reports, setReports] = useState<CitizenReportItem[]>([]);

  // Fetch initial community reports from API
  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reports) {
          setReports(data.reports);
        }
      })
      .catch((err) => {
        console.warn('Lỗi tải danh sách báo cáo:', err);
      });
  }, []);

  const handleSelectPreset = (claimText: string, type: string) => {
    setActivePresetClaim(claimText);
    setActivePresetType(type);
    setActiveTab('verify');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleNewReport = (newReport: CitizenReportItem) => {
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF9] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'verify' && (
          <>
            <Hero
              onSelectPreset={handleSelectPreset}
              onExploreDossiers={() => setActiveTab('dossiers')}
            />
            <VerificationSection
              initialClaim={activePresetClaim}
              initialType={activePresetType}
            />
            <DossierArchive />
          </>
        )}

        {activeTab === 'dossiers' && (
          <div className="py-6">
            <DossierArchive />
          </div>
        )}

        {activeTab === 'heuristics' && (
          <div className="py-6">
            <IdentificationGuide />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="py-6">
            <HeritageQuiz />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="py-6">
            <ReportsFeed
              onOpenReportModal={() => setIsReportModalOpen(true)}
              reportsList={reports}
            />
          </div>
        )}
      </main>

      {/* Modal for Citizen Reports */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={handleNewReport}
      />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
