import React, { useState, useEffect } from 'react';
import { User, School, BookOpen, Layers, X, Check, Sparkles } from 'lucide-react';
import { TeacherProfile } from '../types';
import { HIGH_SCHOOL_SUBJECTS, HIGH_SCHOOL_GRADES } from '../data/curriculumData';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfile;
  onSave: (newProfile: TeacherProfile) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<TeacherProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
              <User className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Cài đặt Thông tin Giáo viên</h2>
              <p className="text-xs text-blue-200">Thông tin này sẽ tự động xuất hiện trên Kế hoạch bài dạy và Slide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Họ và tên giáo viên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Ví dụ: ThS. Nguyễn Thị Mai Hương"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <School className="w-4 h-4 text-indigo-600" />
              Trường THPT công tác <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              placeholder="Ví dụ: Trường THPT Chuyên Lê Hồng Phong"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                Khối giảng dạy
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm bg-white font-medium"
              >
                <option value="11 và 12">11 và 12</option>
                <option value="Lớp 12">Lớp 12</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 10">Lớp 10</option>
                <option value="10, 11 và 12">10, 11 và 12</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                Môn giảng dạy
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm bg-white font-medium"
              >
                {HIGH_SCHOOL_SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick preset badge hints */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-blue-700 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Tự động lưu trên trình duyệt của thầy cô
            </span>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  fullName: 'Phạm Thị Trúc',
                  school: 'Trường THPT Huỳnh Tấn Phát',
                  grade: '11 và 12',
                  subject: 'Tin học',
                });
              }}
              className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            >
              Điền mẫu cô Trúc
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all ${
                isSaved ? 'bg-emerald-600 shadow-emerald-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" /> Đã lưu thành công!
                </>
              ) : (
                'Lưu thông tin'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
