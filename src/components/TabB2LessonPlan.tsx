import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Trash2,
  RotateCcw,
  Download,
  Printer,
  Edit3,
  Check,
  CheckCircle2,
  BookOpen,
  Clock,
  Layers,
  Wand2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { TeacherProfile, ReferenceDocument } from '../types';
import {
  HIGH_SCHOOL_SUBJECTS,
  HIGH_SCHOOL_GRADES,
  BOOK_CURRICULUMS,
  TEACHING_METHODS_SUGGESTIONS,
  SAMPLE_LESSONS_BY_SUBJECT,
} from '../data/curriculumData';
import { copyToClipboard, exportToWordDoc } from '../utils/exportUtils';

interface TabB2LessonPlanProps {
  currentSubject: string;
  currentGrade: string;
  currentCurriculum: string;
  teacherProfile: TeacherProfile;
  activeDocument?: ReferenceDocument;
  onSendToSlideTab?: (title: string, content: string) => void;
}

export const TabB2LessonPlan: React.FC<TabB2LessonPlanProps> = ({
  currentSubject,
  currentGrade,
  currentCurriculum,
  teacherProfile,
  activeDocument,
  onSendToSlideTab,
}) => {
  // Form state initialized with Tin học 12 - Bài 1: Làm quen với Trí tuệ nhân tạo
  const [lessonTitle, setLessonTitle] = useState('Bài 1: Làm quen với Trí tuệ nhân tạo');
  const [subject, setSubject] = useState(currentSubject);
  const [grade, setGrade] = useState(currentGrade);
  const [curriculum, setCurriculum] = useState(currentCurriculum);
  const [duration, setDuration] = useState('2 tiết');
  const [objectives, setObjectives] = useState(
    `- Nêu được định nghĩa đơn giản về Trí tuệ nhân tạo (AI - Artificial Intelligence).\n- Nhận biết được một số ứng dụng tiêu biểu của AI trong đời sống: nhận dạng khuôn mặt FaceID, dịch tự động, xe tự hành, trợ lý ảo, y tế, giáo dục.\n- Phân biệt được AI hẹp (Narrow AI) và AI tổng quát (AGI).\n- Hình thành năng lực CNTT, tư duy phản biện khi sử dụng công nghệ số; có ý thức trách nhiệm và đạo đức khi tiếp cận các sản phẩm AI.`
  );
  const [content, setContent] = useState(
    `1. Khái niệm Trí tuệ nhân tạo (AI) và lịch sử Hội thảo Dartmouth (1956).\n2. Một số lĩnh vực ứng dụng của AI: Thị giác máy tính, Xử lý ngôn ngữ tự nhiên, Xe tự lái, Robot, AI tạo sinh.\n3. Phân loại AI: AI hẹp (Narrow AI) và AI tổng quát (AGI).\n4. Khía cạnh xã hội và đạo đức AI: Trách nhiệm, an toàn dữ liệu, tính trung thực học thuật.`
  );
  const [teachingMethods, setTeachingMethods] = useState(
    'Dạy học giải quyết vấn đề kết hợp trải nghiệm phần mềm AI thực tế và kĩ thuật Khăn trải bàn'
  );

  // Result state initialized with rich pre-loaded lesson plan 5512
  const [generatedPlan, setGeneratedPlan] = useState<string>(`# KẾ HOẠCH BÀI DẠY (GIÁO ÁN)
**MÔN:** TIN HỌC 12 – **BỘ SÁCH:** KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
**BÀI 1: LÀM QUEN VỚI TRÍ TUỆ NHÂN TẠO**
**Thời lượng thực hiện:** 02 tiết (Tiết 1 & Tiết 2)
**Giáo viên thực hiện:** Cô Phạm Thị Trúc – Trường THPT Huỳnh Tấn Phát

---

### I. MỤC TIÊU
#### 1. Về kiến thức:
- Nêu được khái niệm đơn giản về Trí tuệ nhân tạo (AI - Artificial Intelligence) và nguồn gốc ra đời (Hội thảo Dartmouth 1956).
- Nhận biết và phân tích được 4-5 lĩnh vực ứng dụng tiêu biểu của AI trong đời sống hiện nay: thị giác máy tính (FaceID, chẩn đoán y tế), xử lý ngôn ngữ tự nhiên (dịch tự động, chatbot, AI tạo sinh), hệ thống tự hành (xe tự lái), trợ lý ảo.
- Phân biệt được sự khác nhau căn bản giữa AI hẹp (Narrow AI) và AI tổng quát (AGI).

#### 2. Về năng lực:
- **Năng lực chung:**
  + *Tự chủ và tự học:* Tự giác nghiên cứu SGK, chủ động tìm kiếm các ví dụ ứng dụng AI trong học tập và cuộc sống.
  + *Giao tiếp và hợp tác:* Phối hợp nhịp nhàng trong hoạt động nhóm, lắng nghe và phản biện ý kiến về tác động xã hội của AI.
  + *Giải quyết vấn đề và sáng tạo:* Phân tích tình huống thực tế để xác định bài toán nào có thể ứng dụng AI để giải quyết.
- **Năng lực tin học đặc thù:**
  + *Nla (Sử dụng và quản lý các phương tiện CNTT&TT):* Hiểu được nguyên lý hoạt động căn bản của các ứng dụng AI phổ biến.
  + *Nld (Ứng dụng CNTT&TT trong học tập và tự học):* Biết cách khai thác trợ lý AI phục vụ học tập đúng mục đích.
  + *Nle (Hợp tác trong môi trường số):* Sử dụng công cụ số một cách văn minh, an toàn.

#### 3. Về phẩm chất:
- *Chăm chỉ:* Tích cực tham gia các hoạt động học tập, tìm tòi khám phá tri thức công nghệ mới.
- *Trung thực:* Tôn trọng tính trung thực trong học thuật, không sao chép nguyên văn sản phẩm do AI tạo sinh khi làm bài kiểm tra.
- *Trách nhiệm:* Có ý thức đạo đức khi tiếp cận, chia sẻ dữ liệu và sử dụng công nghệ số; bảo vệ quyền riêng tư cá nhân.

---

### II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
#### 1. Chuẩn bị của Giáo viên:
- Kế hoạch bài dạy (Giáo án số hóa 5512).
- Bài giảng trình chiếu đa phương tiện (Slide 16:9), máy chiếu hoặc màn hình tương tác.
- Video clip ngắn (2 phút) minh họa robot thông minh và xe tự hành Tesla.
- Phiếu học tập số 1 (Khái niệm và ứng dụng AI) và Phiếu học tập số 2 (Bảng so sánh AI hẹp vs AI tổng quát).
- Phần mềm kiểm tra tương tác nhanh (Quizizz / Kahoot).

#### 2. Chuẩn bị của Học sinh:
- Sách giáo khoa Tin học 12 (Kết nối tri thức với cuộc sống), vở ghi chép.
- Điện thoại thông minh hoặc máy tính bảng kết nối Internet (để trải nghiệm FaceID và tìm kiếm giọng nói).
- Đọc trước bài 1 trong SGK trang 5 - 10.

---

### III. TIẾN TRÌNH DẠY HỌC

#### HOẠT ĐỘNG 1: MỞ ĐẦU / KHỞI ĐỘNG (Xác định vấn đề - 7 phút)
**a) Mục tiêu:** Tạo hứng thú, kích thích trí tò mò của học sinh về các công nghệ thông minh đang hiện diện quanh mình; xác định nhiệm vụ học tập của bài học.
**b) Nội dung:** Học sinh quan sát tình huống thực tế và trả lời câu hỏi dẫn dắt của giáo viên.
**c) Sản phẩm:** Câu trả lời của học sinh về tính năng FaceID, gợi ý video trên TikTok/Youtube, dịch tự động của Google Translate.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* Giáo viên đặt câu hỏi: "Khi các em mở khóa điện thoại bằng khuôn mặt (FaceID) trong điều kiện đeo kính hoặc đổi kiểu tóc, tại sao máy vẫn nhận diện được? Khi các em xem video trên TikTok, tại sao ứng dụng luôn gợi ý đúng video các em thích? Công nghệ nào đứng sau những tính năng này?"
- *Bước 2: Thực hiện nhiệm vụ:* Học sinh suy nghĩ cá nhân trong 1 phút, thảo luận nhanh với bạn cùng bàn.
- *Bước 3: Báo cáo, thảo luận:* Giáo viên gọi 2-3 học sinh chia sẻ trải nghiệm. Các bạn khác lắng nghe và bổ sung.
- *Bước 4: Kết luận, nhận định:* Giáo viên nhận xét, nhấn mạnh: Đó chính là ứng dụng của Trí tuệ nhân tạo (AI) – một lĩnh vực công nghệ đang thay đổi mạnh mẽ thế giới. Chúng ta sẽ cùng tìm hiểu trong bài học hôm nay.

---

#### HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI (60 phút)

##### Hoạt động 2.1: Tìm hiểu khái niệm và lịch sử Trí tuệ nhân tạo (AI) (20 phút)
**a) Mục tiêu:** Học sinh nêu được định nghĩa AI, nguồn gốc ra đời tại Hội thảo Dartmouth (1956) và 3 khả năng cốt lõi của AI.
**b) Nội dung:** Đọc SGK mục 1, làm việc theo nhóm 4 học sinh hoàn thành Phiếu học tập số 1.
**c) Sản phẩm:** Phiếu học tập số 1 đã điền đầy đủ định nghĩa AI, năm 1956, và 3 năng lực: Học hỏi từ dữ liệu, Suy luận logic, Tự thích nghi cải thiện.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* GV phát Phiếu học tập số 1, yêu cầu các nhóm đọc SGK mục 1 (trang 6) và trả lời 3 câu hỏi trọng tâm.
- *Bước 2: Thực hiện nhiệm vụ:* Học sinh đọc SGK, thảo luận nhóm, phân công thư kí ghi kết quả vào phiếu. GV đi quanh quan sát, hỗ trợ các nhóm gặp khó khăn.
- *Bước 3: Báo cáo, thảo luận:* Đại diện nhóm 2 báo cáo. Nhóm 4 nhận xét, bổ sung.
- *Bước 4: Kết luận, nhận định:* GV chốt kiến thức chuẩn trên slide: AI là ngành khoa học máy tính nghiên cứu cách làm cho máy tính có khả năng suy nghĩ, học hỏi và hành động thông minh như con người.

##### Hoạt động 2.2: Khám phá các lĩnh vực ứng dụng tiêu biểu của AI (20 phút)
**a) Mục tiêu:** Liệt kê và phân tích được ứng dụng của AI trong thị giác máy tính, xử lý ngôn ngữ, hệ thống tự hành và giáo dục/y tế.
**b) Nội dung:** Kĩ thuật "Mảnh ghép": 4 chuyên gia tìm hiểu 4 lĩnh vực ứng dụng của AI, sau đó về nhóm ghép chia sẻ lại cho nhau.
**c) Sản phẩm:** Sơ đồ tư duy tóm tắt 4 lĩnh vực ứng dụng AI do các nhóm thiết kế.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* Chia lớp thành 4 nhóm chuyên sâu (Vòng 1): Nhóm 1 (Thị giác máy tính), Nhóm 2 (Xử lý ngôn ngữ tự nhiên), Nhóm 3 (Xe tự lái và Robot), Nhóm 4 (AI trong y tế và giáo dục).
- *Bước 2: Thực hiện nhiệm vụ:* Nhóm chuyên gia thảo luận 5 phút, sau đó di chuyển tạo thành nhóm mới (Vòng 2) để lần lượt trình bày lĩnh vực của mình.
- *Bước 3: Báo cáo, thảo luận:* GV gọi ngẫu nhiên một thành viên nhóm mới trình bày tổng quan cả 4 ứng dụng.
- *Bước 4: Kết luận, nhận định:* GV chiếu các hình ảnh/video thực tế sinh động, chốt lại tác động to lớn của từng ứng dụng.

##### Hoạt động 2.3: Phân loại AI: AI hẹp và AI tổng quát (20 phút)
**a) Mục tiêu:** Phân biệt được AI hẹp (Narrow AI) và AI tổng quát (General AI/AGI); nhận thức rõ ChatGPT/Gemini vẫn là AI hẹp.
**b) Nội dung:** Phân tích tình huống so sánh giữa máy chơi cờ vua chuyên sâu và trí tuệ linh hoạt của con người.
**c) Sản phẩm:** Bảng so sánh hoàn chỉnh: Tiêu chí so sánh, Khái niệm, Phạm vi nhiệm vụ, Khả năng tự mở rộng, Ví dụ thực tế.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* GV đặt vấn đề: "Một phần mềm chơi cờ vua đánh thắng kiện tướng thế giới có thể lái xe hoặc sáng tác thơ được không? Tại sao?"
- *Bước 2: Thực hiện nhiệm vụ:* HS suy nghĩ và thảo luận nhóm đôi hoàn thành bảng so sánh AI hẹp và AGI.
- *Bước 3: Báo cáo, thảo luận:* 2 học sinh đại diện trình bày. Cả lớp cùng phân tích câu hỏi: "ChatGPT đã đạt tới AGI chưa?"
- *Bước 4: Kết luận, nhận định:* GV giải thích: AGI là mục tiêu nghiên cứu dài hạn. Mọi hệ thống hiện nay đều là AI hẹp vì chỉ giải quyết bài toán trong tập dữ liệu huấn luyện cụ thể.

---

#### HOẠT ĐỘNG 3: LUYỆN TẬP (13 phút)
**a) Mục tiêu:** Củng cố khắc sâu kiến thức về định nghĩa, lịch sử, ứng dụng và phân loại AI qua hệ thống câu hỏi trắc nghiệm.
**b) Nội dung:** Học sinh tham gia trò chơi trắc nghiệm 8 câu tương tác nhanh trên màn hình lớp học.
**c) Sản phẩm:** Kết quả trả lời và bảng xếp hạng điểm số của học sinh.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* GV kích hoạt bộ câu hỏi trắc nghiệm gồm 4 câu nhận biết, 3 câu thông hiểu và 1 câu vận dụng nhanh.
- *Bước 2: Thực hiện nhiệm vụ:* Học sinh suy nghĩ và chọn phương án A, B, C hoặc D.
- *Bước 3: Báo cáo, thảo luận:* Với những câu hỏi có tỉ lệ chọn sai nhiều, GV dừng lại yêu cầu học sinh giải thích vì sao chọn phương án đó.
- *Bước 4: Kết luận, nhận định:* GV tổng kết, khen ngợi những học sinh có câu trả lời nhanh và chính xác nhất; giải thích cặn kẽ các bẫy khái niệm.

---

#### HOẠT ĐỘNG 4: VẬN DỤNG (10 phút)
**a) Mục tiêu:** Rèn luyện năng lực vận dụng kiến thức công nghệ vào thực tiễn; nâng cao ý thức trách nhiệm và đạo đức học đường khi sử dụng AI.
**b) Nội dung:** Xử lý tình huống đạo đức học đường: "Bạn Nam dùng công cụ AI viết toàn bộ bài văn và bài tập Tin học nộp cho thầy cô."
**c) Sản phẩm:** Bản ý kiến ngắn gọn của học sinh phân tích cái đúng, cái sai và đề xuất giải pháp sử dụng AI thông minh, có trách nhiệm.
**d) Tổ chức thực hiện:**
- *Bước 1: Chuyển giao nhiệm vụ:* GV nêu tình huống tranh luận về tính trung thực và sự phụ thuộc vào công nghệ số.
- *Bước 2: Thực hiện nhiệm vụ:* Học sinh viết nhanh 3-4 dòng nêu quan điểm cá nhân ra giấy hoặc padlet.
- *Bước 3: Báo cáo, thảo luận:* GV gọi 2 ý kiến trái chiều để các em cùng tranh luận.
- *Bước 4: Kết luận, nhận định:* GV gửi gắm thông điệp: "AI là trợ thủ đắc lực giúp ta học nhanh hơn, nhưng chính các em mới là người sở hữu tư duy và đạo đức. Hãy dùng AI như một công cụ hỗ trợ, không để AI thay thế bộ não của mình."

---

### IV. KIỂM TRA VÀ ĐÁNH GIÁ
1. Đánh giá thường xuyên:
- Quan sát thái độ tích cực hợp tác, tinh thần trách nhiệm trong hoạt động nhóm của học sinh.
- Đánh giá sản phẩm học tập: Phiếu học tập số 1 và số 2 theo bảng kiểm (Checklist 3 tiêu chí: Đúng kiến thức, Đầy đủ ví dụ, Trình bày khoa học).
- Đánh giá câu trả lời trắc nghiệm tương tác trong phần Luyện tập.

2. Tiêu chí đánh giá sản phẩm vận dụng:
- Mức Tốt: Phân tích được cả 2 khía cạnh lợi ích và rủi ro; đưa ra được quy tắc sử dụng AI văn minh, trung thực.
- Mức Đạt: Nêu được quan điểm cá nhân rõ ràng.
- Mức Chưa đạt: Chưa nêu được luận điểm thuyết phục.

---

### V. ĐIỀU CHỈNH SAU BÀI DẠY
- Lưu ý về thời gian: Hoạt động 2.3 cần phân bổ thời gian hợp lý tránh bị cháy giáo án do học sinh hào hứng tranh luận về ChatGPT.
- Đối với các lớp học sinh tiếp thu nhanh: Mở rộng thêm khái niệm Học máy (Machine Learning) và Dữ liệu lớn (Big Data) để chuẩn bị cho Bài 3.
- Đối với các lớp học sinh còn bỡ ngỡ: Tập trung vào các ví dụ đời thường gần gũi như FaceID và Google Dịch để các em dễ hình dung.`);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Keep synced with global header selectors unless overridden
  useEffect(() => {
    setSubject(currentSubject);
  }, [currentSubject]);

  useEffect(() => {
    setGrade(currentGrade);
  }, [currentGrade]);

  useEffect(() => {
    setCurriculum(currentCurriculum);
  }, [currentCurriculum]);

  // Quick fill sample lesson (Tin học)
  const handleQuickFill = () => {
    const samples = SAMPLE_LESSONS_BY_SUBJECT[subject] || SAMPLE_LESSONS_BY_SUBJECT['Tin học'];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    if (sample) {
      setLessonTitle(sample.title);
      setDuration(sample.duration);
      setObjectives(sample.objectives);
      setContent(sample.content);
    }
  };

  // Generate Lesson Plan via Server-side Gemini API
  const handleGenerate = async () => {
    if (!lessonTitle.trim()) {
      setErrorMsg('Vui lòng nhập tên bài học để bắt đầu soạn.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle,
          subject,
          grade,
          curriculum,
          duration,
          objectives,
          content,
          teachingMethods,
          referenceText: activeDocument?.rawText || activeDocument?.summary || '',
          teacherInfo: teacherProfile,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo kế hoạch bài dạy.');
      }

      setGeneratedPlan(data.lessonPlan);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Không thể kết nối đến AI server. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy
  const handleCopy = async () => {
    if (!generatedPlan) return;
    const ok = await copyToClipboard(generatedPlan);
    if (ok) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Export Word (.doc)
  const handleExportWord = () => {
    if (!generatedPlan) return;
    exportToWordDoc(lessonTitle || 'GiaoAn_THPT', generatedPlan, {
      teacher: teacherProfile.fullName,
      school: teacherProfile.school,
      subject: subject,
      grade: grade,
    });
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Clear
  const handleClear = () => {
    if (confirm('Thầy/Cô có chắc chắn muốn xóa kết quả giáo án này không?')) {
      setGeneratedPlan('');
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 border border-blue-400/30 text-xs font-semibold mb-2">
              <FileCheck className="w-3.5 h-3.5" /> BƯỚC 2: CHUẨN CÔNG VĂN 5512 / BỘ GIÁO DỤC VÀ ĐÀO TẠO
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Soạn Kế Hoạch Bài Dạy Chuẩn Công Văn 5512
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-2xl">
              Tạo giáo án chi tiết 5 phần: Mục tiêu (kiến thức, năng lực, phẩm chất), Thiết bị, Tiến trình 4 hoạt động
              (với mục tiêu, nội dung, sản phẩm và 4 bước tổ chức thực hiện của GV & HS), Đánh giá và Điều chỉnh.
            </p>
          </div>

          <button
            onClick={handleQuickFill}
            className="px-4 py-2.5 rounded-xl bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs flex items-center gap-2 shadow-lg transition-all self-start md:self-auto cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-amber-500" /> Điền nhanh bài học mẫu
          </button>
        </div>

        {activeDocument && (
          <div className="mt-4 pt-3 border-t border-white/20 text-xs flex items-center gap-2 text-blue-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Đang liên kết dữ liệu SGK tham khảo:</span>
            <span className="font-bold underline text-white">{activeDocument.title}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Input Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (5 cols on large screens) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-blue-600" /> Thông tin bài học cần soạn
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Tên bài học */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên bài học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Ví dụ: Bài 1: Mệnh đề toán học"
                className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            {/* Môn, Lớp, Bộ sách */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Môn học</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                >
                  {HIGH_SCHOOL_SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                >
                  {HIGH_SCHOOL_GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bộ sách</label>
                <select
                  value={curriculum}
                  onChange={(e) => setCurriculum(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                >
                  {BOOK_CURRICULUMS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thời lượng (Số tiết)</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ví dụ: 2 tiết (90 phút)"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Yêu cầu cần đạt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yêu cầu cần đạt (Mục tiêu kiến thức, năng lực)
              </label>
              <textarea
                rows={3}
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Nhận biết, thông hiểu, vận dụng các khái niệm và kĩ năng cốt lõi..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Nội dung kiến thức */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nội dung kiến thức trọng tâm
              </label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Khái niệm, công thức, định lý, ví dụ minh họa và bài tập vận dụng..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Phương pháp dạy học */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phương pháp & Kĩ thuật dạy học
              </label>
              <select
                value={teachingMethods}
                onChange={(e) => setTeachingMethods(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-xl mb-1.5 bg-slate-50"
              >
                {TEACHING_METHODS_SUGGESTIONS.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
              <input
                type="text"
                value={teachingMethods}
                onChange={(e) => setTeachingMethods(e.target.value)}
                placeholder="Hoặc tùy chỉnh phương pháp..."
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600"
              />
            </div>

            {/* Nút hành động */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" /> Đang soạn giáo án chuẩn 5512...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" /> TẠO KẾ HOẠCH BÀI DẠY (5512)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Output Result (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col h-full min-h-[580px]">
            {/* Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Kế hoạch bài dạy đã tạo
                </h3>
                <span className="text-[11px] text-slate-400">
                  {generatedPlan ? 'Có thể xem, sửa trực tiếp, sao chép hoặc tải Word' : 'Chưa có kết quả'}
                </span>
              </div>

              {generatedPlan && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                      isEditing ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Chỉnh sửa trực tiếp nội dung"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Xong sửa' : 'Sửa'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Sao chép toàn bộ"
                  >
                    {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copySuccess ? 'Đã chép' : 'Sao chép'}</span>
                  </button>

                  <button
                    onClick={handleExportWord}
                    className="p-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Tải file Word (.doc)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Word</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-colors"
                    title="In giáo án"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-colors"
                    title="Tạo lại"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs transition-colors"
                    title="Xóa kết quả"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Display Area */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center animate-bounce shadow-md">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">
                      Đang biên soạn Kế hoạch bài dạy theo Công văn 5512
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      AI đang thiết kế chuỗi 4 hoạt động dạy học, chỉ rõ mục tiêu, sản phẩm và 4 bước tổ chức thực hiện của GV và HS...
                    </p>
                  </div>
                </div>
              ) : generatedPlan ? (
                isEditing ? (
                  <textarea
                    rows={26}
                    value={generatedPlan}
                    onChange={(e) => setGeneratedPlan(e.target.value)}
                    className="w-full p-4 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
                  />
                ) : (
                  <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 space-y-3 font-sans selection:bg-blue-100">
                    {/* Rendered plan */}
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {generatedPlan}
                    </div>

                    {/* Quick helper button to bridge to slide */}
                    {onSendToSlideTab && (
                      <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="text-slate-600 text-[11px] font-semibold">
                          💡 Muốn chuyển đổi giáo án này thành Slide trình chiếu 16:9?
                        </span>
                        <button
                          onClick={() => onSendToSlideTab(lessonTitle, generatedPlan)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          Chuyển sang B3 (Tạo Slide) →
                        </button>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm">Chưa có kế hoạch bài dạy</h4>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Nhập thông tin bài học ở cột bên trái hoặc bấm "Điền nhanh bài học mẫu", sau đó nhấn "TẠO KẾ HOẠCH BÀI DẠY (5512)".
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
