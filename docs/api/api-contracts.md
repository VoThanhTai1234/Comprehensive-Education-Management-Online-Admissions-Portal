# API Contracts & Mock Data

Tài liệu này cung cấp danh sách các API quan trọng và cấu trúc dữ liệu JSON trả về (Mock Data) để nhóm Frontend có thể phát triển giao diện trước khi Backend hoàn thiện.

Tất cả các response đều tuân theo chuẩn Envelope:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2026-09-21T14:30:00Z"
}
```

Dưới đây chỉ hiển thị phần `data` của response để rút gọn.

---

## M1 — Auth & Identity

### 1. `GET /api/auth/me`
Lấy thông tin user hiện tại.

**Mock Response (data):**
```json
{
  "id": 1,
  "email": "student01@edums.edu.vn",
  "firstName": "Nguyễn Văn",
  "lastName": "An",
  "roles": ["STUDENT"],
  "status": "ACTIVE"
}
```

---

## M2 — Admissions Portal

### 2. `GET /api/admission/campaigns/public`
Lấy danh sách đợt tuyển sinh (Dành cho Public).

**Mock Response (data - Array):**
```json
[
  {
    "id": 1,
    "name": "Tuyển sinh Lớp 10 Năm học 2026-2027",
    "slug": "tuyen-sinh-lop-10-2026",
    "startDate": "2026-05-01T00:00:00Z",
    "endDate": "2026-07-31T23:59:59Z",
    "status": "OPEN",
    "description": "Chương trình tuyển sinh thường niên..."
  }
]
```

### 3. `GET /api/applications/my`
Lấy hồ sơ của ứng viên hiện tại (Role: APPLICANT).

**Mock Response (data):**
```json
{
  "id": 105,
  "campaignId": 1,
  "status": "SUBMITTED",
  "applicantProfile": {
    "firstName": "Trần",
    "lastName": "Bình",
    "dateOfBirth": "2011-05-15",
    "phone": "0901234567"
  },
  "submittedAt": "2026-06-15T10:30:00Z",
  "admissionNumber": null
}
```

---

## M3 — Academic & Timetable

### 4. `GET /api/timetables/my`
Lấy thời khóa biểu (Dành cho TEACHER / STUDENT).

**Mock Response (data - Array):**
```json
[
  {
    "id": 1001,
    "classId": 5,
    "className": "10A1",
    "subjectId": 2,
    "subjectName": "Toán học",
    "roomId": 10,
    "roomName": "Phòng A101",
    "teacherName": "Lê Văn C",
    "dayOfWeek": 2, 
    "timeSlot": 1,
    "startTime": "07:00",
    "endTime": "07:45"
  }
]
```

---

## M4 — Grades & Attendance

### 5. `GET /api/grades/my`
Lấy điểm của học sinh (Role: STUDENT / PARENT).

**Mock Response (data - Array):**
```json
[
  {
    "subjectId": 2,
    "subjectName": "Toán học",
    "components": [
      {
        "name": "Hệ số 1",
        "weight": 20,
        "score": 8.5
      },
      {
        "name": "Hệ số 2",
        "weight": 30,
        "score": 9.0
      },
      {
        "name": "Cuối kỳ",
        "weight": 50,
        "score": 8.8
      }
    ],
    "averageScore": 8.8,
    "teacherComment": "Học tốt, chăm biểu."
  }
]
```

### 6. `POST /api/attendance/scan`
Học sinh quét QR điểm danh (Role: STUDENT).

**Request Body:**
```json
{
  "token": "qr_uuid_token_string"
}
```

**Mock Response (data):**
```json
{
  "sessionId": 501,
  "className": "10A1",
  "subjectName": "Toán học",
  "status": "PRESENT",
  "recordedAt": "2026-09-21T07:10:00Z"
}
```

---

## M5 — Family, Notification & Finance

### 7. `GET /api/notifications`
Lấy danh sách thông báo.

**Mock Response (data - Array):**
```json
[
  {
    "id": 100,
    "title": "Thông báo vắng học",
    "content": "Em Nguyễn Văn An đã vắng mặt tiết Toán học lúc 07:00 ngày 21/09/2026.",
    "type": "ATTENDANCE_ABSENT",
    "isRead": false,
    "createdAt": "2026-09-21T07:15:00Z"
  }
]
```

### 8. `GET /api/invoices/my`
Lấy hóa đơn học phí (Role: STUDENT / PARENT).

**Mock Response (data - Array):**
```json
[
  {
    "id": 200,
    "title": "Học phí Học kỳ 1 (2026-2027)",
    "amount": 5000000,
    "status": "PENDING",
    "dueDate": "2026-10-15T23:59:59Z",
    "vietQrUrl": "https://img.vietqr.io/image/970436-123456789-compact2.jpg?amount=5000000&addInfo=EDUMS200",
    "paymentReference": "EDUMS200"
  }
]
```
