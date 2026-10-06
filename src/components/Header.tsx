import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Layers,
  Library,
  UserCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { GradeLevel, BookCurriculum, TeacherProfile } from '../types';
import {
  HIGH_SCHOOL_SUBJECTS,
  HIGH_SCHOOL_GRADES,
  BOOK_CURRICULUMS,
} from '../data/curriculumData';

interface HeaderProps {
  currentSubject: string;
  onSubjectChange: (sub: string) => void;
  currentGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  currentCurriculum: BookCurriculum;
  onCurriculumChange: (curr: BookCurriculum) => void;
  teacherProfile: TeacherProfile;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubject,
  onSubjectChange,
  currentGrade,
  onGradeChange,
  currentCurriculum,
  onCurriculumChange,
  teacherProfile,
  onOpenProfileModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          {/* Logo & Application Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-100 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span className="text-blue-700">EDU TEACHER</span>
                  <span className="text-amber-500">VN</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  THPT GDPT 2018
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                TRỢ LÝ AI CHO GIÁO VIÊN THPT
              </p>
            </div>
          </div>

          {/* Teacher Profile Quick Badge & Action */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={onOpenProfileModal}
              className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 transition-all text-left cursor-pointer"
              title="Nhấn để cập nhật thông tin giáo viên"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-800 group-hover:text-blue-700 flex items-center gap-1.5">
                  <span>{teacherProfile.fullName || 'Phạm Thị Trúc'}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                    {teacherProfile.subject} • {teacherProfile.grade}
                  </span>
                  <SlidersHorizontal className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                  {teacherProfile.school || 'Trường THPT Huỳnh Tấn Phát'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Global Selectors Bar: Môn học, Khối lớp, Bộ sách */}
        <div className="py-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium">
          {/* Môn học */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="text-slate-500 font-semibold whitespace-nowrap">Môn:</span>
            <select
              value={currentSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
            >
              {HIGH_SCHOOL_SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Khối lớp */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400">
            <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="text-slate-500 font-semibold whitespace-nowrap">Khối:</span>
            <select
              value={currentGrade}
              onChange={(e) => onGradeChange(e.target.value as GradeLevel)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
            >
              {HIGH_SCHOOL_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Bộ sách */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400">
            <Library className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-slate-500 font-semibold whitespace-nowrap">Bộ sách:</span>
            <select
              value={currentCurriculum}
              onChange={(e) => onCurriculumChange(e.target.value as BookCurriculum)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer max-w-[220px] sm:max-w-none truncate"
            >
              {BOOK_CURRICULUMS.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          {/* Badge indicator */}
          <div className="ml-auto hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Hệ thống AI sẵn sàng phục vụ</span>
          </div>
        </div>
      </div>
    </header>
  );
};
