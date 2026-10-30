export type VerdictType = 'FALSE' | 'PARTIALLY_MISLEADING' | 'LACKS_CONTEXT' | 'UNVERIFIED' | 'VERIFIED';

export type HeritageCategory = 
  | 'Văn hóa vật thể' 
  | 'Phi vật thể' 
  | 'Khảo cổ & Cổ vật' 
  | 'Lễ hội & Tín ngưỡng' 
  | 'Trang phục & Mỹ thuật';

export interface HistoricalSource {
  title: string;
  authorOrAuthority: string;
  context: string;
}

export interface VerificationResultData {
  verdict: VerdictType;
  verdictLabel: string;
  confidenceScore: number;
  heritageItem: string;
  category: HeritageCategory;
  summary: string;
  misinformationPoints: string[];
  historicalTruth: string;
  historicalSources: HistoricalSource[];
  fabricationTechniques: string[];
  impactAssessment: string;
  recommendations: string[];
}

export interface HeritageDossier {
  id: string;
  title: string;
  heritageName: string;
  category: HeritageCategory;
  period: string;
  image: string;
  imageCaption: string;
  rumorSummary: string;
  verdict: VerdictType;
  verdictLabel: string;
  historicalFact: string;
  primarySources: string[];
  debunkAnalysis: string;
  fabricationPattern: string;
  views: number;
}

export interface QuizQuestion {
  id: number;
  claim: string;
  heritageName: string;
  image?: string;
  isFact: boolean;
  explanation: string;
  source: string;
  category: HeritageCategory;
}

export interface CitizenReportItem {
  id: string;
  claimTitle: string;
  heritageName: string;
  sourceUrl?: string;
  claimText: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'VERIFIED_FALSE' | 'VERIFIED_TRUE' | 'INVESTIGATING';
  reporterEmail?: string;
  notes?: string;
}
