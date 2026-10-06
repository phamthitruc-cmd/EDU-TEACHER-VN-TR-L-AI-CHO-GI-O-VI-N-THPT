import { GradeLevel, BookCurriculum, ReferenceDocument, TeacherProfile } from '../types';

export const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  fullName: 'Phạm Thị Trúc',
  school: 'Trường THPT Huỳnh Tấn Phát',
  grade: '11 và 12',
  subject: 'Tin học',
};

export const HIGH_SCHOOL_SUBJECTS = [
  'Tin học',
  'Toán học',
  'Vật lí',
  'Hóa học',
  'Sinh học',
  'Ngữ văn',
  'Lịch sử',
  'Địa lí',
  'Tiếng Anh',
  'Giáo dục kinh tế và pháp luật',
  'Công nghệ',
  'Giáo dục quốc phòng và an ninh',
  'Hoạt động trải nghiệm, hướng nghiệp',
] as const;

export const HIGH_SCHOOL_GRADES: GradeLevel[] = ['Lớp 12', 'Lớp 11', 'Lớp 10'];

export const BOOK_CURRICULUMS: BookCurriculum[] = [
  'Kết nối tri thức với cuộc sống',
  'Cánh diều',
  'Chân trời sáng tạo',
];

export const TEACHING_METHODS_SUGGESTIONS = [
  'Dạy học giải quyết vấn đề kết hợp trải nghiệm phần mềm AI thực tế',
  'Phương pháp thảo luận nhóm và kĩ thuật Khăn trải bàn về đạo đức AI',
  'Dạy học dự án: Ứng dụng AI trong học tập và đời sống',
  'Kĩ thuật KWL (Biết - Muốn biết - Đã học) kết hợp sơ đồ tư duy',
  'Phương pháp đóng vai xử lý tình huống đạo đức và pháp lý công nghệ',
  'Dạy học phân hóa kết hợp Phiếu học tập đa phương tiện',
];

export const DEFAULT_SAMPLE_LESSON = {
  title: 'Bài 1: Làm quen với Trí tuệ nhân tạo',
  subject: 'Tin học',
  grade: 'Lớp 12',
  curriculum: 'Kết nối tri thức với cuộc sống',
  duration: '2 tiết',
  objectives: `- Nêu được định nghĩa đơn giản về Trí tuệ nhân tạo (AI - Artificial Intelligence).
- Nhận biết được một số ứng dụng tiêu biểu của AI trong đời sống: nhận dạng khuôn mặt, dịch tự động, xe tự hành, trợ lý ảo, y tế, giáo dục.
- Phân biệt được AI hẹp (Narrow AI) và AI tổng quát (AGI).
- Hình thành năng lực công nghệ thông tin và truyền thông, tư duy phản biện khi sử dụng công nghệ số; có ý thức trách nhiệm và đạo đức khi tiếp cận các sản phẩm AI.`,
  content: `1. Khái niệm Trí tuệ nhân tạo (AI):
- Khái niệm: Trí tuệ nhân tạo là khả năng của máy tính hoặc hệ thống có thể thực hiện những công việc đòi hỏi trí thông minh của con người (nhận thức, học hỏi, suy luận, giải quyết vấn đề).
- Lịch sử ra đời: Hội thảo Dartmouth (1956), Alan Turing và phép thử Turing.
2. Một số lĩnh vực ứng dụng của AI:
- Nhận dạng giọng nói, hình ảnh và khuôn mặt (FaceID, trợ lý ảo Siri, Google Assistant).
- Xử lý ngôn ngữ tự nhiên (NLP): Dịch tự động, tóm tắt văn bản, chatbot tạo sinh (ChatGPT, Gemini).
- Hệ thống tự hành và robot thông minh (xe tự lái Tesla, robot phẫu thuật).
- Phân tích dữ liệu lớn và dự báo (chẩn đoán y tế, khí tượng thủy văn, tài chính).
3. Phân loại AI:
- AI hẹp (Narrow AI / Weak AI): AI được thiết kế giải quyết một nhiệm vụ cụ thể (chơi cờ, nhận diện ảnh).
- AI tổng quát (General AI / Strong AI): Khả năng tư duy toàn diện như con người (mục tiêu nghiên cứu tương lai).
4. Khía cạnh xã hội và đạo đức AI:
- Tác động tích cực và thách thức (việc làm, quyền riêng tư, an toàn dữ liệu, tính trung thực học thuật).`,
};

