export const MOCK_GRADE_COMPONENTS = [
  { id: "GC-01", name: "Đánh giá thường xuyên 1", weight: 1 },
  { id: "GC-02", name: "Đánh giá thường xuyên 2", weight: 1 },
  { id: "GC-03", name: "Đánh giá giữa kỳ", weight: 2 },
  { id: "GC-04", name: "Đánh giá cuối kỳ", weight: 3 },
];

export const MOCK_STUDENT_GRADES = [
  { studentId: "ST-001", studentCode: "HS26001", name: "Trần Bình", grades: { "GC-01": 8.5, "GC-02": 9.0, "GC-03": 8.0, "GC-04": 8.8 }, comment: "Học tập tiến bộ, có ý thức phát biểu xây dựng bài." },
  { studentId: "ST-002", studentCode: "HS26002", name: "Phạm Văn Duy", grades: { "GC-01": 7.0, "GC-02": 6.5, "GC-03": 7.5, "GC-04": null }, comment: "Cần cố gắng hơn trong các bài kiểm tra thực hành." },
  { studentId: "ST-003", studentCode: "HS26003", name: "Lê Cát Tiên", grades: { "GC-01": 9.5, "GC-02": 9.5, "GC-03": 10, "GC-04": 9.5 }, comment: "Xuất sắc, luôn hoàn thành tốt nhiệm vụ được giao." },
];

export const MOCK_SEMESTER_RESULTS = [
  { subject: "Toán học", midterm: 8.5, final: 9.0, average: 8.8, status: "Đạt" },
  { subject: "Ngữ văn", midterm: 7.5, final: 8.0, average: 7.8, status: "Đạt" },
  { subject: "Tiếng Anh", midterm: 9.0, final: 8.5, average: 8.7, status: "Đạt" },
  { subject: "Vật lý", midterm: 6.5, final: 7.0, average: 6.8, status: "Đạt" },
  { subject: "Hóa học", midterm: 8.0, final: 8.5, average: 8.3, status: "Đạt" },
];
