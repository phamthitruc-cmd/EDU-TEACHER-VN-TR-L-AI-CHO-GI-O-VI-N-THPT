import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to check API Key
function checkAi() {
  if (!apiKey) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY trên hệ thống server.');
  }
}

// B2: Soạn kế hoạch bài dạy (Công văn 5512)
app.post('/api/generate-lesson-plan', async (req: Request, res: Response) => {
  try {
    checkAi();
    const {
      lessonTitle,
      subject,
      grade,
      curriculum,
      duration,
      objectives,
      content,
      teachingMethods,
      referenceText,
      teacherInfo,
    } = req.body;

    const prompt = `
Bạn là một chuyên gia giáo dục sư phạm THPT tại Việt Nam, am hiểu sâu sắc Chương trình GDPT 2018 và quy định soạn Kế hoạch bài dạy (Giáo án) theo Công văn số 5512/BGDĐT-GDTrH của Bộ Giáo dục và Đào tạo.

Hãy soạn một KẾ HOẠCH BÀI DẠY hoàn chỉnh, chất lượng cao, bài bản và chi tiết cho giáo viên THPT với thông tin sau:
- Tên bài học: ${lessonTitle || 'Bài 1: Làm quen với Trí tuệ nhân tạo'}
- Môn học: ${subject || 'Tin học'}
- Lớp: ${grade || 'Lớp 12'}
- Bộ sách giáo khoa: ${curriculum || 'Kết nối tri thức với cuộc sống'}
- Thời lượng: ${duration || '2 tiết'}
- Yêu cầu cần đạt mong muốn: ${objectives || 'Theo chuẩn chương trình GDPT 2018'}
- Nội dung trọng tâm: ${content || 'Kiến thức cốt lõi của bài'}
- Phương pháp / kĩ thuật dạy học: ${teachingMethods || 'Dạy học giải quyết vấn đề, thảo luận nhóm, khăn trải bàn, kĩ thuật KWL'}
${teacherInfo ? `- Thông tin giáo viên: ${teacherInfo.fullName || 'Giáo viên'}, Trường: ${teacherInfo.school || 'THPT'}, Môn: ${teacherInfo.subject || subject}` : ''}
${referenceText ? `- Tài liệu tham khảo SGK/SGV trích xuất:\n${referenceText.slice(0, 3000)}` : ''}

YÊU CẦU CẤU TRÚC BẮT BUỘC THEO CÔNG VĂN 5512:
I. MỤC TIÊU
1. Kiến thức: Nêu rõ các kiến thức học sinh tiếp thu và vận dụng được.
2. Năng lực:
   - Năng lực chung: Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo.
   - Năng lực đặc thù của môn học: Nêu rõ 2-3 năng lực chuyên biệt.
3. Phẩm chất: Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm (chọn các phẩm chất phù hợp nổi bật trong bài).

II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
1. Chuẩn bị của Giáo viên: SGK, SGV, kế hoạch bài dạy, bài giảng trình chiếu (slide), phiếu học tập, đồ dùng trực quan/thí nghiệm/mô hình nếu có.
2. Chuẩn bị của Học sinh: SGK, vở ghi, đồ dùng học tập, chuẩn bị bài trước ở nhà.

III. TIẾN TRÌNH DẠY HỌC
Tiến trình gồm 4 hoạt động chuẩn:
- Hoạt động 1: Mở đầu / Khởi động (Xác định vấn đề / nhiệm vụ học tập)
- Hoạt động 2: Hình thành kiến thức mới
- Hoạt động 3: Luyện tập
- Hoạt động 4: Vận dụng (Gắn kiến thức với thực tiễn)

ĐẶC BIỆT LƯU Ý: Với MỖI HOẠT ĐỘNG, phải trình bày đầy đủ và rành mạch 5 nội dung:
a) Mục tiêu
b) Nội dung (Nhiệm vụ cụ thể giao cho học sinh)
c) Sản phẩm (Câu trả lời, kết quả thực hiện, phiếu học tập hoàn thành)
d) Tổ chức thực hiện: Trình bày chi tiết theo 4 bước rõ ràng:
   - Bước 1: Chuyển giao nhiệm vụ (Hoạt động của Giáo viên)
   - Bước 2: Thực hiện nhiệm vụ (Hoạt động của Học sinh, GV quan sát hỗ trợ)
   - Bước 3: Báo cáo, thảo luận (Hoạt động của Học sinh đại diện/các nhóm)
   - Bước 4: Kết luận, nhận định (Giáo viên đánh giá, chốt chuẩn kiến thức)

IV. KIỂM TRA VÀ ĐÁNH GIÁ
- Đánh giá thường xuyên trong tiết dạy (công cụ quan sát, phiếu đánh giá, câu hỏi trắc nghiệm/vấn đáp).
- Tiêu chí đánh giá sản phẩm học tập của học sinh.

V. ĐIỀU CHỈNH SAU BÀI DẠY
- Gợi ý những điểm giáo viên cần lưu ý hoặc điều chỉnh thời gian, phương pháp cho các lớp có năng lực khác nhau.

Hãy trình bày bằng Markdown thật rõ ràng, trang trọng, sư phạm, các đề mục đánh số La Mã và số thứ tự chuẩn mực.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      lessonPlan: response.text,
    });
  } catch (error: any) {
    console.error('Error generating lesson plan:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Lỗi khi tạo kế hoạch bài dạy.',
    });
  }
});

// B3: Trình chiếu Slide 16:9
app.post('/api/generate-slides', async (req: Request, res: Response) => {
  try {
    checkAi();
    const {
      lessonTitle,
      subject,
      grade,
      curriculum,
      lessonContent,
      slideCount = 8,
      teacherInfo,
    } = req.body;

    const prompt = `
Bạn là chuyên gia thiết kế bài giảng trình chiếu đa phương tiện cho giáo viên THPT.
Hãy tạo dàn ý và nội dung bài thuyết trình slide tỷ lệ chuẩn 16:9 cho bài học sau:
- Tên bài học: ${lessonTitle || 'Bài 1: Làm quen với Trí tuệ nhân tạo'}
- Môn học: ${subject || 'Tin học'}
- Lớp: ${grade || 'Lớp 12'}
- Bộ sách: ${curriculum || 'Kết nối tri thức với cuộc sống'}
- Số lượng slide mong muốn: khoảng ${slideCount} slide.
- Nội dung trọng tâm bài học: ${lessonContent || 'Tập trung kiến thức cốt lõi, ví dụ thực tế và bài tập củng cố'}
${teacherInfo ? `- Giáo viên: ${teacherInfo.fullName || ''}, Trường: ${teacherInfo.school || ''}` : ''}

Hãy trả về định dạng JSON hợp lệ (không kèm văn bản ngoài JSON) theo cấu trúc sau:
{
  "themeTitle": "Tiêu đề toàn bài",
  "subject": "Môn học",
  "grade": "Khối lớp",
  "slides": [
    {
      "slideNumber": 1,
      "type": "intro",
      "title": "Tên bài học",
      "subtitle": "Phụ đề / Môn học & Khối lớp",
      "bullets": ["Giáo viên hướng dẫn: ...", "Trường: ...", "Mục tiêu bài học ngắn gọn"],
      "teacherNotes": "Lời dẫn nhập của giáo viên khi mở đầu slide này",
      "visualSuggestion": "Gợi ý hình ảnh nền hoặc đồ họa minh họa (vd: Hình ảnh về ...)",
      "badge": "Khởi động"
    },
    ...
  ]
}

Lưu ý:
- Slide 1: Slide bìa/mở đầu giới thiệu bài học & giáo viên.
- Slide 2: Mục tiêu bài học (Yêu cầu cần đạt).
- Các slide giữa: Chia nhỏ kiến thức từng phần rõ ràng, súc tích (mỗi bullet từ 1-2 dòng, không viết văn xuôi dài dòng trên slide).
- Slide áp chót: Luyện tập / Câu hỏi củng cố nhanh có tương tác.
- Slide cuối: Vận dụng & Hướng dẫn tự học ở nhà.
- Gợi ý hình ảnh (visualSuggestion) phải chi tiết, miêu tả hình ảnh/sơ đồ/biểu đồ sư phạm trực quan phù hợp.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating slides:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Lỗi khi tạo slide bài giảng.',
    });
  }
});

