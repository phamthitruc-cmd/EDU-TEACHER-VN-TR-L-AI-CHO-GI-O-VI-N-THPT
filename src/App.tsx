/**
 * EDU TEACHER VN – TRỢ LÝ AI CHO GIÁO VIÊN THPT
 * Giáo viên: Phạm Thị Trúc - Trường THPT Huỳnh Tấn Phát - Môn: Tin học
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Presentation,
  CheckSquare,
  Sparkles,
  Layers,
  GraduationCap,
  Info,
} from 'lucide-react';
import { GradeLevel, BookCurriculum, TeacherProfile, ReferenceDocument } from './types';
import {
  DEFAULT_TEACHER_PROFILE,
  INITIAL_PRELOADED_DOCUMENTS,
} from './data/curriculumData';
import { Header } from './components/Header';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { TabB1Documents } from './components/TabB1Documents';
import { TabB2LessonPlan } from './components/TabB2LessonPlan';
import { TabB3Slides } from './components/TabB3Slides';
import { TabB4ExamBank } from './components/TabB4ExamBank';

type ActiveTab = 'B1' | 'B2' | 'B3' | 'B4';

export default function App() {
  // Teacher profile initialized with user specifications
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem('edu_teacher_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fullName === 'Phạm Thị Trúc' && parsed.subject === 'Tin học') {
          return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_TEACHER_PROFILE;
  });

  // Global Curriculum Selectors
  const [currentSubject, setCurrentSubject] = useState<string>('Tin học');
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>('Lớp 12');
  const [currentCurriculum, setCurrentCurriculum] = useState<BookCurriculum>(
    'Kết nối tri thức với cuộc sống'
  );

  // Active Tab: B1, B2, B3, B4
  const [activeTab, setActiveTab] = useState<ActiveTab>('B2');

  // Teacher Profile Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Reference Documents (B1)
  const [documents, setDocuments] = useState<ReferenceDocument[]>(() => {
    try {
      const saved = localStorage.getItem('edu_teacher_documents');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].subject === 'Tin học') {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_PRELOADED_DOCUMENTS;
  });

  // Save documents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edu_teacher_documents', JSON.stringify(documents));
    } catch (e) {}
  }, [documents]);

  // Bridge state between tabs: pass lesson plan from B2 to B3 slide
  const [bridgedLessonTitle, setBridgedLessonTitle] = useState('Bài 1: Làm quen với Trí tuệ nhân tạo');
  const [bridgedLessonContent, setBridgedLessonContent] = useState('');

  // Handle Profile Update
  const handleSaveProfile = (newProfile: TeacherProfile) => {
    setTeacherProfile(newProfile);
    try {
      localStorage.setItem('edu_teacher_profile', JSON.stringify(newProfile));
    } catch (e) {}
    if (newProfile.subject) setCurrentSubject(newProfile.subject);
    if (newProfile.grade) setCurrentGrade(newProfile.grade as GradeLevel);
  };

  // Document actions
  const handleAddDocument = (newDoc: ReferenceDocument) => {
    const updated = documents.map((d) => ({ ...d, isActiveSource: false }));
    setDocuments([newDoc, ...updated]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const handleSetActiveDocument = (id: string) => {
    setDocuments(
      documents.map((d) => ({
        ...d,
        isActiveSource: d.id === id,
      }))
    );
  };

  const activeDoc = documents.find((d) => d.isActiveSource);

  // Bridge from B2 to B3
  const handleSendToSlideTab = (title: string, content: string) => {
    setBridgedLessonTitle(title);
    setBridgedLessonContent(content);
    setActiveTab('B3');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentSubject={currentSubject}
        onSubjectChange={setCurrentSubject}
        currentGrade={currentGrade}
        onGradeChange={setCurrentGrade}
        currentCurriculum={currentCurriculum}
        onCurriculumChange={setCurrentCurriculum}
        teacherProfile={teacherProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Feature Tabs Bar (B1, B2, B3, B4) */}
      <div className="bg-white border-b border-slate-200 shadow-2xs sticky top-[105px] md:top-[93px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
            {/* B1 Tab */}
            <button
              onClick={() => setActiveTab('B1')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'B1'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>B1. CÀI ĐẶT & TẢI SGK/SGV/SBT</span>
              {documents.length > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === 'B1' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {documents.length}
                </span>
              )}
            </button>

            {/* B2 Tab */}
            <button
              onClick={() => setActiveTab('B2')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'B2'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>B2. SOẠN KẾ HOẠCH BÀI DẠY</span>
              <span
                className={`hidden md:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  activeTab === 'B2' ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-800'
                }`}
              >
                CV 5512
              </span>
            </button>

            {/* B3 Tab */}
            <button
              onClick={() => setActiveTab('B3')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'B3'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Presentation className="w-4 h-4 shrink-0" />
              <span>B3. TRÌNH CHIẾU SLIDE 16:9</span>
              <span
                className={`hidden md:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  activeTab === 'B3' ? 'bg-blue-800 text-blue-100' : 'bg-purple-100 text-purple-800'
                }`}
              >
                16:9
              </span>
            </button>

            {/* B4 Tab */}
            <button
              onClick={() => setActiveTab('B4')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'B4'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-4 h-4 shrink-0" />
              <span>B4. NGÂN HÀNG ĐỀ KIỂM TRA</span>
              <span
                className={`hidden md:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  activeTab === 'B4' ? 'bg-blue-800 text-blue-100' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                THPT 2025
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'B1' && (
          <TabB1Documents
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
            onSetActiveDocument={handleSetActiveDocument}
            currentSubject={currentSubject}
            currentGrade={currentGrade}
            currentCurriculum={currentCurriculum}
          />
        )}

        {activeTab === 'B2' && (
          <TabB2LessonPlan
            currentSubject={currentSubject}
            currentGrade={currentGrade}
            currentCurriculum={currentCurriculum}
            teacherProfile={teacherProfile}
            activeDocument={activeDoc}
            onSendToSlideTab={handleSendToSlideTab}
          />
        )}

        {activeTab === 'B3' && (
          <TabB3Slides
            currentSubject={currentSubject}
            currentGrade={currentGrade}
            currentCurriculum={currentCurriculum}
            teacherProfile={teacherProfile}
            initialTitle={bridgedLessonTitle}
            initialContent={bridgedLessonContent}
          />
        )}

        {activeTab === 'B4' && (
          <TabB4ExamBank
            currentSubject={currentSubject}
            currentGrade={currentGrade}
            currentCurriculum={currentCurriculum}
            teacherProfile={teacherProfile}
            activeDocument={activeDoc}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">EDU TEACHER VN</span>
            <span>•</span>
            <span>Hệ thống Trợ lý AI phục vụ Giáo viên THPT</span>
          </div>
          <div>
            <span>Giáo viên: </span>
            <strong className="text-slate-800">{teacherProfile.fullName}</strong> -{' '}
            <span>{teacherProfile.school}</span> ({teacherProfile.subject} - {teacherProfile.grade})
          </div>
        </div>
      </footer>

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={teacherProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
