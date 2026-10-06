import React, { useState, useEffect, useRef } from 'react';
import {
  Presentation,
  Sparkles,
  Copy,
  Trash2,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Check,
  Image as ImageIcon,
  MessageSquare,
  Palette,
  Plus,
  Printer,
  Sliders,
  Layers,
  MonitorPlay,
  Lightbulb,
} from 'lucide-react';
import { SlideItem, SlidePresentation, TeacherProfile } from '../types';
import { SAMPLE_SLIDES_BAI_1_TIN_12 } from '../data/curriculumData';
import { copyToClipboard } from '../utils/exportUtils';

interface TabB3SlidesProps {
  currentSubject: string;
  currentGrade: string;
  currentCurriculum: string;
  teacherProfile: TeacherProfile;
  initialTitle?: string;
  initialContent?: string;
}

export const TabB3Slides: React.FC<TabB3SlidesProps> = ({
  currentSubject,
  currentGrade,
  currentCurriculum,
  teacherProfile,
  initialTitle,
  initialContent,
}) => {
  // Input form state
  const [lessonTitle, setLessonTitle] = useState(
    initialTitle || 'Bài 1: Làm quen với Trí tuệ nhân tạo'
  );
  const [subject, setSubject] = useState(currentSubject);
  const [grade, setGrade] = useState(currentGrade);
  const [curriculum, setCurriculum] = useState(currentCurriculum);
  const [slideCount, setSlideCount] = useState(8);
  const [lessonContent, setLessonContent] = useState(
    initialContent ||
      `Khái niệm Trí tuệ nhân tạo (AI): Khoa học máy tính giúp máy tính có khả năng thông minh như con người. Lịch sử Dartmouth 1956.
Ứng dụng: Nhận diện FaceID, xử lý ngôn ngữ tự nhiên, xe tự lái Tesla, dịch máy, y tế.
Phân loại: AI hẹp (Narrow AI - chuyên biệt) và AI tổng quát (AGI - tương lai).
Đạo đức AI: Trách nhiệm, an toàn dữ liệu, chống lạm dụng công nghệ.`
  );

  // Sync if initial props change
  useEffect(() => {
    if (initialTitle) setLessonTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    if (initialContent) setLessonContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    setSubject(currentSubject);
  }, [currentSubject]);

  useEffect(() => {
    setGrade(currentGrade);
  }, [currentGrade]);

  // Slides presentation state (defaults to rich sample for Tin học 12)
  const [presentation, setPresentation] = useState<SlidePresentation>(SAMPLE_SLIDES_BAI_1_TIN_12);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [theme, setTheme] = useState<'blue' | 'chalkboard' | 'tech' | 'minimal'>('blue');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const slidePlayerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, presentation.slides.length, isEditing, isFullscreen]);

  const goToNextSlide = () => {
    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Generate slides via AI API
  const handleGenerateSlides = async () => {
    if (!lessonTitle.trim()) {
      setErrorMsg('Vui lòng nhập tên bài học.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle,
          subject,
          grade,
          curriculum,
          lessonContent,
          slideCount,
          teacherInfo: teacherProfile,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo slide.');
      }

      if (data.data && Array.isArray(data.data.slides) && data.data.slides.length > 0) {
        setPresentation(data.data);
        setCurrentSlideIndex(0);
      } else {
        throw new Error('Dữ liệu slide trả về không đúng định dạng.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Không thể kết nối đến AI server. Đang giữ bài mẫu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy full slide script / outline
  const handleCopyOutline = async () => {
    const textOutline = `BÀI GIẢNG TRÌNH CHIẾU 16:9
CHỦ ĐỀ: ${presentation.themeTitle}
MÔN: ${presentation.subject} - ${presentation.grade} (${presentation.curriculum})
GIÁO VIÊN: ${teacherProfile.fullName} (${teacherProfile.school})
--------------------------------------------------\n\n` +
      presentation.slides
        .map(
          (s) =>
            `SLIDE ${s.slideNumber}: [${s.badge || 'Bài học'}] ${s.title}\n` +
            (s.subtitle ? `Phụ đề: ${s.subtitle}\n` : '') +
            `Nội dung:\n${s.bullets.map((b) => `- ${b}`).join('\n')}\n` +
            (s.teacherNotes ? `Lời dẫn giáo viên: ${s.teacherNotes}\n` : '') +
            (s.visualSuggestion ? `Gợi ý hình ảnh: ${s.visualSuggestion}\n` : '') +
            `\n--------------------------------------------------\n`
        )
        .join('\n');

    const ok = await copyToClipboard(textOutline);
    if (ok) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Clear
  const handleClear = () => {
    if (confirm('Thầy/Cô có chắc chắn muốn xóa bài trình chiếu này không?')) {
      setPresentation({
        themeTitle: 'Bài giảng mới',
        subject: currentSubject,
        grade: currentGrade,
        curriculum: currentCurriculum,
        slides: [],
      });
      setCurrentSlideIndex(0);
    }
  };

  // Reset to default sample
  const handleResetSample = () => {
    setPresentation(SAMPLE_SLIDES_BAI_1_TIN_12);
    setLessonTitle('Bài 1: Làm quen với Trí tuệ nhân tạo');
    setCurrentSlideIndex(0);
  };

  const currentSlide: SlideItem | undefined = presentation.slides[currentSlideIndex];

  // Theme styles for 16:9 container
  const getThemeClasses = () => {
    switch (theme) {
      case 'chalkboard':
        return {
          container: 'bg-[#1b4332] text-emerald-50 border-[#2d6a4f]',
          title: 'text-[#d8f3dc]',
          badge: 'bg-[#2d6a4f] text-[#d8f3dc] border-[#40916c]',
          bulletCard: 'bg-[#081c15]/40 border-[#2d6a4f]/50 text-white',
          footer: 'text-[#95d5b2] border-[#2d6a4f]/50',
          accent: 'text-[#74c69d]',
        };
      case 'tech':
        return {
          container: 'bg-slate-950 text-cyan-50 border-cyan-900/40',
          title: 'text-cyan-300 font-mono',
          badge: 'bg-cyan-950 text-cyan-300 border-cyan-700/50',
          bulletCard: 'bg-slate-900/80 border-cyan-900/50 text-slate-100',
          footer: 'text-cyan-500 border-slate-800',
          accent: 'text-cyan-400',
        };
      case 'minimal':
        return {
          container: 'bg-slate-50 text-slate-900 border-slate-300',
          title: 'text-slate-900',
          badge: 'bg-slate-200 text-slate-800 border-slate-300',
          bulletCard: 'bg-white border-slate-200 text-slate-800 shadow-xs',
          footer: 'text-slate-500 border-slate-200',
          accent: 'text-blue-600',
        };
      case 'blue':
      default:
        return {
          container: 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border-blue-900/40',
          title: 'text-blue-200',
          badge: 'bg-blue-600/30 text-blue-300 border-blue-500/30',
          bulletCard: 'bg-white/10 backdrop-blur-xs border-white/10 text-white shadow-xs',
          footer: 'text-blue-300/80 border-white/10',
          accent: 'text-amber-400',
        };
    }
  };

  const currentTheme = getThemeClasses();

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 border border-blue-400/30 text-xs font-semibold mb-2">
              <Presentation className="w-3.5 h-3.5" /> BƯỚC 3: BÀI THUYẾT TRÌNH ĐA PHƯƠNG TIỆN
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Trình Chiếu Slide 16:9 Chuẩn Sư Phạm Bằng AI
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-2xl">
              Tự động xây dựng cấu trúc bài giảng trực quan, thẻ ý súc tích, lời dẫn của giáo viên và gợi ý hình ảnh
              minh họa. Có chế độ trình chiếu toàn màn hình tương tác trực tiếp trên lớp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSample}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-indigo-600" /> Tải lại Slide mẫu Tin 12
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Setup (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-blue-600" /> Thiết lập nội dung Slide
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên bài học trình chiếu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Ví dụ: Bài 1: Làm quen với Trí tuệ nhân tạo"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                Số lượng slide mong muốn ({slideCount} slide)
              </label>
              <input
                type="range"
                min={5}
                max={15}
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 slide (Ngắn)</span>
                <span>8 slide (Chuẩn)</span>
                <span>15 slide (Chi tiết)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nội dung cốt lõi bài học (Dữ liệu đầu vào cho AI)
              </label>
              <textarea
                rows={5}
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Dán nội dung bài học hoặc giáo án từ B2 vào đây để AI chia nhỏ thành các slide..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Nút Tạo slide */}
            <button
              onClick={handleGenerateSlides}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" /> Đang xây dựng Slide 16:9...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" /> TẠO NỘI DUNG SLIDE 16:9
                </>
              )}
            </button>
          </div>

          {/* Theme Chooser */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-600" /> Chọn phong cách giao diện slide
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'blue', label: 'Xanh sư phạm', color: 'bg-blue-900 text-white' },
                { id: 'chalkboard', label: 'Bảng phấn xanh', color: 'bg-[#1b4332] text-white' },
                { id: 'tech', label: 'Công nghệ Tech', color: 'bg-slate-950 text-cyan-300' },
                { id: 'minimal', label: 'Trang nhã tối giản', color: 'bg-slate-100 text-slate-800' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                    theme === t.id
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{t.label}</span>
                  <span className={`w-3 h-3 rounded-full ${t.color}`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 16:9 Slide Player & Slide Manager (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Slide Player Container (Ratio 16:9) */}
          <div
            ref={slidePlayerRef}
            className={`rounded-2xl border overflow-hidden shadow-xl transition-all relative flex flex-col justify-between ${
              currentTheme.container
            } ${
              isFullscreen
                ? 'fixed inset-0 z-50 rounded-none w-screen h-screen'
                : 'aspect-video min-h-[380px] sm:min-h-[460px]'
            }`}
          >
            {currentSlide ? (
              <>
                {/* Slide Header inside 16:9 */}
                <div className="p-4 sm:p-6 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${currentTheme.badge}`}
                    >
                      {currentSlide.badge || `Slide ${currentSlide.slideNumber}`}
                    </span>
                    <span className="text-xs opacity-75 hidden sm:inline">
                      {presentation.subject} • {presentation.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold opacity-80">
                      {currentSlideIndex + 1} / {presentation.slides.length}
                    </span>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title={isFullscreen ? 'Thoát toàn màn hình (Esc)' : 'Toàn màn hình chiếu bài'}
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Slide Body */}
                <div className="px-6 sm:px-10 py-2 sm:py-4 flex-1 flex flex-col justify-center overflow-y-auto">
                  <h3
                    className={`text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug mb-1 ${currentTheme.title}`}
                  >
                    {currentSlide.title}
                  </h3>
                  {currentSlide.subtitle && (
                    <p className={`text-xs sm:text-sm font-medium mb-4 opacity-85 ${currentTheme.accent}`}>
                      {currentSlide.subtitle}
                    </p>
                  )}

                  {/* Bullet Points */}
                  <div className="grid grid-cols-1 gap-2.5 sm:gap-3 my-2">
                    {currentSlide.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-3 transition-transform hover:translate-x-1 ${currentTheme.bulletCard}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed font-medium">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Visual suggestion badge */}
                  {currentSlide.visualSuggestion && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-[11px] sm:text-xs text-amber-200">
                      <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="italic line-clamp-1">
                        <strong>Gợi ý hình ảnh:</strong> {currentSlide.visualSuggestion}
                      </span>
                    </div>
                  )}
                </div>

                {/* Slide Footer with Controls */}
                <div
                  className={`px-6 py-3 border-t flex items-center justify-between text-xs ${currentTheme.footer}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{teacherProfile.fullName || 'GV'}</span>
                    <span>•</span>
                    <span className="truncate max-w-[200px]">{teacherProfile.school}</span>
                  </div>

                  {/* Nav Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrevSlide}
                      disabled={currentSlideIndex === 0}
                      className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center gap-1 font-bold transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Trước
                    </button>
                    <button
                      onClick={goToNextSlide}
                      disabled={currentSlideIndex === presentation.slides.length - 1}
                      className="p-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white flex items-center gap-1 font-bold transition-all cursor-pointer shadow-md"
                    >
                      Tiếp <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <MonitorPlay className="w-12 h-12 mb-2 text-slate-500" />
                <p className="font-bold">Chưa có dữ liệu slide.</p>
                <p className="text-xs">Nhấn "TẠO NỘI DUNG SLIDE 16:9" để bắt đầu.</p>
              </div>
            )}
          </div>

          {/* Teacher Presenter Notes & Action Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Ghi chú lời dẫn của giáo viên khi đứng lớp (Presenter Notes):</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyOutline}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'Đã sao chép' : 'Sao chép dàn ý'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                  title="In slide bài giảng"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={handleGenerateSlides}
                  disabled={isLoading}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                  title="Tạo lại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                  title="Xóa danh sách slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 italic leading-relaxed">
              {currentSlide?.teacherNotes || 'Chưa có ghi chú sư phạm cho slide này.'}
            </div>
          </div>

          {/* Slide Thumbnails List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" /> Danh sách toàn bộ các Slide ({presentation.slides.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {presentation.slides.map((s, idx) => {
                const isSelected = idx === currentSlideIndex;
                return (
                  <button
                    key={s.id || idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between aspect-video ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                      <span>Slide {idx + 1}</span>
                      <span className="text-blue-600">{s.badge}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">
                      {s.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">
                      {s.bullets?.length || 0} ý chính
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
