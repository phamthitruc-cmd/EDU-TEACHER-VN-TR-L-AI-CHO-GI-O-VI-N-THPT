export interface TeacherProfile {
  fullName: string;
  school: string;
  grade: string;
  subject: string;
}

export type GradeLevel = 'Lớp 10' | 'Lớp 11' | 'Lớp 12';

export type BookCurriculum =
  | 'Kết nối tri thức với cuộc sống'
  | 'Cánh diều'
  | 'Chân trời sáng tạo'
  | 'Cùng khám phá';

export interface ReferenceDocument {
  id: string;
  title: string;
  type: 'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_GV';
  subject: string;
  grade: string;
  curriculum: string;
  fileName: string;
  fileSize?: string;
  uploadDate: string;
  summary?: string;
  rawText?: string;
  isActiveSource?: boolean;
}

export interface SlideItem {
  id: string;
  slideNumber: number;
  type: 'intro' | 'objective' | 'concept' | 'activity' | 'summary' | 'exercise';
  title: string;
  subtitle?: string;
  bullets: string[];
  teacherNotes?: string;
  visualSuggestion?: string;
  badge?: string;
}

export interface SlidePresentation {
  themeTitle: string;
  subject: string;
  grade: string;
  curriculum: string;
  slides: SlideItem[];
}

export type CognitiveLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export type QuestionType =
  | 'multiple_choice' // Trắc nghiệm 4 lựa chọn A, B, C, D
  | 'true_false' // Trắc nghiệm Đúng/Sai 4 ý (Đề thi 2025)
  | 'short_answer' // Trả lời ngắn
  | 'essay'; // Tự luận

export interface QuestionOption {
  key: string; // A, B, C, D or a, b, c, d
  text: string;
  isCorrect?: boolean;
}

export interface ExamQuestion {
  id: number;
  questionNumber: number;
  type: QuestionType;
  cognitiveLevel: CognitiveLevel;
  content: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  score?: number;
}

export interface ExamMatrixSummary {
  recognitionCount: number;
  understandingCount: number;
  applicationCount: number;
  highApplicationCount: number;
  total: number;
}

export interface ExamBankResponse {
  subject: string;
  grade: string;
  topic: string;
  matrixSummary: ExamMatrixSummary;
  questions: ExamQuestion[];
}