// B4: Ngân hàng câu hỏi kiểm tra
app.post('/api/generate-exam-questions', async (req: Request, res: Response) => {
  try {
    checkAi();
    const {
      subject,
      grade,
      topic,
      questionCount = 10,
      cognitiveLevels, // e.g. ["Nhận biết", "Thông hiểu", "Vận dụng", "Vận dụng cao"]
      questionType, // e.g. "Trắc nghiệm 4 lựa chọn (A, B, C, D)", "Trắc nghiệm Đúng / Sai (Định dạng 2025)", "Trả lời ngắn", "Tự luận", "Hỗn hợp đề thi 2025"
      referenceText,
    } = req.body;

    const prompt = `
Bạn là chuyên gia khảo thí và đánh giá chất lượng giáo dục THPT tại Việt Nam, đặc biệt am hiểu định dạng cấu trúc đề thi tốt nghiệp THPT mới từ năm 2025 của Bộ GD&ĐT.

Hãy xây dựng một BỘ CÂU HỎI KIỂM TRA ĐÁNH GIÁ cho:
- Môn học: ${subject || 'Tin học'}
- Khối lớp: ${grade || 'Lớp 12'}
- Chủ đề / Bài học: ${topic || 'Bài 1: Làm quen với Trí tuệ nhân tạo'}
- Tổng số câu hỏi: ${questionCount} câu
- Các mức độ nhận thức: ${Array.isArray(cognitiveLevels) ? cognitiveLevels.join(', ') : 'Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao'}
- Dạng câu hỏi yêu cầu: ${questionType || 'Trắc nghiệm 4 phương án'}
${referenceText ? `- Dữ liệu tham khảo trích từ SGK/SGV:\n${referenceText.slice(0, 3000)}` : ''}

YÊU CẦU:
Trả về kết quả dưới định dạng JSON hợp lệ (không kèm chữ ngoài JSON) theo schema:
{
  "subject": "${subject}",
  "grade": "${grade}",
  "topic": "${topic}",
  "matrixSummary": {
    "recognitionCount": 0,
    "understandingCount": 0,
    "applicationCount": 0,
    "highApplicationCount": 0,
    "total": ${questionCount}
  },
  "questions": [
    {
      "id": 1,
      "questionNumber": 1,
      "type": "multiple_choice", // multiple_choice | true_false | short_answer | essay
      "cognitiveLevel": "Nhận biết", // Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao
      "content": "Nội dung câu hỏi rõ ràng, chính xác khoa học...",
      "options": [
        {"key": "A", "text": "Nội dung phương án A"},
        {"key": "B", "text": "Nội dung phương án B"},
        {"key": "C", "text": "Nội dung phương án C"},
        {"key": "D", "text": "Nội dung phương án D"}
      ],
      "correctAnswer": "A",
      "explanation": "Lời giải chi tiết, giải thích vì sao A đúng và các phương án còn lại sai.",
      "score": 0.25
    }
  ]
}

Lưu ý quan trọng:
- Đảm bảo độ chính xác học thuật 100%, câu từ trong sáng, đúng quy chuẩn thuật ngữ SGK GDPT 2018.
- Nếu là dạng "Trắc nghiệm Đúng/Sai (Định dạng 2025)": Trong options hãy có 4 ý a), b), c), d) và ghi rõ từng ý là Đúng hay Sai cùng lời giải cụ thể cho mỗi ý.
- Nếu là dạng Tự luận hoặc Trả lời ngắn: options có thể để mảng rỗng [], correctAnswer là đáp số/ý cốt lõi, explanation là hướng dẫn chấm chi tiết kèm thang điểm.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating exam questions:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Lỗi khi tạo ngân hàng câu hỏi kiểm tra.',
    });
  }
});

// B1: Phân tích & Trích xuất tài liệu SGK/SGV/SBT
app.post('/api/analyze-material', async (req: Request, res: Response) => {
  try {
    checkAi();
    const { textContent, fileName, subject, grade, curriculum } = req.body;

    const prompt = `
Bạn là trợ lý phân tích học liệu sư phạm THPT.
Giáo viên vừa tải lên tài liệu học tập: "${fileName || 'Tài liệu môn học'}" cho môn ${subject || ''} ${grade || ''} (${curriculum || ''}).
Nội dung tài liệu như sau:
"""
${(textContent || '').slice(0, 10000)}
"""

Hãy phân tích và tóm tắt có hệ thống:
1. Tên các bài học / chương mục xuất hiện trong tài liệu.
2. Các yêu cầu cần đạt (chuẩn đầu ra) chính.
3. Các khái niệm, định lý, công thức hoặc kiến thức trọng tâm cần lưu ý khi soạn giáo án và ra đề thi.
4. Gợi ý 3 hướng tổ chức hoạt động dạy học tích cực phù hợp nhất với tài liệu này.

Trình bày ngắn gọn, khoa học bằng Markdown.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      analysis: response.text,
    });
  } catch (error: any) {
    console.error('Error analyzing material:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Lỗi khi phân tích tài liệu.',
    });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', name: 'EDU TEACHER VN Backend', hasApiKey: !!apiKey });
});

// Vite Middleware for Development / Static serve for Production
async function setupVite() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EDU TEACHER VN Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
