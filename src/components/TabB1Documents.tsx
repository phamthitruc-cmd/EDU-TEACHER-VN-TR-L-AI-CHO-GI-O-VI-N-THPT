import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  BookOpen,
  CheckCircle2,
  Trash2,
  Sparkles,
  Eye,
  FileCheck,
  Search,
  Plus,
  Info,
  Clock,
  Check,
  RefreshCw,
  FileUp,
} from 'lucide-react';
import { ReferenceDocument } from '../types';

interface TabB1DocumentsProps {
  documents: ReferenceDocument[];
  onAddDocument: (doc: ReferenceDocument) => void;
  onDeleteDocument: (id: string) => void;
  onSetActiveDocument: (id: string) => void;
  currentSubject: string;
  currentGrade: string;
  currentCurriculum: string;
}

export const TabB1Documents: React.FC<TabB1DocumentsProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
  onSetActiveDocument,
  currentSubject,
  currentGrade,
  currentCurriculum,
}) => {
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<ReferenceDocument | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customType, setCustomType] = useState<'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_GV'>('TAI_LIEU_GV');
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler (PDF, TXT, DOCX)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target?.result;
      let textSnippet = '';

      if (typeof content === 'string') {
        textSnippet = content;
      } else {
        textSnippet = `Tài liệu: ${file.name} - Định dạng nhị phân (${(file.size / 1024).toFixed(1)} KB)`;
      }

      const newDoc: ReferenceDocument = {
        id: `doc-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        type: file.name.toLowerCase().includes('sgk')
          ? 'SGK'
          : file.name.toLowerCase().includes('sgv')
          ? 'SGV'
          : file.name.toLowerCase().includes('sbt')
          ? 'SBT'
          : 'TAI_LIEU_GV',
        subject: currentSubject,
        grade: currentGrade,
        curriculum: currentCurriculum,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        rawText: textSnippet || `Tài liệu tham khảo do giáo viên tải lên: ${file.name}`,
        summary: `Tài liệu vừa được tải lên cho môn ${currentSubject} ${currentGrade}. Sẵn sàng để AI phân tích và tham chiếu.`,
        isActiveSource: true,
      };

      onAddDocument(newDoc);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // AI Document Analysis
  const handleAnalyzeDocument = async (doc: ReferenceDocument) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textContent: doc.rawText || doc.summary || doc.title,
          fileName: doc.fileName,
          subject: doc.subject,
          grade: doc.grade,
          curriculum: doc.curriculum,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setSelectedDocForPreview({
          ...doc,
          summary: data.analysis,
        });
      }
    } catch (err) {
      console.error('Lỗi khi phân tích:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveCustomText = () => {
    if (!customTitle.trim() || !customText.trim()) return;

    const newDoc: ReferenceDocument = {
      id: `doc-custom-${Date.now()}`,
      title: customTitle,
      type: customType,
      subject: currentSubject,
      grade: currentGrade,
      curriculum: currentCurriculum,
      fileName: `${customTitle}.txt`,
      fileSize: `${(customText.length / 1024).toFixed(1)} KB`,
      uploadDate: new Date().toISOString().split('T')[0],
      rawText: customText,
      summary: customText.slice(0, 180) + '...',
      isActiveSource: true,
    };

    onAddDocument(newDoc);
    setCustomTitle('');
    setCustomText('');
    setShowAddCustomModal(false);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.curriculum.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const activeDoc = documents.find((d) => d.isActiveSource);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" /> BƯỚC 1: HỌC LIỆU VÀ NGUỒN DỮ LIỆU
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Cài đặt & Tải SGK / SGV / SBT Làm Nguồn Cho AI
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Nạp dữ liệu chuẩn từ Sách giáo khoa, Sách giáo viên, Sách bài tập hoặc đề cương chuyên môn.
              AI sẽ bám sát tuyệt đối nội dung này để soạn giáo án chuẩn 5512 và tạo đề kiểm tra chính xác.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
            >
              <FileUp className="w-4 h-4" /> Tải lên PDF / Tài liệu
            </button>
            <button
              onClick={() => setShowAddCustomModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Dán nội dung bài
            </button>
          </div>
        </div>

        {/* Active Source Banner */}
        {activeDoc && (
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs bg-white/5 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Nguồn đang được kích hoạt cho AI:</span>
              <span className="text-white bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/30">
                {activeDoc.title} ({activeDoc.type} - {activeDoc.curriculum})
              </span>
            </div>
            <span className="text-slate-300">
              Các mục B2 (Soạn bài) & B4 (Ra đề) sẽ tự động ưu tiên kiến thức từ tài liệu này.
            </span>
          </div>
        )}
      </div>

      {/* Upload Zone & Quick Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'SGK', label: 'Sách giáo khoa (SGK)' },
            { id: 'SGV', label: 'Sách giáo viên (SGV)' },
            { id: 'SBT', label: 'Sách bài tập (SBT)' },
            { id: 'TAI_LIEU_GV', label: 'Tài liệu riêng' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const isActive = doc.isActiveSource;
          const badgeColor =
            doc.type === 'SGK'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : doc.type === 'SGV'
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : doc.type === 'SBT'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={doc.id}
              className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badgeColor}`}
                  >
                    {doc.type}
                  </span>
                  <div className="flex items-center gap-1">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3 h-3" /> Đang dùng
                      </span>
                    ) : (
                      <button
                        onClick={() => onSetActiveDocument(doc.id)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
                      >
                        Chọn làm nguồn
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{doc.subject}</span>
                  <span>•</span>
                  <span>{doc.grade}</span>
                  <span>•</span>
                  <span className="truncate">{doc.curriculum}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                  {doc.summary || 'Chưa có bản tóm tắt nội dung học liệu.'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 mb-3">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {doc.fileSize || 'Văn bản'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {doc.uploadDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDocForPreview(doc);
                      handleAnalyzeDocument(doc);
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Phân tích AI
                  </button>
                  <button
                    onClick={() => setSelectedDocForPreview(doc)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    title="Xem nội dung chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {doc.id.startsWith('doc-') && (
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Xóa tài liệu này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Preview / AI Analysis */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                  {selectedDocForPreview.type} • {selectedDocForPreview.curriculum}
                </span>
                <h3 className="text-base font-bold text-white truncate max-w-lg">
                  {selectedDocForPreview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
              {isAnalyzing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-slate-700 font-bold">AI đang phân tích và trích xuất cấu trúc kiến thức bài học...</p>
                  <p className="text-xs text-slate-400">Đang nhận diện các yêu cầu cần đạt và phương pháp giảng dạy</p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" /> Bản tóm tắt & Khung kiến thức AI:
                    </h4>
                    <div className="text-xs leading-relaxed text-blue-950 whitespace-pre-wrap">
                      {selectedDocForPreview.summary}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Nội dung trích xuất từ tài liệu:</h4>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs max-h-60 overflow-y-auto text-slate-700 whitespace-pre-wrap">
                      {selectedDocForPreview.rawText || 'Không có dữ liệu văn bản thô.'}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  onSetActiveDocument(selectedDocForPreview.id);
                  setSelectedDocForPreview(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Kích hoạt làm nguồn chính cho AI
              </button>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Text/Excerpt */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Thêm Đoạn Trích Học Liệu / Bài Học
              </h3>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên tài liệu / Tên bài <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đoạn trích Bài 1 SGK Toán 10"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loại tài liệu
                </label>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none"
                >
                  <option value="SGK">Sách giáo khoa (SGK)</option>
                  <option value="SGV">Sách giáo viên (SGV)</option>
                  <option value="SBT">Sách bài tập (SBT)</option>
                  <option value="TAI_LIEU_GV">Tài liệu riêng của giáo viên</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung chi tiết bài học / trích dẫn SGK <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Dán nội dung kiến thức, định lý, công thức, bài đọc hoặc ghi chú sư phạm vào đây..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full p-3 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCustomText}
                disabled={!customTitle.trim() || !customText.trim()}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                Lưu vào danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
