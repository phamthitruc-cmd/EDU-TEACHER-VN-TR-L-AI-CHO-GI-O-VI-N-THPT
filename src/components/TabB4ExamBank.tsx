import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Sparkles,
  Copy,
  Trash2,
  RotateCcw,
  Download,
  Eye,
  EyeOff,
  Edit3,
  Check,
  Plus,
  BarChart3,
  Award,
  HelpCircle,
  FileCheck,
  Printer,
  ChevronDown,
  Layers,
  BookOpen,
} from 'lucide-react';
import {
  ExamBankResponse,
  ExamQuestion,
  CognitiveLevel,
  TeacherProfile,
  ReferenceDocument,
} from '../types';
import { SAMPLE_EXAM_BAI_1_TIN_12 } from '../data/curriculumData';
import { copyToClipboard, exportExamToWordDoc } from '../utils/exportUtils';

interface TabB4ExamBankProps {
  currentSubject: string;
  currentGrade: string;
  currentCurriculum: string;
  teacherProfile: TeacherProfile;
  activeDocument?: ReferenceDocument;
}

export const TabB4ExamBank: React.FC<TabB4ExamBankProps> = ({
  currentSubject,
  currentGrade,
  currentCurriculum,
  teacherProfile,
  activeDocument,
}) => {
  // Setup state
  const [subject, setSubject] = useState(currentSubject);
  const [grade, setGrade] = useState(currentGrade);
  const [topic, setTopic] = useState('Bài 1: Làm quen với Trí tuệ nhân tạo');
  const [questionCount, setQuestionCount] = useState(8);
  const [selectedLevels, setSelectedLevels] = useState<CognitiveLevel[]>([
    'Nhận biết',
    'Thông hiểu',
    'Vận dụng',
    'Vận dụng cao',
  ]);
  const [questionType, setQuestionType] = useState<string>(
    'Hỗn hợp đề thi THPT 2025 (Nhiều lựa chọn + Đúng/Sai 4 ý + Trả lời ngắn)'
  );

  // Exam result state (initialized with rich Tin học 12 Bài 1 sample)
  const [examData, setExamData] = useState<ExamBankResponse>(SAMPLE_EXAM_BAI_1_TIN_12);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSubject(currentSubject);
  }, [currentSubject]);

  useEffect(() => {
    setGrade(currentGrade);
  }, [currentGrade]);

  // Toggle level
  const toggleLevel = (lvl: CognitiveLevel) => {
    if (selectedLevels.includes(lvl)) {
      if (selectedLevels.length > 1) {
        setSelectedLevels(selectedLevels.filter((l) => l !== lvl));
      }
    } else {
      setSelectedLevels([...selectedLevels, lvl]);
    }
  };

  // Generate Exam Questions via AI
  const handleGenerateQuestions = async () => {
    if (!topic.trim()) {
      setErrorMsg('Vui lòng nhập chủ đề / bài học cần ra đề.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-exam-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          questionCount,
          cognitiveLevels: selectedLevels,
          questionType,
          referenceText: activeDocument?.rawText || activeDocument?.summary || '',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo đề.');
      }

      if (data.data && Array.isArray(data.data.questions)) {
        setExamData(data.data);
      } else {
        throw new Error('Dữ liệu câu hỏi trả về không đúng cấu trúc.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Không thể kết nối đến AI server. Đang giữ bài mẫu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy Exam: mode full with answers or student mode
  const handleCopyExam = async (withAnswers: boolean) => {
    let text = `SỞ GD&ĐT - ${teacherProfile.school.toUpperCase()}\n`;
    text += `ĐỀ KIỂM TRA ĐÁNH GIÁ CHẤT LƯỢNG MÔN: ${examData.subject.toUpperCase()} - ${examData.grade}\n`;
    text += `CHỦ ĐỀ: ${examData.topic}\n`;
    text += `GIÁO VIÊN BIÊN SOẠN: ${teacherProfile.fullName}\n`;
    text += `========================================================\n\n`;

    examData.questions.forEach((q, idx) => {
      text += `Câu ${idx + 1} (${q.cognitiveLevel}): ${q.content}\n`;
      if (q.options && q.options.length > 0) {
        q.options.forEach((opt) => {
          text += `   ${opt.key}. ${opt.text}\n`;
        });
      }
      if (withAnswers) {
        text += `   >>> ĐÁP ÁN: ${q.correctAnswer}\n`;
        text += `   >>> LỜI GIẢI CHI TIẾT: ${q.explanation}\n`;
      }
      text += `\n`;
    });

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Export Word (.doc)
  const handleExportWord = () => {
    exportExamToWordDoc(topic, examData, {
      school: teacherProfile.school,
      grade: grade,
      subject: subject,
    });
  };

  // Delete single question
  const handleDeleteQuestion = (id: number) => {
    const updated = examData.questions.filter((q) => q.id !== id);
    setExamData({
      ...examData,
      questions: updated,
      matrixSummary: {
        ...examData.matrixSummary,
        total: updated.length,
      },
    });
  };

  // Inline edit question text
  const handleSaveQuestionContent = (id: number, newContent: string) => {
    const updated = examData.questions.map((q) =>
      q.id === id ? { ...q, content: newContent } : q
    );
    setExamData({ ...examData, questions: updated });
    setEditingQuestionId(null);
  };

  // Clear all
  const handleClear = () => {
    if (confirm('Thầy/Cô có chắc chắn muốn xóa toàn bộ câu hỏi trong danh sách?')) {
      setExamData({
        subject: currentSubject,
        grade: currentGrade,
        topic: topic,
        matrixSummary: {
          recognitionCount: 0,
          understandingCount: 0,
          applicationCount: 0,
          highApplicationCount: 0,
          total: 0,
        },
        questions: [],
      });
    }
  };

  // Reset to default sample
  const handleResetSample = () => {
    setExamData(SAMPLE_EXAM_BAI_1_TIN_12);
    setTopic('Bài 1: Làm quen với Trí tuệ nhân tạo');
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5" /> BƯỚC 4: KHẢO THÍ VÀ ĐÁNH GIÁ CHẤT LƯỢNG
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Ngân Hàng Đề Kiểm Tra & Ma Trận Đánh Giá
            </h2>
            <p className="text-sm text-emerald-100 mt-1 max-w-2xl">
              Xây dựng đề kiểm tra bám sát 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
              Hỗ trợ đầy đủ định dạng thi tốt nghiệp THPT mới 2025: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai 4 ý,
              Trả lời ngắn và Tự luận có giải chi tiết.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSample}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-600" /> Tải lại Đề mẫu Tin 12
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Setup & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Setup (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart3 className="w-4 h-4 text-emerald-600" /> Cấu hình đề kiểm tra
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chủ đề / Bài học kiểm tra <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ví dụ: Bài 1: Làm quen với Trí tuệ nhân tạo"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Môn học</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border rounded-xl bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border rounded-xl bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Số lượng câu hỏi ({questionCount} câu)
              </label>
              <div className="flex items-center gap-2">
                {[5, 8, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      questionCount === num
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Mức độ nhận thức */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mức độ nhận thức (Chọn các mức độ cần có)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'] as CognitiveLevel[]).map(
                  (lvl) => {
                    const isChecked = selectedLevels.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleLevel(lvl)}
                        className={`px-2.5 py-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span>{lvl}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Dạng câu hỏi */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dạng câu hỏi
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-medium"
              >
                <option value="Hỗn hợp đề thi THPT 2025 (Nhiều lựa chọn + Đúng/Sai 4 ý + Trả lời ngắn)">
                  ⭐ Chuẩn Đề thi tốt nghiệp THPT 2025 (Hỗn hợp 3 phần)
                </option>
                <option value="Trắc nghiệm 4 lựa chọn (A, B, C, D) truyền thống">
                  Trắc nghiệm 4 lựa chọn (A, B, C, D)
                </option>
                <option value="Trắc nghiệm Đúng / Sai (Định dạng 4 ý năm 2025)">
                  Trắc nghiệm Đúng / Sai (Định dạng 4 ý 2025)
                </option>
                <option value="Trắc nghiệm Trả lời ngắn">
                  Trắc nghiệm Trả lời ngắn
                </option>
                <option value="Tự luận kèm thang điểm chi tiết">
                  Tự luận kèm biểu điểm chi tiết
                </option>
              </select>
            </div>

            {/* Nút hành động */}
            <button
              onClick={handleGenerateQuestions}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" /> Đang soạn ngân hàng đề...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" /> TẠO NGÂN HÀNG CÂU HỎI BẰNG AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Exam Output Result (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            {/* Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Đề kiểm tra: {examData.topic}
                </h3>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{examData.questions?.length || 0} câu hỏi</span>
                  <span>•</span>
                  <span>Môn {examData.subject}</span>
                  <span>•</span>
                  <span>{examData.grade}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {/* Toggle Show Answers */}
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    showAnswers
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={showAnswers ? 'Ẩn đáp án & lời giải' : 'Hiện đáp án & lời giải'}
                >
                  {showAnswers ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{showAnswers ? 'Hiện đáp án' : 'Ẩn đáp án'}</span>
                </button>

                {/* Copy with answers */}
                <button
                  onClick={() => handleCopyExam(true)}
                  className="p-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Sao chép đề kèm lời giải chi tiết"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>

                {/* Export Word */}
                <button
                  onClick={handleExportWord}
                  className="p-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Tải file Word (.doc)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Word</span>
                </button>

                {/* Print */}
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                  title="In đề thi"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Regenerate */}
                <button
                  onClick={handleGenerateQuestions}
                  disabled={isLoading}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                  title="Tạo lại"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

                {/* Clear */}
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                  title="Xóa đề"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Matrix Summary Badge Card */}
            {examData.matrixSummary && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" /> Ma trận đề thi:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                    Nhận biết: {examData.matrixSummary.recognitionCount || 0} câu
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Thông hiểu: {examData.matrixSummary.understandingCount || 0} câu
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                    Vận dụng: {examData.matrixSummary.applicationCount || 0} câu
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                    Vận dụng cao: {examData.matrixSummary.highApplicationCount || 0} câu
                  </span>
                </div>
              </div>
            )}

            {/* Questions List */}
            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  AI đang xây dựng câu hỏi và ma trận đề kiểm tra...
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Đang thiết lập các câu hỏi đúng chuẩn GDPT 2018 và lời giải chi tiết
                </p>
              </div>
            ) : examData.questions?.length > 0 ? (
              <div className="space-y-4">
                {examData.questions.map((q, idx) => {
                  const levelBadgeColor =
                    q.cognitiveLevel === 'Nhận biết'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : q.cognitiveLevel === 'Thông hiểu'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : q.cognitiveLevel === 'Vận dụng'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200';

                  const isBeingEdited = editingQuestionId === q.id;

                  return (
                    <div
                      key={q.id || idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-3"
                    >
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            Câu {idx + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold border ${levelBadgeColor}`}
                          >
                            {q.cognitiveLevel}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {q.type === 'multiple_choice'
                              ? '4 lựa chọn'
                              : q.type === 'true_false'
                              ? 'Đúng/Sai (2025)'
                              : q.type === 'short_answer'
                              ? 'Trả lời ngắn'
                              : 'Tự luận'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setEditingQuestionId(isBeingEdited ? null : q.id)
                            }
                            className="p-1 rounded text-slate-400 hover:text-blue-600 transition-colors"
                            title="Sửa nội dung câu hỏi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                            title="Xóa câu hỏi này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Question Content */}
                      {isBeingEdited ? (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            defaultValue={q.content}
                            id={`edit-q-${q.id}`}
                            className="w-full p-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingQuestionId(null)}
                              className="px-2.5 py-1 text-xs border rounded hover:bg-slate-50"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => {
                                const input = document.getElementById(
                                  `edit-q-${q.id}`
                                ) as HTMLTextAreaElement;
                                if (input) handleSaveQuestionContent(q.id, input.value);
                              }}
                              className="px-2.5 py-1 text-xs bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                          {q.content}
                        </p>
                      )}

                      {/* Options */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt) => (
                            <div
                              key={opt.key}
                              className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-xs text-slate-700 flex items-start gap-2"
                            >
                              <span className="font-extrabold text-blue-700 shrink-0">
                                {opt.key}.
                              </span>
                              <span className="leading-relaxed">{opt.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Solution / Explanation (Toggleable) */}
                      {showAnswers && (
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                            <span>Đáp án chuẩn:</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs">
                              {q.correctAnswer}
                            </span>
                          </div>
                          <div className="text-emerald-950/80 leading-relaxed">
                            <strong>Hướng dẫn giải chi tiết:</strong> {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300" />
                <p className="font-bold text-sm">Chưa có câu hỏi nào</p>
                <p className="text-xs">
                  Nhấn "TẠO NGÂN HÀNG CÂU HỎI BẰNG AI" hoặc bấm "Tải lại Đề mẫu Tin 12".
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