export const SAMPLE_LESSONS_BY_SUBJECT: Record<string, { title: string; duration: string; objectives: string; content: string }[]> = {
  'Tin học': [
    DEFAULT_SAMPLE_LESSON,
    {
      title: 'Bài 2: Trí tuệ nhân tạo trong đời sống',
      duration: '2 tiết',
      objectives: 'Nhận biết và phân tích được tác động tích cực và những rủi ro của AI đối với xã hội, việc làm và quyền riêng tư. Trình bày được một số quy tắc đạo đức khi phát triển và sử dụng AI.',
      content: 'Ứng dụng AI trong y tế, giao thông, tài chính, giáo dục. Thách thức: thiên kiến dữ liệu, bảo mật thông tin cá nhân, bản quyền nội dung tạo sinh. Trách nhiệm người sử dụng.',
    },
    {
      title: 'Bài 3: Giới thiệu về Học máy và Khoa học dữ liệu',
      duration: '2 tiết',
      objectives: 'Hiểu được mối liên hệ giữa Dữ liệu lớn (Big Data), Học máy (Machine Learning) và AI. Nhận diện các bước cơ bản trong quy trình học máy: thu thập dữ liệu, huấn luyện mô hình, kiểm thử.',
      content: 'Khái niệm Machine Learning: Học có giám sát (Supervised), Học không giám sát (Unsupervised), Học tăng cường. Ví dụ phân loại thư rác và dự đoán giá nhà.',
    },
    {
      title: 'Bài 7: Hệ quản trị cơ sở dữ liệu và Ngôn ngữ SQL',
      duration: '2 tiết',
      objectives: 'Nắm vững khái niệm bảng, khóa chính, khóa ngoại. Viết được các câu lệnh truy vấn SQL cơ bản: SELECT, FROM, WHERE, ORDER BY trên CSDL quan hệ.',
      content: 'Cấu trúc CSDL quan hệ. Khóa chính (Primary Key). Cú pháp lệnh SELECT lọc dữ liệu học sinh theo điểm số và lớp học.',
    },
    {
      title: 'Bài 11: Mạng máy tính và An toàn trên Internet',
      duration: '2 tiết',
      objectives: 'Mô tả được chức năng của giao thức TCP/IP, địa chỉ IP, DNS. Nêu được các nguy cơ mất an toàn thông tin và biện pháp phòng tránh mã độc, lừa đảo trực tuyến.',
      content: 'Mô hình kết nối mạng, vai trò Router/Switch. Nguy cơ lừa đảo Phishing, virus/ransomware. Quy tắc mật khẩu mạnh và xác thực 2 yếu tố (2FA).',
    },
  ],
};

