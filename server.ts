import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '12mb' }));

// Server-side GoogleGenAI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory store for citizen reports
interface CitizenReport {
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

const communityReports: CitizenReport[] = [
  {
    id: 'rep-01',
    claimTitle: 'Rao bán "Ấn ngọc Hoàng đế Quang Trung" nghìn năm tuổi trên mạng',
    heritageName: 'Ấn tín Triều Tây Sơn / Cổ vật hoàng gia',
    sourceUrl: 'facebook.com/group/co-vat-viet-nam',
    claimText: 'Một tài khoản mạng xã hội đăng bán "Ấn ngọc nguyên khối khắc chữ Chiếu mệnh chi bảo đời vua Quang Trung" với giá hàng trăm triệu, kèm hình ảnh rồng 5 móng phong cách thời Minh.',
    submittedAt: '2026-10-28T09:15:00Z',
    status: 'VERIFIED_FALSE',
    notes: 'Đã xác minh: Vua Quang Trung triều Tây Sơn dùng ấn đồng/ấn ngọc có hoa văn đặc trưng riêng biệt, hiện vật rao bán là sản phẩm chế tác đá nhân tạo hiện đại từ xưởng mỹ nghệ giả mạo.',
  },
  {
    id: 'rep-02',
    claimTitle: 'Xuyên tạc nguồn gốc Áo dài Ngũ thân du nhập từ trang phục phương Bắc',
    heritageName: 'Áo dài truyền thống / Áo ngũ thân',
    sourceUrl: 'tiktok.com/@su-viet-bi-an',
    claimText: 'Video TikTok khẳng định người Việt không hề có trang phục riêng mà toàn bộ áo dài ngũ thân là sao chép y nguyên sườn xám Mãn Thanh.',
    submittedAt: '2026-10-25T14:30:00Z',
    status: 'VERIFIED_FALSE',
    notes: 'Sử liệu Đại Nam Thực Lục khẳng định chúa Nguyễn Phúc Khoát định chế áo ngũ thân năm 1744 dựa trên giao lĩnh và phong cách người Việt Đàng Trong, phân biệt rõ với xường xám Thượng Hải ra đời mãi thập niên 1920.',
  },
  {
    id: 'rep-03',
    claimTitle: 'Hình ảnh phục dựng tượng Phật thời Lý bằng AI có chi tiết bàn tay 6 ngón',
    heritageName: 'Điêu khắc tượng Phật chùa Phật Tích (Bắc Ninh)',
    sourceUrl: 'threads.net/@heritage_ai_art',
    claimText: 'Trang cá nhân đăng tải hình ảnh tự xưng "Phục dựng 3D nguyên bản tượng Phật chùa Phật Tích năm 1057" nhưng có hoa văn lai căng Tây Tạng và lỗi giải phẫu ngón tay do AI tạo sinh.',
    submittedAt: '2026-10-29T11:00:00Z',
    status: 'INVESTIGATING',
    notes: 'Hồ sơ Bảo vật Quốc gia lưu tại Bảo tàng Lịch sử Quốc gia đối chiếu cho thấy hoa văn cánh sen và tỷ lệ pho tượng thời Lý hoàn toàn khác biệt.',
  },
];

// Verification schema for Gemini structured output
const verificationSchema = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      description: 'Mã phán quyết: FALSE (Sai hoàn toàn), PARTIALLY_MISLEADING (Xuyên tạc một phần), LACKS_CONTEXT (Thiếu bối cảnh), UNVERIFIED (Chưa đủ căn cứ), VERIFIED (Thông tin chính xác)',
    },
    verdictLabel: {
      type: Type.STRING,
      description: 'Nhãn thẩm định ngắn gọn bằng tiếng Việt',
    },
    confidenceScore: {
      type: Type.INTEGER,
      description: 'Độ tin cậy của phân tích sử liệu (0-100)',
    },
    heritageItem: {
      type: Type.STRING,
      description: 'Tên di sản, di tích, cổ vật hoặc hiện tượng văn hoá liên quan',
    },
    category: {
      type: Type.STRING,
      description: 'Phân loại: Di sản vật thể, Phi vật thể, Khảo cổ & Cổ vật, Tín ngưỡng & Lễ hội, Trang phục & Mỹ thuật',
    },
    summary: {
      type: Type.STRING,
      description: 'Tóm tắt nhận định thẩm định cốt lõi trong 2-3 câu',
    },
    misinformationPoints: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Danh sách các điểm sai lệch, ngụy tạo, hoặc bóp méo cụ thể trong thông tin được nêu',
    },
    historicalTruth: {
      type: Type.STRING,
      description: 'Sự thật lịch sử, tư liệu khảo cổ và hồ sơ khoa học chính xác được công nhận',
    },
    historicalSources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'Tên nguồn sử liệu hoặc văn bản di sản (VD: Đại Việt Sử Ký Toàn Thư, UNESCO Dossier...)' },
          authorOrAuthority: { type: Type.STRING, description: 'Tác giả, cơ quan nghiên cứu hoặc thẩm quyền quản lý' },
          context: { type: Type.STRING, description: 'Trích dẫn vắn tắt hoặc bối cảnh chứng minh' },
        },
        required: ['title', 'authorOrAuthority', 'context'],
      },
      description: 'Các nguồn thư tịch, cổ thư, nghiên cứu khảo cổ học chính thống làm đối chứng',
    },
    fabricationTechniques: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Các thủ thuật lan truyền tin sai lệch: Ngụy thư, Tráo đổi niên đại, Ảnh AI giả cổ, Giật gân thương mại hoá tâm linh...',
    },
    impactAssessment: {
      type: Type.STRING,
      description: 'Tác hại của thông tin sai lệch này đối với nhận thức công chúng và bảo tồn di sản',
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Khuyến nghị xác minh và ứng xử dành cho người đọc, nhà nghiên cứu và truyền thông',
    },
  },
  required: [
    'verdict',
    'verdictLabel',
    'confidenceScore',
    'heritageItem',
    'category',
    'summary',
    'misinformationPoints',
    'historicalTruth',
    'historicalSources',
    'fabricationTechniques',
    'impactAssessment',
    'recommendations',
  ],
};

