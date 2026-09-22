export const MOCK_ATTENDANCE_SESSIONS = [
  { id: "SESS-01", date: "2026-09-22", time: "07:15 - 08:00", subject: "Toán học", class: "10A1", status: "Đang mở", presentCount: 30, absentCount: 2, lateCount: 0, total: 35 },
  { id: "SESS-02", date: "2026-09-21", time: "08:05 - 08:50", subject: "Ngữ văn", class: "10A1", status: "Đã chốt", presentCount: 34, absentCount: 1, lateCount: 0, total: 35 },
];

export const MOCK_ATTENDANCE_RECORDS = [
  { studentId: "ST-001", studentCode: "HS26001", name: "Trần Bình", status: "PRESENT", time: "07:10 AM" },
  { studentId: "ST-002", studentCode: "HS26002", name: "Phạm Văn Duy", status: "ABSENT_EXCUSED", time: null },
  { studentId: "ST-003", studentCode: "HS26003", name: "Lê Cát Tiên", status: "PRESENT", time: "07:05 AM" },
  { studentId: "ST-004", studentCode: "HS26004", name: "Hoàng Minh Tâm", status: "ABSENT_UNEXCUSED", time: null },
  { studentId: "ST-005", studentCode: "HS26005", name: "Vũ Hải Đăng", status: "LATE", time: "07:20 AM" },
];

export const MOCK_STUDENT_ATTENDANCE_HISTORY = [
  { date: "2026-09-22", subject: "Toán học", time: "07:15 - 08:00", status: "PRESENT" },
  { date: "2026-09-22", subject: "Ngữ văn", time: "08:05 - 08:50", status: "PRESENT" },
  { date: "2026-09-21", subject: "Tiếng Anh", time: "09:00 - 09:45", status: "LATE" },
  { date: "2026-09-20", subject: "Vật lý", time: "07:15 - 08:00", status: "ABSENT_EXCUSED" },
];