export const INITIAL_PRELOADED_DOCUMENTS: ReferenceDocument[] = [
  {
    id: 'sgk-kntt-tinhoc-12',
    title: 'Sách giáo khoa Tin học 12 (Chủ đề 1: Trí tuệ nhân tạo) - KNTT',
    type: 'SGK',
    subject: 'Tin học',
    grade: 'Lớp 12',
    curriculum: 'Kết nối tri thức với cuộc sống',
    fileName: 'SGK_TinHoc_12_KNTT_ChuDe_AI.pdf',
    fileSize: '4.2 MB',
    uploadDate: '2026-09-01',
    isActiveSource: true,
    summary: 'Chủ đề 1: MÁY TÍNH VÀ XÃ HỘI TRI THỨC. Bài 1: Làm quen với Trí tuệ nhân tạo; Bài 2: Trí tuệ nhân tạo trong đời sống; Bài 3: Giới thiệu về Học máy và Khoa học dữ liệu.',
    rawText: `CHỦ ĐỀ 1: MÁY TÍNH VÀ XÃ HỘI TRI THỨC
BÀI 1: LÀM QUEN VỚI TRÍ TUỆ NHÂN TẠO (SÁCH GIÁO KHOA TIN HỌC 12 - KẾT NỐI TRI THỨC)

1. Khái niệm Trí tuệ nhân tạo (AI):
- Trí tuệ nhân tạo (Artificial Intelligence - AI) là ngành khoa học máy tính nghiên cứu và phát triển các hệ thống máy tính có khả năng thực hiện các hoạt động thông minh tương tự con người như: học hỏi, suy diễn, nhận thức thị giác, nhận dạng giọng nói, ra quyết định và tự điều chỉnh.
- Thuật ngữ AI chính thức xuất hiện tại Hội thảo Dartmouth năm 1956 do John McCarthy khởi xướng.

2. Đặc trưng và ví dụ tiêu biểu:
- Khả năng học (Learning): AI có thể rút ra quy luật từ dữ liệu lớn (Big Data).
- Khả năng suy luận (Reasoning): Hệ thống đưa ra kết luận logic từ các tiền đề đã cho.
- Khả năng tự sửa lỗi và tối ưu: Không ngừng cải thiện độ chính xác qua quá trình huấn luyện.
- Ứng dụng: Nhận diện khuôn mặt FaceID, xe tự lái hỗ trợ lái xe an toàn, dịch ngôn ngữ tự động (Google Translate), trợ lý ảo đàm thoại (Siri, Alexa), các mô hình ngôn ngữ lớn (LLM - ChatGPT, Gemini).

3. Phân loại AI:
- AI hẹp (Narrow AI): Chuyên biệt hóa cao, giải quyết xuất sắc một lĩnh vực hẹp xác định. Hầu hết các hệ thống AI hiện nay đều thuộc loại này.
- AI tổng quát (General AI - AGI): Có năng lực trí tuệ tương đương hoặc vượt con người trên nhiều lĩnh vực nhận thức khác nhau (mục tiêu nghiên cứu dài hạn).

4. Yêu cầu cần đạt sau bài học:
- Trình bày được định nghĩa sơ lược về AI.
- Nêu được 4-5 ví dụ thực tiễn về ứng dụng của AI trong đời sống và học tập.
- Thảo luận được mặt tích cực và các lưu ý đạo đức, an toàn khi sử dụng AI.`
  },
  {
    id: 'sgv-kntt-tinhoc-12',
    title: 'Sách giáo viên Tin học 12 - Hướng dẫn dạy học Bài 1 (Công văn 5512)',
    type: 'SGV',
    subject: 'Tin học',
    grade: 'Lớp 12',
    curriculum: 'Kết nối tri thức với cuộc sống',
    fileName: 'SGV_TinHoc_12_KNTT_HuongDan_Bai1.pdf',
    fileSize: '3.6 MB',
    uploadDate: '2026-09-05',
    isActiveSource: false,
    summary: 'Kế hoạch dạy học theo Công văn 5512: Khởi động trải nghiệm trò chơi đoán hình / FaceID; Hình thành kiến thức qua phiếu học tập phân loại AI; Luyện tập thảo luận nhóm và Vận dụng viết bài thu hoạch.',
    rawText: `HƯỚNG DẪN TỔ CHỨC DẠY HỌC BÀI 1: LÀM QUEN VỚI TRÍ TUỆ NHÂN TẠO (SGV TIN HỌC 12 KNTT)
1. Hoạt động 1: Mở đầu / Khởi động (7 phút)
- Mục tiêu: Tạo hứng thú và kết nối kiến thức thực tế của học sinh về điện thoại thông minh, nhận diện khuôn mặt, các ứng dụng dịch thuật.
- Tổ chức: Giáo viên trình chiếu video ngắn về robot hình người hoặc cho học sinh trải nghiệm tính năng tìm kiếm bằng giọng nói/hình ảnh trên điện thoại.
2. Hoạt động 2: Hình thành kiến thức mới (25 phút)
- Hoạt động 2.1: Tìm hiểu khái niệm AI. GV chuyển giao nhiệm vụ đọc SGK trang 6-8, HS làm việc cá nhân và trả lời câu hỏi phát vấn.
- Hoạt động 2.2: Phân loại AI hẹp và AI tổng quát. HS thảo luận nhóm đôi hoàn thành bảng so sánh.
3. Hoạt động 3: Luyện tập (8 phút)
- Tổ chức trò chơi trắc nghiệm nhanh trên Quizizz hoặc thẻ màu A-B-C-D về các ví dụ ứng dụng AI.
4. Hoạt động 4: Vận dụng (5 phút)
- Giao nhiệm vụ tìm hiểu một ứng dụng AI hỗ trợ học tập (học Tiếng Anh, giải Toán, tra cứu thông tin) và nhận xét ưu nhược điểm.`
  },
  {
    id: 'sbt-kntt-tinhoc-12',
    title: 'Sách bài tập Tin học 12 - Ngân hàng câu hỏi trắc nghiệm & tự luận Bài 1',
    type: 'SBT',
    subject: 'Tin học',
    grade: 'Lớp 12',
    curriculum: 'Kết nối tri thức với cuộc sống',
    fileName: 'SBT_TinHoc_12_KNTT_Bai1.pdf',
    fileSize: '2.8 MB',
    uploadDate: '2026-09-10',
    isActiveSource: false,
    summary: 'Tổng hợp câu hỏi nhận biết, thông hiểu, vận dụng theo format đề thi tốt nghiệp THPT 2025: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai 4 ý, Trả lời ngắn về Trí tuệ nhân tạo.',
    rawText: `CÂU HỎI BÀI TẬP BÀI 1 (SBT TIN HỌC 12 KNTT):
Câu 1 (Nhận biết): Thuật ngữ Trí tuệ nhân tạo (AI) lần đầu tiên được đưa ra tại hội thảo nào?
A. Hội thảo Luân Đôn năm 1950.
B. Hội thảo Dartmouth năm 1956.
C. Hội thảo Tokyo năm 1968.
D. Hội thảo Stanford năm 1972.
Đáp án: B.

Câu 2 (Thông hiểu - Đúng/Sai theo định dạng 2025): Cho các nhận định sau về Trí tuệ nhân tạo (AI):
a) AI hẹp chỉ thực hiện tốt một nhiệm vụ cụ thể mà nó được lập trình hoặc huấn luyện. (Đúng)
b) ChatGPT và Google Gemini là các ví dụ của AI tổng quát (AGI) có thể thay thế hoàn toàn con người. (Sai)
c) Khả năng tự học hỏi từ dữ liệu là một trong những đặc trưng quan trọng của hệ thống AI hiện đại. (Đúng)
d) Robot hút bụi thông minh tự vẽ bản đồ nhà ở là một ứng dụng của AI hẹp. (Đúng)`
  },
  {
    id: 'sgk-kntt-tinhoc-11',
    title: 'Sách giáo khoa Tin học 11 - Định hướng Tin học ứng dụng - KNTT',
    type: 'SGK',
    subject: 'Tin học',
    grade: 'Lớp 11',
    curriculum: 'Kết nối tri thức với cuộc sống',
    fileName: 'SGK_TinHoc_11_KNTT.pdf',
    fileSize: '5.0 MB',
    uploadDate: '2026-09-12',
    isActiveSource: false,
    summary: 'Chủ đề: Hệ điều hành và phần mềm ứng dụng; Lưu trữ trực tuyến; Cơ sở dữ liệu và hệ quản trị CSDL quan hệ; Lập trình web cơ bản.',
    rawText: `SÁCH GIÁO KHOA TIN HỌC 11 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG):
- Chủ đề 1: Máy tính và xã hội tri thức (Hệ điều hành mã nguồn mở và thương mại, phần mềm ứng dụng).
- Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và chia sẻ thông tin (Lưu trữ đám mây Google Drive, OneDrive).
- Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số (Bản quyền phần mềm, an toàn thông tin).
- Chủ đề 4: Giới thiệu hệ quản trị cơ sở dữ liệu quan hệ (Bảng, khóa chính, liên kết dữ liệu).`
  }
];