// POST /api/verify
app.post('/api/verify', async (req, res) => {
  try {
    const { claim, claimType, contextInfo, imageBase64, mimeType } = req.body;

    if (!claim || typeof claim !== 'string') {
      return res.status(400).json({ error: 'Nội dung thông tin cần thẩm định không được để trống.' });
    }

    const systemPrompt = `Bạn là Chuyên gia Cao cấp của Hệ thống Giám định & Đính chính Thông tin Sai lệch về Di sản Văn hóa Việt Nam và Thế giới (Đề tài J01 - Di Sản Thực Chứng).
Nhiệm vụ của bạn:
1. Tiếp nhận và phân tích kỹ lưỡng thông tin, tin đồn, bài đăng mạng xã hội, hoặc tuyên bố liên quan đến di sản văn hóa (vật thể, phi vật thể, cổ vật, di tích lịch sử, phong tục, mỹ thuật cổ truyền).
2. Đối chiếu nghiêm ngặt với các nguồn sử liệu chính thống của Việt Nam (Đại Việt Sử Ký Toàn Thư, Khâm Định Việt Sử Thông Giám Cương Mục, Đại Nam Thực Lục, Việt Điện U Linh, Lĩnh Nam Chích Quái...), các công trình nghiên cứu của Viện Sử học, Viện Khảo cổ học, Bảo tàng Lịch sử Quốc gia, các hồ sơ xếp hạng Di tích Quốc gia Đặc biệt và Di sản Thế giới của UNESCO.
3. Vạch trần chính xác các thủ thuật bóp méo: ngụy tạo ngụy thư, thương mại hóa tâm linh, ngụy chế cổ vật giả mạo, nhầm lẫn phong cách mỹ thuật các triều đại (Lý, Trần, Lê sơ, Mạc, Nguyễn...), xuyên tạc nguồn gốc văn hóa bản địa, hình ảnh AI tạo sinh giả di sản.
4. Trình bày khách quan, chuẩn xác, giàu hàm lượng khoa học, ngôn từ uy tín, đĩnh đạc và mang tính xây dựng.`;

    let parts: any[] = [];

    let userText = `YÊU CẦU THẨM ĐỊNH THÔNG TIN DI SẢN:
Nội dung thông tin / bài đăng: "${claim}"`;

    if (claimType) {
      userText += `\nLoại hình tiếp nhận: ${claimType}`;
    }
    if (contextInfo) {
      userText += `\nBối cảnh bổ sung: ${contextInfo}`;
    }

    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: imageBase64,
        },
      });
      userText += `\n(Lưu ý: Có đính kèm hình ảnh hiện vật/ảnh chụp/poster truyền thông để đối chiếu dấu hiệu AI, can thiệp chỉnh sửa hoặc sai lệch phong cách thời kỳ)`;
    }

    parts.push({ text: userText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: verificationSchema,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Lỗi thẩm định di sản:', error);
    return res.status(500).json({
      error: 'Không thể hoàn tất quá trình thẩm định. Vui lòng thử lại.',
      details: error?.message || 'Lỗi xử lý máy chủ',
    });
  }
});

// GET /api/reports
app.get('/api/reports', (req, res) => {
  return res.json({ success: true, reports: communityReports });
});

// POST /api/reports
app.post('/api/reports', (req, res) => {
  const { claimTitle, heritageName, sourceUrl, claimText, reporterEmail } = req.body;
  if (!claimTitle || !claimText) {
    return res.status(400).json({ error: 'Tiêu đề và nội dung phản ánh không được để trống.' });
  }

  const newReport: CitizenReport = {
    id: `rep-${Date.now().toString().slice(-4)}`,
    claimTitle,
    heritageName: heritageName || 'Chưa xác định',
    sourceUrl,
    claimText,
    submittedAt: new Date().toISOString(),
    status: 'PENDING_REVIEW',
    reporterEmail,
  };

  communityReports.unshift(newReport);
  return res.json({ success: true, report: newReport });
});

// Dev vs Prod Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
