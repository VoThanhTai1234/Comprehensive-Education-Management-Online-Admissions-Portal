export const MOCK_NOTIFICATIONS = {
  SYSTEM_ADMIN: [
    { id: 1, type: "info", title: "Cập nhật hệ thống EduMS", desc: "Hệ thống sẽ bảo trì từ 23:00 đến 01:00 ngày 25/09. Vui lòng thông báo cho các bên liên quan.", time: "2 giờ trước", isRead: false },
    { id: 2, type: "alert", title: "Cảnh báo bảo mật", desc: "Phát hiện 5 lần đăng nhập sai mật khẩu liên tiếp từ IP 192.168.1.100.", time: "Hôm qua", isRead: false },
  ],
  ACADEMIC_ADMIN: [
    { id: 1, type: "calendar", title: "Khởi tạo năm học mới", desc: "Năm học 2026-2027 đã được khởi tạo thành công.", time: "1 giờ trước", isRead: false },
    { id: 2, type: "info", title: "Phân công giảng dạy", desc: "Giáo viên Lê Văn Cường vừa cập nhật lại lịch báo giảng.", time: "Hôm qua", isRead: true },
  ],
  ADMISSIONS_OFFICER: [
    { id: 1, type: "alert", title: "Hồ sơ cần duyệt", desc: "Có 5 hồ sơ tuyển sinh mới cần được xem xét và phê duyệt.", time: "30 phút trước", isRead: false },
    { id: 2, type: "info", title: "Công bố kết quả", desc: "Đã đến hạn công bố kết quả tuyển sinh đợt 1.", time: "Hôm qua", isRead: false },
  ],
  TEACHER: [
    { id: 1, type: "calendar", title: "Phân công coi thi", desc: "Bạn được phân công coi thi môn Toán khối 10 tại Phòng 105 vào 07:30 ngày 25/09/2026.", time: "2 giờ trước", isRead: false },
    { id: 2, type: "info", title: "Lịch họp Hội đồng", desc: "Họp hội đồng Sư phạm tháng 9 vào lúc 14:00 thứ 6 (26/09).", time: "Hôm qua", isRead: false },
    { id: 3, type: "success", title: "Duyệt nghỉ phép", desc: "Đơn xin nghỉ phép chiều ngày 20/09 của bạn đã được duyệt.", time: "3 ngày trước", isRead: true },
    { id: 4, type: "alert", title: "Nhắc nhở nhập điểm", desc: "Vui lòng hoàn thành việc nhập điểm Đánh giá Thường xuyên 1 trước ngày 30/09.", time: "1 tuần trước", isRead: true },
  ],
  STUDENT: [
    { id: 1, type: "alert", title: "Cảnh báo vắng học", desc: "Bạn đã vắng không phép tiết 1 môn Toán ngày 22/09/2026.", time: "1 giờ trước", isRead: false },
    { id: 2, type: "info", title: "Thông báo Học phí", desc: "Hóa đơn Học phí học kỳ 1 (Tháng 9) đã được phát hành. Vui lòng thanh toán trước 05/10.", time: "2 giờ trước", isRead: false },
    { id: 3, type: "success", title: "Điểm mới", desc: "Giáo viên vừa cập nhật điểm môn Toán học.", time: "Hôm qua", isRead: true },
    { id: 4, type: "calendar", title: "Lịch thi Giữa kỳ", desc: "Lịch thi giữa kỳ 1 đã được công bố.", time: "3 ngày trước", isRead: true },
  ],
  PARENT: [
    { id: 1, type: "alert", title: "Biến động điểm danh", desc: "Học sinh Trần Bình vừa được ghi nhận: ĐI TRỄ tiết 1 môn Toán (22/09).", time: "10 phút trước", isRead: false },
    { id: 2, type: "info", title: "Thông báo Học phí", desc: "Hóa đơn học phí tháng 9 (4,500,000 VND) đã sẵn sàng. Vui lòng thanh toán trước 05/10.", time: "2 giờ trước", isRead: false },
    { id: 3, type: "success", title: "Cập nhật Điểm", desc: "Giáo viên vừa cập nhật điểm môn Vật lý cho Trần Bình.", time: "Hôm qua", isRead: true },
    { id: 4, type: "calendar", title: "Họp phụ huynh", desc: "Trân trọng kính mời anh/chị tham gia buổi họp phụ huynh đầu năm vào lúc 08:00 Chủ nhật (28/09).", time: "5 ngày trước", isRead: true },
  ],
  APPLICANT: [
    { id: 1, type: "success", title: "Trúng tuyển", desc: "Chúc mừng bạn đã trúng tuyển vào lớp 10 trường THPT EduMS. Vui lòng xác nhận nhập học trước 15/08.", time: "2 ngày trước", isRead: false },
    { id: 2, type: "info", title: "Tiếp nhận hồ sơ", desc: "Hồ sơ đăng ký dự tuyển của bạn đã được hệ thống ghi nhận.", time: "1 tuần trước", isRead: true },
  ]
};