export const SAMPLE_SLIDES_BAI_1_TIN_12 = {
  themeTitle: 'Bài 1: Làm quen với Trí tuệ nhân tạo (Tin học 12)',
  subject: 'Tin học',
  grade: 'Lớp 12',
  curriculum: 'Kết nối tri thức với cuộc sống',
  slides: [
    {
      id: 'slide-1',
      slideNumber: 1,
      type: 'intro' as const,
      title: 'BÀI 1: LÀM QUEN VỚI TRÍ TUỆ NHÂN TẠO',
      subtitle: 'Môn: Tin học 12 | Bộ sách: Kết nối tri thức với cuộc sống',
      bullets: [
        'Giáo viên giảng dạy: Cô Phạm Thị Trúc',
        'Đơn vị công tác: Trường THPT Huỳnh Tấn Phát',
        'Thời lượng: 2 tiết | Chủ đề 1: Máy tính và xã hội tri thức',
      ],
      teacherNotes: 'Chào mừng các em học sinh lớp 12 đến với chuyên đề công nghệ đột phá nhất của thế kỉ 21: Trí tuệ nhân tạo (AI)!',
      visualSuggestion: 'Hình minh họa mạng nơ-ron số hóa phát sáng rực rỡ kết nối với bộ não con người và vi mạch bán dẫn.',
      badge: 'Khởi động',
    },
    {
      id: 'slide-2',
      slideNumber: 2,
      type: 'objective' as const,
      title: 'MỤC TIÊU BÀI HỌC (YÊU CẦU CẦN ĐẠT)',
      subtitle: 'Chuẩn chương trình Giáo dục phổ thông 2018',
      bullets: [
        'Nêu được định nghĩa cơ bản và lịch sử hình thành của Trí tuệ nhân tạo (AI).',
        'Liệt kê và phân tích 4-5 lĩnh vực ứng dụng tiêu biểu của AI trong đời sống hiện đại.',
        'Phân biệt rõ ràng giữa AI hẹp (Narrow AI) và AI tổng quát (AGI).',
        'Nhận thức đúng đắn về cơ hội, thách thức và đạo đức khi sử dụng công nghệ AI.',
      ],
      teacherNotes: 'Thầy cô nhấn mạnh: Bài học không chỉ giúp hiểu công nghệ mà còn trang bị tư duy làm chủ công nghệ có trách nhiệm.',
      visualSuggestion: 'Biểu tượng 4 chiếc chìa khóa thành công tương ứng với 4 chuẩn năng lực tin học cần đạt.',
      badge: 'Mục tiêu',
    },
    {
      id: 'slide-3',
      slideNumber: 3,
      type: 'activity' as const,
      title: 'HOẠT ĐỘNG KHỞI ĐỘNG: AI XUNG QUANH CHÚNG TA',
      subtitle: 'Trải nghiệm tình huống thực tiễn',
      bullets: [
        'Mở khóa điện thoại bằng FaceID hoạt động như thế nào?',
        'Youtube / TikTok gợi ý video bạn thích dựa vào đâu?',
        'Chatbot dịch tự động và hỗ trợ học tập có phải là AI?',
        'Thảo luận nhanh (3 phút): Em đã từng dùng công cụ AI nào?',
      ],
      teacherNotes: 'Cho học sinh chia sẻ nhanh 1 trải nghiệm thú vị khi dùng FaceID, Google Lens hoặc ChatGPT.',
      visualSuggestion: 'Collage ảnh chụp màn hình nhận diện khuôn mặt FaceID, bản đồ Google Maps và trợ lý ảo Siri.',
      badge: 'Khám phá',
    },
    {
      id: 'slide-4',
      slideNumber: 4,
      type: 'concept' as const,
      title: '1. KHÁI NIỆM TRÍ TUỆ NHÂN TẠO (AI)',
      subtitle: 'Artificial Intelligence - Ngành khoa học máy tính thông minh',
      bullets: [
        'Định nghĩa: Khả năng của hệ thống máy tính thực hiện các tác vụ đòi hỏi trí tuệ con người.',
        'Nguồn gốc: Thuật ngữ AI ra đời tại Hội thảo Dartmouth năm 1956 (John McCarthy).',
        '3 khả năng cốt lõi: Tiếp nhận tri thức, suy luận giải quyết vấn đề và tự học hỏi cải thiện.',
        'Đặc điểm nổi bật: Xử lý khối lượng dữ liệu khổng lồ (Big Data) với tốc độ siêu nhanh.',
      ],
      teacherNotes: 'Lưu ý học sinh: AI không phải là "phép màu", mà là sự kết hợp giữa toán học, thuật toán và dữ liệu.',
      visualSuggestion: 'Sơ đồ hình quạt thể hiện 3 trụ cột: Toán học/Thống kê + Khoa học máy tính + Dữ liệu lớn.',
      badge: 'Kiến thức mới',
    },
    {
      id: 'slide-5',
      slideNumber: 5,
      type: 'concept' as const,
      title: '2. CÁC ỨNG DỤNG TIÊU BIỂU CỦA AI',
      subtitle: 'Hiện diện trong mọi ngõ ngách đời sống và sản xuất',
      bullets: [
        'Thị giác máy tính: Nhận diện khuôn mặt, chẩn đoán hình ảnh X-quang/MRI trong y tế.',
        'Xử lý ngôn ngữ tự nhiên: Dịch máy, tóm tắt tài liệu, AI tạo sinh văn bản & hình ảnh.',
        'Hệ thống tự hành: Xe tự lái, máy bay không người lái, robot kho bãi tự động.',
        'Giáo dục thông minh: Hệ thống gợi ý lộ trình học tập cá nhân hóa cho từng học sinh.',
      ],
      teacherNotes: 'Lấy ví dụ gần gũi: Bác sĩ dùng AI phát hiện sớm khối u ung thư với độ chính xác trên 95%.',
      visualSuggestion: 'Infographic 4 góc minh họa: Y tế, Giao thông thông minh, Giáo dục và Trợ lý đàm thoại.',
      badge: 'Kiến thức mới',
    },
    {
      id: 'slide-6',
      slideNumber: 6,
      type: 'concept' as const,
      title: '3. PHÂN LOẠI AI: AI HẸP VÀ AI TỔNG QUÁT',
      subtitle: 'Bản chất sự phát triển của công nghệ hiện nay',
      bullets: [
        'AI HẸP (Narrow AI / Weak AI): Chuyên biệt hóa cao cho 1 nhiệm vụ duy nhất (chơi cờ vây AlphaGo, FaceID, lọc thư rác). Tất cả AI hiện nay là AI hẹp!',
        'AI TỔNG QUÁT (General AI / AGI): Có nhận thức, tư duy toàn diện và sáng tạo linh hoạt như con người trên mọi lĩnh vực.',
        'Thực tế hiện nay: AGI vẫn đang là mục tiêu nghiên cứu tương lai, chưa xuất hiện trong thực tế.',
      ],
      teacherNotes: 'Nhấn mạnh điểm hay nhầm lẫn: ChatGPT rất thông minh nhưng vẫn thuộc nhóm AI hẹp (mô hình ngôn ngữ), chưa phải AGI.',
      visualSuggestion: 'Bảng đối chiếu 2 cột so sánh trực quan giữa Narrow AI và General AI kèm thang tiến trình thời gian.',
      badge: 'So sánh cốt lõi',
    },
    {
      id: 'slide-7',
      slideNumber: 7,
      type: 'exercise' as const,
      title: 'HOẠT ĐỘNG LUYỆN TẬP: TRẮC NGHIỆM TƯƠNG TÁC',
      subtitle: 'Củng cố kiến thức trực tiếp tại lớp',
      bullets: [
        'Câu 1: Thuật ngữ Trí tuệ nhân tạo (AI) ra đời vào năm nào? (Đáp án: 1956)',
        'Câu 2: Hệ thống FaceID mở khóa khuôn mặt thuộc loại AI nào? (Đáp án: AI hẹp)',
        'Câu 3: Đâu KHÔNG phải là đặc trưng của AI? (Khả năng cảm nhận tình cảm như con người)',
        'Học sinh giơ thẻ màu hoặc trả lời nhanh trên bảng phụ.',
      ],
      teacherNotes: 'Tuyên dương các nhóm có câu trả lời chính xác và giải thích rõ ràng căn cứ từ bài học.',
      visualSuggestion: 'Giao diện đồng hồ bấm giờ 30 giây cùng 4 phương án trắc nghiệm sinh động A-B-C-D.',
      badge: 'Luyện tập',
    },
    {
      id: 'slide-8',
      slideNumber: 8,
      type: 'summary' as const,
      title: 'TỔNG KẾT & VẬN DỤNG TẠI NHÀ',
      subtitle: 'Nhiệm vụ học tập chuẩn bị cho tiết học sau',
      bullets: [
        'Ghi nhớ: AI là công cụ hỗ trợ đắc lực nhưng không thể thay thế phẩm chất đạo đức và sự sáng tạo của con người.',
        'Nhiệm vụ về nhà: Tìm hiểu và viết đoạn văn (10-15 dòng) về ứng dụng AI mà em thấy hữu ích nhất trong việc học tập môn Tin học.',
        'Đọc trước Bài 2: Trí tuệ nhân tạo trong đời sống (SGK Tin học 12 trang 12-16).',
      ],
      teacherNotes: 'Nhắc nhở học sinh nộp bài tập qua hệ thống quản lý học tập LMS của trường.',
      visualSuggestion: 'Hình ảnh cuốn sổ tay số ghi chép các từ khóa chính: Khái niệm AI, Dartmouth 1956, Narrow AI, Big Data.',
      badge: 'Vận dụng',
    },
  ],
};

