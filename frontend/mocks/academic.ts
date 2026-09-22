export const MOCK_SUBJECTS = [
  { id: "SUB-001", code: "TOAN", name: "Toán học", department: "Tổ Toán - Tin", periodsPerWeek: 4, type: "Bắt buộc" },
  { id: "SUB-002", code: "NGUVAN", name: "Ngữ văn", department: "Tổ Ngữ văn", periodsPerWeek: 4, type: "Bắt buộc" },
  { id: "SUB-003", code: "TIENGANH", name: "Tiếng Anh", department: "Tổ Ngoại ngữ", periodsPerWeek: 3, type: "Bắt buộc" },
  { id: "SUB-004", code: "VATLY", name: "Vật lý", department: "Tổ Khoa học Tự nhiên", periodsPerWeek: 2, type: "Lựa chọn" },
  { id: "SUB-005", code: "HOAHOC", name: "Hóa học", department: "Tổ Khoa học Tự nhiên", periodsPerWeek: 2, type: "Lựa chọn" },
  { id: "SUB-006", code: "SINHHOC", name: "Sinh học", department: "Tổ Khoa học Tự nhiên", periodsPerWeek: 2, type: "Lựa chọn" },
  { id: "SUB-007", code: "TINHOC", name: "Tin học", department: "Tổ Toán - Tin", periodsPerWeek: 2, type: "Lựa chọn" },
  { id: "SUB-008", code: "LSU", name: "Lịch sử", department: "Tổ Khoa học Xã hội", periodsPerWeek: 2, type: "Bắt buộc" },
  { id: "SUB-009", code: "GDCD", name: "Giáo dục Công dân", department: "Tổ Khoa học Xã hội", periodsPerWeek: 1, type: "Bắt buộc" },
  { id: "SUB-010", code: "TD", name: "Thể dục", department: "Tổ Thể dục - GDQP", periodsPerWeek: 2, type: "Bắt buộc" },
];

export const MOCK_ROOMS = [
  { id: "RM-001", name: "Phòng 101", capacity: 40, type: "Lý thuyết", building: "Tòa A", status: "Hoạt động" },
  { id: "RM-002", name: "Phòng 102", capacity: 40, type: "Lý thuyết", building: "Tòa A", status: "Hoạt động" },
  { id: "RM-003", name: "Phòng 103", capacity: 40, type: "Lý thuyết", building: "Tòa A", status: "Bảo trì" },
  { id: "RM-004", name: "Phòng Máy tính 1", capacity: 45, type: "Thực hành Tin", building: "Tòa B", status: "Hoạt động" },
  { id: "RM-005", name: "Phòng Thí nghiệm Hóa", capacity: 35, type: "Thực hành Hóa", building: "Tòa B", status: "Hoạt động" },
];

export const MOCK_TEACHERS = [
  { id: "TC-001", name: "Nguyễn Văn Toàn", email: "nvtoan@edums.vn", phone: "0901234567", department: "Tổ Toán - Tin", status: "Đang công tác" },
  { id: "TC-002", name: "Trần Thị Mai", email: "ttmai@edums.vn", phone: "0912345678", department: "Tổ Ngữ văn", status: "Đang công tác" },
  { id: "TC-003", name: "Lê Văn Hoàng", email: "lvhoang@edums.vn", phone: "0923456789", department: "Tổ Khoa học Tự nhiên", status: "Đang công tác" },
  { id: "TC-004", name: "Phạm Thị Lan", email: "ptlan@edums.vn", phone: "0934567890", department: "Tổ Ngoại ngữ", status: "Đang công tác" },
  { id: "TC-005", name: "Vũ Văn Thanh", email: "vvthanh@edums.vn", phone: "0945678901", department: "Tổ Thể dục - GDQP", status: "Nghỉ phép" },
];

export const MOCK_CLASSES = [
  { id: "CLS-001", name: "10A1", grade: 10, academicYear: "2026-2027", homeroomTeacher: "Nguyễn Văn Toàn", studentCount: 35, room: "Phòng 101" },
  { id: "CLS-002", name: "10A2", grade: 10, academicYear: "2026-2027", homeroomTeacher: "Trần Thị Mai", studentCount: 38, room: "Phòng 102" },
  { id: "CLS-003", name: "11A1", grade: 11, academicYear: "2026-2027", homeroomTeacher: "Lê Văn Hoàng", studentCount: 40, room: "Phòng 201" },
  { id: "CLS-004", name: "12A1", grade: 12, academicYear: "2026-2027", homeroomTeacher: "Phạm Thị Lan", studentCount: 39, room: "Phòng 301" },
];

export const MOCK_STUDENTS = [
  { id: "ST-001", studentCode: "HS26001", name: "Trần Bình", dob: "2011-05-15", gender: "Nam", classId: "CLS-001", status: "Đang học" },
  { id: "ST-002", studentCode: "HS26002", name: "Phạm Văn Duy", dob: "2011-08-22", gender: "Nam", classId: "CLS-001", status: "Đang học" },
  { id: "ST-003", studentCode: "HS26003", name: "Lê Cát Tiên", dob: "2011-12-05", gender: "Nữ", classId: "CLS-002", status: "Đang học" },
  { id: "ST-004", studentCode: "HS26004", name: "Hoàng Minh Tâm", dob: "2011-03-10", gender: "Nữ", classId: "CLS-002", status: "Bảo lưu" },
];

export const MOCK_ASSIGNMENTS = [
  { id: "ASG-001", classId: "CLS-001", className: "10A1", subjectId: "SUB-001", subjectName: "Toán học", teacherId: "TC-001", teacherName: "Nguyễn Văn Toàn", periods: 4 },
  { id: "ASG-002", classId: "CLS-001", className: "10A1", subjectId: "SUB-002", subjectName: "Ngữ văn", teacherId: "TC-002", teacherName: "Trần Thị Mai", periods: 4 },
  { id: "ASG-003", classId: "CLS-002", className: "10A2", subjectId: "SUB-001", subjectName: "Toán học", teacherId: "TC-001", teacherName: "Nguyễn Văn Toàn", periods: 4 },
  { id: "ASG-004", classId: "CLS-002", className: "10A2", subjectId: "SUB-004", subjectName: "Vật lý", teacherId: "TC-003", teacherName: "Lê Văn Hoàng", periods: 2 },
];