export const SAMPLE_EXAM_BAI_1_TIN_12 = {
  subject: 'Tin học',
  grade: 'Lớp 12',
  topic: 'Bài 1: Làm quen với Trí tuệ nhân tạo (Bộ sách Kết nối tri thức)',
  matrixSummary: {
    recognitionCount: 3,
    understandingCount: 3,
    applicationCount: 1,
    highApplicationCount: 1,
    total: 8,
  },
  questions: [
    {
      id: 1,
      questionNumber: 1,
      type: 'multiple_choice' as const,
      cognitiveLevel: 'Nhận biết' as const,
      content: 'Thuật ngữ Trí tuệ nhân tạo (Artificial Intelligence - AI) chính thức được đưa ra tại sự kiện khoa học nào?',
      options: [
        { key: 'A', text: 'Hội thảo Dartmouth năm 1956 do John McCarthy khởi xướng.' },
        { key: 'B', text: 'Hội nghị máy tính London năm 1950 do Alan Turing trình bày.' },
        { key: 'C', text: 'Hội thảo công nghệ Massachusetts năm 1970.' },
        { key: 'D', text: 'Hội nghị Internet toàn cầu tại Geneva năm 1990.' },
      ],
      correctAnswer: 'A',
      explanation: 'Thuật ngữ Trí tuệ nhân tạo (AI) lần đầu tiên được đề xuất và thống nhất tại Hội thảo Dartmouth (Mỹ) vào mùa hè năm 1956 bởi John McCarthy cùng các nhà khoa học tiên phong.',
      score: 0.25,
    },
    {
      id: 2,
      questionNumber: 2,
      type: 'multiple_choice' as const,
      cognitiveLevel: 'Nhận biết' as const,
      content: 'Hệ thống AI chuyên biệt thực hiện một nhiệm vụ cụ thể như nhận dạng biển số xe hoặc chơi cờ vua được gọi là gì?',
      options: [
        { key: 'A', text: 'AI tổng quát (General AI).' },
        { key: 'B', text: 'AI hẹp (Narrow AI / Weak AI).' },
        { key: 'C', text: 'Siêu trí tuệ nhân tạo (Super AI).' },
        { key: 'D', text: 'AI đa năng (Omni AI).' },
      ],
      correctAnswer: 'B',
      explanation: 'AI hẹp (Narrow AI) là hệ thống trí tuệ nhân tạo được thiết kế và huấn luyện để giải quyết tối ưu một công việc cụ thể nhất định.',
      score: 0.25,
    },
    {
      id: 3,
      questionNumber: 3,
      type: 'multiple_choice' as const,
      cognitiveLevel: 'Thông hiểu' as const,
      content: 'Đặc trưng nào sau đây thể hiện rõ nét nhất sự khác biệt giữa phần mềm truyền thống và hệ thống Trí tuệ nhân tạo hiện đại?',
      options: [
        { key: 'A', text: 'Phần mềm AI chạy được trên nhiều hệ điều hành khác nhau.' },
        { key: 'B', text: 'Hệ thống AI có khả năng tự học hỏi, thích nghi và rút ra tri thức từ dữ liệu lớn mà không cần lập trình từng quy tắc cứng.' },
        { key: 'C', text: 'Hệ thống AI luôn tiêu tốn ít điện năng hơn phần mềm thông thường.' },
        { key: 'D', text: 'Hệ thống AI không bao giờ xảy ra lỗi logic.' },
      ],
      correctAnswer: 'B',
      explanation: 'Phần mềm truyền thống hoạt động dựa trên các luật cứng do lập trình viên định sẵn (If-Else), trong khi AI hiện đại dựa trên học máy (Machine Learning) để tự trích xuất quy luật từ dữ liệu.',
      score: 0.25,
    },
    {
      id: 4,
      questionNumber: 4,
      type: 'true_false' as const,
      cognitiveLevel: 'Thông hiểu' as const,
      content: 'Xét các nhận định sau đây về Trí tuệ nhân tạo (AI) theo định dạng cấu trúc đề thi tốt nghiệp THPT năm 2025:',
      options: [
        { key: 'a', text: 'Tất cả các sản phẩm AI đang được ứng dụng rộng rãi trong thực tế hiện nay (như Siri, Google Lens, xe Tesla) đều thuộc nhóm AI hẹp.' },
        { key: 'b', text: 'AI tổng quát (AGI) là hệ thống đã được phát triển hoàn thiện và thay thế hoàn toàn bác sĩ trong phẫu thuật y khoa.' },
        { key: 'c', text: 'Xử lý ngôn ngữ tự nhiên (NLP) là phân ngành của AI nghiên cứu khả năng hiểu và giao tiếp bằng ngôn ngữ con người của máy tính.' },
        { key: 'd', text: 'Học sinh lớp 12 có thể sử dụng các công cụ AI tạo sinh để hỗ trợ tìm ý tưởng, nhưng không được sao chép nguyên văn vì vi phạm tính trung thực học thuật.' },
      ],
      correctAnswer: 'a - Đúng | b - Sai | c - Đúng | d - Đúng',
      explanation: 'Ý b Sai vì AI tổng quát (AGI) hiện vẫn là mục tiêu nghiên cứu lý thuyết trong tương lai, chưa có hệ thống AGI nào hoàn thiện thay thế hoàn toàn bác sĩ.',
      score: 1.0,
    },
    {
      id: 5,
      questionNumber: 5,
      type: 'short_answer' as const,
      cognitiveLevel: 'Vận dụng' as const,
      content: 'Trong công nghệ xe tự hành thông minh, phân ngành AI nào đóng vai trò tiếp nhận và phân tích hình ảnh làn đường, biển báo và người đi bộ từ hệ thống camera xe?',
      options: [],
      correctAnswer: 'Thị giác máy tính (Computer Vision)',
      explanation: 'Thị giác máy tính (Computer Vision) là lĩnh vực của AI giúp máy tính nhìn thấy, phân tích và diễn giải hình ảnh/video từ camera kỹ thuật số trong thế giới thực.',
      score: 0.5,
    },
    {
      id: 6,
      questionNumber: 6,
      type: 'essay' as const,
      cognitiveLevel: 'Vận dụng cao' as const,
      content: 'Hãy phân tích 02 lợi ích và 02 rủi ro khi học sinh THPT sử dụng các trợ lý học tập AI (như ChatGPT, Gemini) để giải bài tập Tin học. Đề xuất quy tắc sử dụng AI có trách nhiệm.',
      options: [],
      correctAnswer: 'Nêu đủ 2 lợi ích, 2 rủi ro và giải pháp trách nhiệm học thuật.',
      explanation: 'Thang điểm hướng dẫn chấm: (1) Lợi ích: Giải thích bài tập cá nhân hóa 24/7, gợi ý thuật toán mới (0.5đ); (2) Rủi ro: Làm mòn tư duy phản biện nếu ỷ lại, nguy cơ thông tin sai lệch "ảo giác AI" (0.5đ); (3) Giải pháp: Chỉ coi AI là người hỗ trợ gợi ý, tự tay kiểm tra mã nguồn và ghi rõ nguồn tham khảo (0.5đ).',
      score: 1.5,
    },
  ],
};
