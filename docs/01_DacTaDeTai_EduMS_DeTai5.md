# Đặc tả Đề tài 5 - Nền tảng Quản trị Giáo dục Toàn diện và Cổng Tuyển sinh Trực tuyến

> Nguồn chuyển đổi: `01_DacTaDeTai_EduMS_DeTai5.docx`

TRƯỜNG ĐẠI HỌC SÀI GÒN KHOA CÔNG NGHỆ THÔNG TIN HỌC PHẦN: ĐỒ ÁN CHUYÊN NGÀNH

ĐẶC TẢ ĐỀ TÀI 5

NỀN TẢNG QUẢN TRỊ GIÁO DỤC TOÀN DIỆN & CỔNG TUYỂN SINH TRỰC TUYẾN (EDUMS)

Comprehensive Education Management & Online Admissions Portal

Giảng viên phụ trách: Trần Đình Nghĩa

Nhóm thực hiện: Sơn - Tài - Thái - Phước - Phát

Nhóm trưởng: Phước

Năm học: 2026

# MỤC ĐÍCH VÀ PHẠM VI TÀI LIỆU

Tài liệu này là bản đặc tả thống nhất để cả 5 thành viên hiểu cùng một đề tài, cùng một phạm vi và cùng một cách triển khai. Nội dung được trình bày theo hướng dễ đọc trước, kỹ thuật sau: bắt đầu từ bài toán thực tế, mục tiêu, người dùng và luồng nghiệp vụ; sau đó mới đi vào chức năng, dữ liệu, kiến trúc, API, bảo mật, kiểm thử và tiêu chí nghiệm thu.

Tài liệu bám đúng Đề tài 5 do giảng viên cung cấp: xây dựng một nền tảng quản trị giáo dục toàn diện có Cổng tuyển sinh trực tuyến, quản trị đào tạo và thời khóa biểu, quản trị học vụ và điểm danh, cùng Cổng thông tin phụ huynh/học sinh. Các phần như Zalo ZNS và cổng thanh toán doanh nghiệp được coi là mở rộng, không làm ảnh hưởng đến việc hoàn thành MVP bắt buộc.

# 1. TỔNG QUAN ĐỀ TÀI

## 1.1. Tên đề tài

Đề tài 5: Nền tảng Quản trị Giáo dục Toàn diện & Cổng Tuyển sinh Trực tuyến - EduMS (Comprehensive Education Management & Online Admissions Portal).

## 1.2. Bài toán thực tế cần giải quyết

Một trường học hoặc trung tâm đào tạo thường vận hành nhiều quy trình tách rời: tuyển sinh nhận hồ sơ qua giấy tờ hoặc biểu mẫu rời; bộ phận đào tạo quản lý học sinh, giáo viên và thời khóa biểu bằng bảng tính; giáo viên nhập điểm và điểm danh ở một nơi khác; phụ huynh lại phải liên hệ thủ công để biết lịch học, kết quả, tình trạng vắng/trễ và học phí. Việc dữ liệu không liên thông làm phát sinh nhập liệu lặp lại, chậm phản hồi và khó kiểm soát trạng thái hồ sơ/người học.

| Vấn đề | Ảnh hưởng thực tế |
| --- | --- |
| Hồ sơ tuyển sinh phân tán | Người học khó theo dõi tiến độ; cán bộ tuyển sinh mất thời gian kiểm tra giấy tờ, tổng hợp nguyện vọng và phản hồi. |
| Dữ liệu đào tạo tách rời | Thông tin học sinh, giáo viên, lớp, môn, phòng học và lịch học có nguy cơ trùng lặp hoặc không đồng bộ. |
| Xếp lịch thủ công | Dễ phát sinh trùng giáo viên, trùng phòng, trùng lớp hoặc thiếu số tiết theo kế hoạch. |
| Điểm danh chậm | Phụ huynh chỉ biết học sinh vắng/trễ sau nhiều giờ hoặc nhiều ngày. |
| Tra cứu học tập thiếu tập trung | Phụ huynh/học sinh phải hỏi nhiều nơi để biết điểm, lịch học, lịch thi và nhận xét. |
| Theo dõi học phí thủ công | Khó biết khoản phải đóng, trạng thái thanh toán và nội dung chuyển khoản đúng chuẩn. |

## 1.3. Mục tiêu tổng quát

Xây dựng một hệ thống web thống nhất quản lý vòng đời từ ứng viên nộp hồ sơ tuyển sinh đến khi trở thành học sinh, được xếp lớp, học theo thời khóa biểu, được điểm danh/đánh giá và được phụ huynh theo dõi. Hệ thống phải giảm thao tác giấy tờ, hạn chế sai sót khi xếp lịch, tăng tốc trao đổi giữa nhà trường - giáo viên - học sinh - phụ huynh và có khả năng triển khai thực tế trên Cloud.

## 1.4. Mục tiêu cụ thể

- Cung cấp cổng tuyển sinh công khai, thân thiện SEO, cho phép người học nộp hồ sơ, tải minh chứng, đăng ký nguyện vọng và theo dõi trạng thái.

- Cho phép cán bộ tuyển sinh kiểm tra hồ sơ, yêu cầu bổ sung, xét duyệt và công bố kết quả; hệ thống tự sinh mã trúng tuyển khi ứng viên được chấp nhận.

- Quản lý dữ liệu học sinh, giáo viên, môn học, lớp, phòng học, năm học/học kỳ và phân công giảng dạy.

- Hỗ trợ lập thời khóa biểu tự động ở mức MVP bằng thuật toán tham lam có kiểm tra ràng buộc cứng; tuyệt đối không tạo lịch trùng giáo viên, phòng hoặc lớp.

- Cho phép giáo viên nhập điểm thành phần, nhận xét, điểm danh trực tuyến và mở phiên điểm danh QR theo buổi học.

- Cung cấp Family Portal cho phụ huynh/học sinh tra cứu điểm, lịch học, lịch thi, tình trạng chuyên cần và học phí.

- Phát thông báo thời gian thực khi học sinh vắng/trễ; sẵn sàng mở rộng sang Zalo ZNS/SMS khi có điều kiện.

- Tạo VietQR cho khoản học phí và ghi nhận trạng thái thanh toán; cổng OnePay/VNPay là phần mở rộng sau MVP.

- Triển khai được sản phẩm chạy thật trên Internet, có GitHub source code, dữ liệu mẫu, test và kịch bản demo end-to-end.

## 1.5. Phạm vi MVP và phần mở rộng

| Nhóm | Phạm vi |
| --- | --- |
| MVP bắt buộc | Tuyển sinh trực tuyến; duyệt hồ sơ; mã trúng tuyển; quản lý đào tạo; lớp/môn/phòng; lập thời khóa biểu có chống trùng; nhập điểm; nhận xét; điểm danh QR; Family Portal; thông báo realtime; học phí và VietQR; phân quyền; báo cáo cơ bản; deploy Cloud. |
| Mở rộng nếu còn thời gian | Zalo ZNS/SMS; OnePay/VNPay; tối ưu thời khóa biểu đa mục tiêu; dashboard phân tích nâng cao; import/export Excel hàng loạt; ký số hồ sơ; ứng dụng di động. |
| Không đặt mục tiêu trong 12 tuần | Hệ thống ERP tài chính đầy đủ; quản lý nhân sự - lương; LMS học trực tuyến đầy đủ; nhận diện khuôn mặt; chấm điểm AI; tối ưu lịch bằng mô hình nghiên cứu phức tạp cần dữ liệu lớn. |

## 1.6. Giá trị khác biệt trong phạm vi đồ án

- Liên thông vòng đời tuyển sinh - nhập học - đào tạo thay vì xây các màn hình quản lý rời rạc.

- Tự động hóa xếp lịch có kiểm tra xung đột cứng, có log lý do khi không thể xếp một phiên học.

- Điểm danh QR theo từng buổi học kết hợp cơ chế giáo viên xác nhận thủ công để tránh phụ thuộc hoàn toàn vào QR.

- Thông báo vắng/trễ gần thời gian thực cho phụ huynh thay vì chờ tổng hợp cuối ngày.

- Cùng một nguồn dữ liệu phục vụ cán bộ quản trị, giáo viên, học sinh và phụ huynh với phân quyền rõ ràng.

# 2. ĐỐI TƯỢNG SỬ DỤNG VÀ QUYỀN HẠN

| Tác nhân | Vai trò chính | Phạm vi dữ liệu |
| --- | --- | --- |
| Applicant - Ứng viên | Xem thông tin tuyển sinh; tạo/sửa hồ sơ; tải minh chứng; đăng ký nguyện vọng; nộp hồ sơ; theo dõi trạng thái/kết quả. | Chỉ hồ sơ của chính mình. |
| AdmissionsOfficer - Cán bộ tuyển sinh | Quản lý đợt tuyển sinh; kiểm tra hồ sơ; yêu cầu bổ sung; chấm/ghi nhận kết quả xét; công bố trúng tuyển. | Hồ sơ thuộc các đợt tuyển sinh được phân công. |
| AcademicAdmin - Quản trị đào tạo | Quản lý học sinh, giáo viên, môn, lớp, phòng, phân công, thời khóa biểu, lịch thi và báo cáo. | Dữ liệu đào tạo toàn đơn vị. |
| Teacher - Giáo viên | Xem lớp được phân công; nhập điểm/nhận xét; mở phiên điểm danh; điều chỉnh chuyên cần theo quyền. | Chỉ lớp/môn được phân công. |
| Student - Học sinh | Xem lịch học, lịch thi, kết quả học tập, chuyên cần và thông báo của bản thân. | Chỉ dữ liệu của bản thân. |
| Parent - Phụ huynh/người giám hộ | Xem thông tin của con được liên kết; nhận thông báo; xem học phí và tạo VietQR. | Chỉ học sinh đã được xác nhận liên kết. |
| SystemAdmin - Quản trị hệ thống | Quản lý tài khoản, vai trò, quyền, cấu hình dùng chung và nhật ký kiểm toán. | Dữ liệu quản trị hệ thống; không cần sửa điểm/hồ sơ nghiệp vụ nếu không được cấp thêm quyền. |

# 3. PHÂN RÃ CHỨC NĂNG TOÀN HỆ THỐNG

## 3.1. Nhóm A - Nền tảng, tài khoản và phân quyền

- Đăng nhập/đăng xuất bằng email và mật khẩu; JWT Access/Refresh Token.

- Quản lý tài khoản và trạng thái hoạt động.

- RBAC: vai trò, quyền, gán vai trò; mỗi endpoint kiểm tra quyền ở backend.

- Quản lý năm học, học kỳ và một số danh mục dùng chung.

- Audit log cho thay đổi quan trọng: quyền, hồ sơ tuyển sinh, điểm, điểm danh, học phí.

## 3.2. Nhóm B - Cổng tuyển sinh trực tuyến

- Trang công khai giới thiệu đợt tuyển sinh, chương trình/ngành/lớp tuyển, điều kiện, mốc thời gian và hướng dẫn.

- Ứng viên tạo hồ sơ, nhập thông tin cá nhân/học tập, tải học bạ/văn bằng/minh chứng.

- Đăng ký nguyện vọng theo thứ tự ưu tiên.

- Kiểm tra tính đầy đủ trước khi nộp; khóa phiên bản hồ sơ đã nộp, chỉ cho sửa khi được trả về bổ sung.

- Cán bộ tuyển sinh duyệt hồ sơ, ghi nhận thiếu sót, yêu cầu bổ sung, đánh giá và công bố kết quả.

- Khi trạng thái chuyển thành ADMITTED, hệ thống sinh Admission Number duy nhất và cho phép chuyển dữ liệu sang hồ sơ học sinh.

## 3.3. Nhóm C - Quản trị đào tạo và thời khóa biểu

- Quản lý giáo viên, học sinh, môn học, lớp học, phòng học, học kỳ, khóa học/chương trình.

- Phân công giáo viên giảng dạy theo lớp/môn.

- Khai báo số tiết/tuần, khung giờ, phòng phù hợp và các khoảng giáo viên không rảnh.

- Sinh thời khóa biểu tự động bằng thuật toán tham lam theo ràng buộc cứng; khi không xếp được phải trả lý do.

- Kiểm tra trùng lịch theo giáo viên, phòng và lớp khi người dùng chỉnh tay.

- Công bố thời khóa biểu để giáo viên, học sinh và phụ huynh tra cứu.

## 3.4. Nhóm D - Học vụ, điểm và điểm danh

- Giáo viên tạo/được cấp các cột điểm thành phần theo môn/lớp; nhập điểm và nhận xét.

- Tổng trọng số điểm thành phần phải đạt 100% trước khi chốt điểm cuối kỳ.

- Mỗi buổi học có Class Session để điểm danh.

- Giáo viên mở phiên QR có thời hạn ngắn; học sinh quét QR sau khi đăng nhập để ghi nhận có mặt.

- Giáo viên có thể sửa trạng thái Present/Late/Absent/Excused theo quyền; mọi thay đổi sau khi chốt phải có audit log.

- Hệ thống cập nhật sĩ số hiện tại và phát sự kiện vắng/trễ để module thông báo xử lý.

## 3.5. Nhóm E - Family Portal, thông báo và học phí

- Liên kết phụ huynh - học sinh bằng mã mời/xác nhận từ nhà trường.

- Tra cứu điểm, nhận xét, lịch học, lịch thi, chuyên cần và thông báo.

- Nhận thông báo realtime trên web khi học sinh vắng/trễ; lưu lịch sử đã đọc/chưa đọc.

- Quản lý hóa đơn học phí theo kỳ/khoản thu; hiển thị số tiền, hạn thanh toán và trạng thái.

- Sinh VietQR chứa số tiền và nội dung chuyển khoản; ghi nhận giao dịch thủ công hoặc qua webhook khi tích hợp cổng thanh toán.

# 4. QUY TRÌNH NGHIỆP VỤ CHÍNH

## 4.1. Tuyển sinh từ lúc tạo hồ sơ đến nhập học

1. Ứng viên xem thông tin đợt tuyển sinh công khai và tạo tài khoản.

2. Ứng viên điền thông tin hồ sơ, tải minh chứng và sắp xếp nguyện vọng.

3. Hệ thống kiểm tra trường bắt buộc, định dạng file và dữ liệu trước khi cho phép Submit.

4. Hồ sơ chuyển trạng thái SUBMITTED; cán bộ tuyển sinh nhận vào hàng đợi xét duyệt.

5. Nếu thiếu minh chứng: hồ sơ chuyển NEED_SUPPLEMENT; ứng viên nhận thông báo và được mở lại đúng phần cần sửa.

6. Nếu đạt điều kiện: cán bộ ghi nhận kết quả ELIGIBLE/ADMITTED theo quy định của đợt tuyển sinh.

7. Khi ADMITTED, hệ thống sinh Admission Number duy nhất, bất biến và ghi thời điểm công bố.

8. Khi ứng viên xác nhận nhập học, dữ liệu cần thiết được chuyển sang hồ sơ Student; không nhập lại họ tên, ngày sinh, liên hệ và chương trình đã trúng tuyển.

| Trạng thái hồ sơ | Ý nghĩa |
| --- | --- |
| DRAFT | Ứng viên đang nhập; chưa gửi cho nhà trường. |
| SUBMITTED | Đã nộp và chờ tiếp nhận. |
| UNDER_REVIEW | Cán bộ đang kiểm tra/xét. |
| NEED_SUPPLEMENT | Cần bổ sung/chỉnh minh chứng. |
| ELIGIBLE | Đủ điều kiện theo bước xét hiện tại. |
| REJECTED | Không đạt; lưu lý do. |
| ADMITTED | Trúng tuyển; đã có Admission Number. |
| ENROLLED | Đã xác nhận nhập học và tạo hồ sơ học sinh. |

## 4.2. Lập thời khóa biểu

MVP không đặt mục tiêu tìm lịch tối ưu toàn cục. Hệ thống cần tạo được một lịch hợp lệ, sau đó cho cán bộ đào tạo chỉnh tay. Thuật toán đề xuất: sắp các yêu cầu khó trước (giáo viên ít thời gian rảnh, môn cần phòng chuyên dụng, lớp có nhiều tiết), sau đó duyệt các slot hợp lệ và chọn slot đầu tiên có điểm ưu tiên tốt nhất.

| Ràng buộc | Mức | Quy tắc |
| --- | --- | --- |
| Một giáo viên không dạy hai nơi cùng lúc | Cứng | Không được vi phạm. |
| Một phòng không chứa hai lớp cùng lúc | Cứng | Không được vi phạm. |
| Một lớp không học hai môn cùng lúc | Cứng | Không được vi phạm. |
| Phòng phải đủ sức chứa/đúng loại nếu khai báo | Cứng | Không xếp nếu không phù hợp. |
| Số tiết môn theo tuần phải đủ | Cứng | Thiếu tiết phải báo lỗi. |
| Hạn chế tiết trống hoặc tiết quá muộn | Mềm | Dùng để tính điểm ưu tiên, có thể vi phạm. |
| Hạn chế cùng môn lặp nhiều tiết liên tiếp | Mềm | Dùng để tăng chất lượng lịch. |

## 4.3. Điểm danh QR và thông báo phụ huynh

1. Giáo viên mở Class Session đúng lớp và khung giờ; hệ thống sinh QR token ký số, có hạn dùng ngắn.

2. Học sinh đăng nhập, quét QR; backend kiểm tra token, lớp, thời gian và việc học sinh có thuộc lớp hay không.

3. Nếu hợp lệ, Attendance Record chuyển Present; nếu vượt ngưỡng cho phép có thể ghi Late.

4. Khi giáo viên đóng phiên hoặc hết thời gian, học sinh chưa ghi nhận được đánh dấu Absent theo cấu hình; giáo viên được quyền chỉnh trước khi chốt.

5. Sự kiện Late/Absent được gửi đến Notification Service; phụ huynh liên kết nhận thông báo realtime trên web và lịch sử thông báo.

## 4.4. Học phí và VietQR

1. Quản trị đào tạo/kế toán tạo khoản thu hoặc hóa đơn theo học sinh.

2. Family Portal hiển thị số tiền phải nộp, hạn và trạng thái.

3. Hệ thống sinh dữ liệu VietQR theo tài khoản nhận, số tiền và nội dung chuyển khoản duy nhất.

4. Ở MVP, cán bộ có thể đối soát và đánh dấu Paid thủ công có audit log; nếu tích hợp cổng thanh toán/webhook thì giao dịch có thể tự cập nhật.

5. Mọi thay đổi trạng thái thanh toán đều lưu lịch sử để tránh tranh chấp.

# 5. DANH MỤC USE CASE TOÀN HỆ THỐNG

| Mã | Tên Use Case | Tác nhân chính |
| --- | --- | --- |
| UC-AUTH-01 | Đăng nhập, làm mới token, đăng xuất | Tất cả người dùng |
| UC-ADM-01 | Xem thông tin đợt tuyển sinh | Applicant |
| UC-ADM-02 | Tạo/cập nhật hồ sơ tuyển sinh | Applicant |
| UC-ADM-03 | Tải và quản lý minh chứng | Applicant |
| UC-ADM-04 | Đăng ký nguyện vọng và nộp hồ sơ | Applicant |
| UC-ADM-05 | Thẩm định/yêu cầu bổ sung hồ sơ | AdmissionsOfficer |
| UC-ADM-06 | Công bố kết quả và sinh mã trúng tuyển | AdmissionsOfficer |
| UC-ADM-07 | Chuyển ứng viên trúng tuyển thành học sinh | AdmissionsOfficer/AcademicAdmin |
| UC-ORG-01 | Quản lý giáo viên, học sinh và tài khoản | AcademicAdmin |
| UC-ACA-01 | Quản lý môn, lớp, phòng, năm học/học kỳ | AcademicAdmin |
| UC-SCH-01 | Sinh thời khóa biểu tự động | AcademicAdmin |
| UC-SCH-02 | Chỉnh lịch và kiểm tra xung đột | AcademicAdmin |
| UC-GRD-01 | Cấu hình cột điểm và nhập điểm | Teacher |
| UC-GRD-02 | Nhập nhận xét và công bố kết quả | Teacher |
| UC-ATT-01 | Mở phiên điểm danh QR | Teacher |
| UC-ATT-02 | Quét QR/ghi nhận chuyên cần | Student/Teacher |
| UC-FAM-01 | Liên kết phụ huynh - học sinh | Parent/AcademicAdmin |
| UC-FAM-02 | Tra cứu điểm, lịch học, lịch thi, chuyên cần | Parent/Student |
| UC-NOTI-01 | Nhận thông báo vắng/trễ thời gian thực | Parent |
| UC-FIN-01 | Xem học phí và tạo VietQR | Parent/Student |
| UC-FIN-02 | Đối soát/cập nhật thanh toán | AcademicAdmin |
| UC-REP-01 | Xem dashboard và báo cáo cơ bản | AcademicAdmin |

# 6. ĐẶC TẢ 5 USE CASE TRỌNG ĐIỂM

## 6.1. UC-ADM-04 - Đăng ký nguyện vọng và nộp hồ sơ

| Thuộc tính | Nội dung |
| --- | --- |
| Tác nhân | Applicant |
| Điều kiện tiên quyết | Đã đăng nhập; đợt tuyển sinh đang mở; hồ sơ ở DRAFT hoặc NEED_SUPPLEMENT. |
| Kết quả sau thực hiện | Hồ sơ chuyển SUBMITTED; tạo thời điểm nộp; cán bộ tuyển sinh thấy hồ sơ trong hàng đợi. |

### Luồng chính

1. Ứng viên mở hồ sơ và kiểm tra checklist bắt buộc.

2. Ứng viên chọn các nguyện vọng và sắp xếp thứ tự ưu tiên.

3. Hệ thống kiểm tra dữ liệu cá nhân, học tập, file minh chứng, kiểu file/kích thước và tính đầy đủ.

4. Ứng viên xác nhận cam kết thông tin và bấm Nộp hồ sơ.

5. Backend tạo snapshot phiên bản hồ sơ, khóa các trường nghiệp vụ và chuyển trạng thái SUBMITTED.

6. Hệ thống gửi thông báo tiếp nhận và mã hồ sơ cho ứng viên.

### Luồng thay thế/ngoại lệ

- Thiếu trường hoặc file bắt buộc: không cho submit, chỉ rõ mục cần bổ sung.

- Đợt tuyển sinh đã đóng: từ chối submit.

- Request gửi lặp: phải idempotent, không tạo hai lần nộp.

## 6.2. UC-ADM-06 - Công bố kết quả và sinh mã trúng tuyển

| Thuộc tính | Nội dung |
| --- | --- |
| Tác nhân | AdmissionsOfficer |
| Điều kiện tiên quyết | Hồ sơ đang UNDER_REVIEW/ELIGIBLE; cán bộ có quyền trên đợt tuyển sinh. |
| Kết quả sau thực hiện | Kết quả lưu vết; nếu ADMITTED thì Admission Number duy nhất được sinh và không tự thay đổi. |

### Luồng chính

1. Cán bộ mở hồ sơ đã được thẩm định.

2. Chọn kết quả xét tuyển và nhập ghi chú bắt buộc nếu REJECTED.

3. Nếu ADMITTED, hệ thống mở transaction và sinh Admission Number theo quy tắc cấu hình.

4. Hệ thống lưu kết quả, người duyệt, thời điểm và audit log.

5. Ứng viên nhận thông báo và xem kết quả trên portal.

### Luồng thay thế/ngoại lệ

- Trùng mã do cạnh tranh: retry sinh mã trong transaction.

- Hồ sơ đã ENROLLED: không cho thay đổi kết quả nếu không có quyền đặc biệt.

## 6.3. UC-SCH-01 - Sinh thời khóa biểu tự động

| Thuộc tính | Nội dung |
| --- | --- |
| Tác nhân | AcademicAdmin |
| Điều kiện tiên quyết | Đã có học kỳ, lớp, môn, giáo viên, phòng, nhu cầu số tiết và khung thời gian. |
| Kết quả sau thực hiện | Tạo bản nháp timetable hợp lệ; các yêu cầu chưa xếp được có lý do rõ ràng. |

### Luồng chính

1. Cán bộ chọn học kỳ/phạm vi lớp cần xếp và bấm Sinh lịch.

2. Backend tạo danh sách TeachingRequirements và sắp xếp theo độ khó.

3. Với từng yêu cầu, thuật toán tìm các slot không trùng giáo viên/phòng/lớp và đúng điều kiện.

4. Chọn slot có điểm ưu tiên tốt nhất, lưu vào bản nháp.

5. Sau khi chạy hết, hệ thống kiểm tra toàn bộ hard constraints và trả thống kê thành công/thất bại.

6. Cán bộ xem lịch, chỉnh tay nếu cần rồi công bố.

### Luồng thay thế/ngoại lệ

- Không còn slot hợp lệ: giữ yêu cầu ở danh sách Unscheduled kèm nguyên nhân.

- Chỉnh tay gây trùng: backend trả Conflict, không lưu.

## 6.4. UC-ATT-01/02 - Điểm danh QR theo buổi học

| Thuộc tính | Nội dung |
| --- | --- |
| Tác nhân | Teacher/Student |
| Điều kiện tiên quyết | Có lịch học hợp lệ; giáo viên phụ trách lớp; học sinh thuộc lớp. |
| Kết quả sau thực hiện | Mỗi học sinh có tối đa một bản ghi điểm danh cho phiên; trạng thái được chốt và có audit log khi sửa. |

### Luồng chính

1. Giáo viên mở phiên; hệ thống sinh QR token có sessionId, expiresAt và chữ ký.

2. Học sinh quét QR trong ứng dụng web sau khi đăng nhập.

3. Backend kiểm tra token, thời gian, thành viên lớp và chống quét lặp.

4. Ghi Present hoặc Late theo ngưỡng; cập nhật sĩ số realtime cho giáo viên.

5. Giáo viên xem danh sách và chỉnh ngoại lệ; sau đó chốt phiên.

### Luồng thay thế/ngoại lệ

- Token hết hạn/sai lớp: từ chối.

- Học sinh không có thiết bị: giáo viên điểm danh thủ công.

- Sửa sau khi chốt: yêu cầu quyền và ghi audit.

## 6.5. UC-FIN-01 - Xem học phí và tạo VietQR

| Thuộc tính | Nội dung |
| --- | --- |
| Tác nhân | Parent/Student |
| Điều kiện tiên quyết | Tài khoản được liên kết với học sinh; tồn tại hóa đơn chưa thanh toán. |
| Kết quả sau thực hiện | Hiển thị QR đúng hóa đơn; trạng thái chỉ chuyển Paid khi có xác nhận đối soát hợp lệ. |

### Luồng chính

1. Người dùng mở mục Học phí và chọn hóa đơn.

2. Hệ thống hiển thị số tiền, hạn, nội dung chuyển khoản.

3. Backend tạo payload VietQR theo cấu hình tài khoản nhận và mã đối soát duy nhất.

4. Frontend hiển thị QR; người dùng thực hiện chuyển khoản.

5. Cán bộ hoặc webhook cập nhật giao dịch; hệ thống lưu PaymentTransaction và trạng thái hóa đơn.

### Luồng thay thế/ngoại lệ

- Hóa đơn đã Paid/Cancelled: không tạo yêu cầu thanh toán mới.

- Sai số tiền/nội dung: giữ trạng thái Pending và đưa vào danh sách đối soát.

# 7. QUY TẮC NGHIỆP VỤ CHÍNH

| Mã | Quy tắc |
| --- | --- |
| BR-ADM-01 | Một ứng viên chỉ có tối đa một hồ sơ trong một đợt tuyển sinh, trừ khi đợt cho phép nhiều chương trình độc lập. |
| BR-ADM-02 | Hồ sơ SUBMITTED không được sửa tự do; chỉ mở lại theo yêu cầu bổ sung. |
| BR-ADM-03 | Admission Number chỉ sinh khi ADMITTED, phải duy nhất và có audit. |
| BR-SCH-01 | Không cho lưu lịch trùng giáo viên, phòng hoặc lớp cùng timeslot. |
| BR-SCH-02 | Bản công bố timetable phải giữ version để biết lịch nào đang có hiệu lực. |
| BR-GRD-01 | Tổng trọng số các cột điểm dùng tính điểm cuối kỳ phải bằng 100% trước khi Publish. |
| BR-GRD-02 | Giáo viên chỉ nhập/chỉnh điểm của lớp-môn được phân công; chỉnh sau Publish phải có log. |
| BR-ATT-01 | QR token có thời hạn ngắn, gắn với một class session và không dùng lại cho phiên khác. |
| BR-ATT-02 | Mỗi học sinh chỉ có một attendance record cho mỗi session. |
| BR-FAM-01 | Phụ huynh chỉ đọc dữ liệu của học sinh đã xác minh liên kết. |
| BR-NOTI-01 | Thông báo vắng/trễ phải được tạo từ trạng thái attendance đã xác định, tránh gửi lặp. |
| BR-FIN-01 | Mỗi hóa đơn có mã đối soát duy nhất; mọi thay đổi Paid/Cancelled/Refunded có lịch sử. |

# 8. KIẾN TRÚC VÀ CÔNG NGHỆ ĐỀ XUẤT

| Lớp | Công nghệ | Trách nhiệm |
| --- | --- | --- |
| Frontend | Next.js (App Router) + TypeScript | Portal công khai chuẩn SEO; dashboard theo role; form; QR; realtime client. |
| Backend | Java 21 + Spring Boot 3.x + Spring Security + Spring Data JPA | REST API, JWT/RBAC, nghiệp vụ, validation, transaction, WebSocket/SSE. |
| Database | MySQL 8.x | Dữ liệu quan hệ, ràng buộc unique/FK/index/transaction. |
| Realtime | Spring WebSocket/STOMP hoặc SSE | Thông báo vắng/trễ và cập nhật trạng thái trên web. Socket.io chỉ dùng nếu nhóm chuyển backend sang Node.js; với Spring Boot không cần thêm Socket.io. |
| File storage | Local storage khi dev; S3-compatible storage khi deploy | Lưu học bạ/văn bằng/minh chứng; database chỉ lưu metadata và URL/object key. |
| Deploy | Vercel (FE) + Render/Railway (BE) + MySQL managed | Phù hợp demo miễn phí/chi phí thấp; có health check và biến môi trường. |
| Tích hợp mở rộng | VietQR; Zalo ZNS; OnePay/VNPay | VietQR ở MVP; ZNS và cổng thanh toán doanh nghiệp là tùy chọn. |

## 8.1. Kiến trúc logic

1. Trình duyệt truy cập Next.js. Trang tuyển sinh công khai dùng SSR/SSG để hỗ trợ SEO; dashboard đăng nhập dùng CSR/Server Components phù hợp.

2. Next.js gọi Spring Boot REST API qua HTTPS. Access Token được quản lý an toàn; quyền thật luôn kiểm tra ở backend.

3. Spring Boot tách module theo nghiệp vụ: identity, admissions, academic, schedule, grade-attendance, family-finance, notification.

4. MySQL là nguồn dữ liệu chính. File hồ sơ được lưu ở object storage và có metadata trong MySQL.

5. Các sự kiện nội bộ như AttendanceLate, AttendanceAbsent, GradePublished, InvoiceCreated được đưa đến Notification module qua service/event nội bộ; không bắt buộc message broker trong MVP.

6. WebSocket/SSE chỉ dùng cho cập nhật realtime. Nếu realtime lỗi, người dùng vẫn có thể refresh để lấy dữ liệu; chức năng lõi không bị khóa.

# 9. THIẾT KẾ DỮ LIỆU MỨC KHÁI NIỆM

| Phân hệ | Bảng chính dự kiến |
| --- | --- |
| Identity | users, roles, permissions, user_roles, role_permissions, refresh_tokens, audit_logs |
| Admission | admission_campaigns, admission_programs, applications, application_documents, application_preferences, application_reviews, admission_results |
| Academic master | academic_years, semesters, teachers, students, subjects, rooms, classes, class_students, teaching_assignments |
| Timetable | time_slots, timetable_versions, timetable_entries, teacher_unavailabilities |
| Grades | grade_components, student_grades, teacher_comments |
| Attendance | class_sessions, attendance_records, qr_attendance_tokens |
| Family | parents, parent_students |
| Exams | exams, exam_schedules |
| Finance | tuition_invoices, invoice_items, payment_transactions |
| Notification | notifications, notification_recipients |

Lưu ý: Danh sách trên là thiết kế đích ở mức đề cương. Trong tuần 4-6 nhóm phải chốt ERD, khóa chính/ngoại, unique constraint, index và migration cụ thể. Không cần ép đủ số lượng bảng nếu một bảng không mang giá trị nghiệp vụ.

# 10. HỢP ĐỒNG API MẪU VÀ RANH GIỚI MODULE

| Module | API tiêu biểu |
| --- | --- |
| Identity | POST /api/auth/login; POST /api/auth/refresh; GET/POST /api/users; GET/POST /api/roles |
| Admissions | GET /api/admission/campaigns/public; POST /api/applications; POST /api/applications/{id}/documents; POST /api/applications/{id}/submit; POST /api/admission/reviews/{id}/decision |
| Academic | GET/POST /api/classes; /subjects; /rooms; /teaching-assignments |
| Schedule | POST /api/timetables/generate; GET /api/timetables/{semester}; PUT /api/timetables/entries/{id}; POST /api/timetables/publish |
| Grade/Attendance | GET/PUT /api/classes/{id}/grades; POST /api/sessions/{id}/attendance/open; POST /api/attendance/scan; PUT /api/attendance/{id} |
| Family/Finance | GET /api/family/students; GET /api/family/students/{id}/overview; GET /api/invoices; POST /api/invoices/{id}/vietqr |
| Notification | GET /api/notifications; POST /api/notifications/{id}/read; WebSocket/SSE channel theo userId |

# 11. BẢO MẬT, RIÊNG TƯ VÀ YÊU CẦU PHI CHỨC NĂNG

| Nhóm yêu cầu | Tiêu chí |
| --- | --- |
| Bảo mật | Mật khẩu băm BCrypt/Argon2; JWT ngắn hạn + refresh token; backend kiểm tra quyền; giới hạn upload; chống IDOR; validate đầu vào; audit hành động nhạy cảm. |
| Riêng tư | Ứng viên chỉ xem hồ sơ mình; phụ huynh chỉ xem con liên kết; giáo viên chỉ thấy lớp được phân công; không public URL file nhạy cảm nếu chưa qua kiểm tra quyền. |
| Tin cậy | Transaction cho xét tuyển, chuyển nhập học, publish timetable/grade và thanh toán; request quan trọng chống gửi lặp. |
| Hiệu năng | Trang danh sách có phân trang; index các trường tra cứu; API danh sách mục tiêu phản hồi nhanh với dữ liệu demo vài nghìn bản ghi. |
| Khả dụng | Nếu realtime hoặc dịch vụ VietQR lỗi, chức năng lõi vẫn truy cập được; hiển thị trạng thái lỗi rõ ràng. |
| Dễ dùng | Form có validation; loading/empty/error state; bảng có tìm kiếm/lọc; responsive cho mobile ở portal ứng viên/phụ huynh. |
| SEO | Trang tuyển sinh công khai có metadata, sitemap/robots hợp lý, URL rõ nghĩa, nội dung render phía server. |
| Khả năng bảo trì | Tách module; migration có version; OpenAPI; convention code; PR review; không commit secret. |

# 12. PHƯƠNG PHÁP NGHIÊN CỨU VÀ THIẾT KẾ

- Khảo sát hiện trạng: mô phỏng/phỏng vấn quy trình tuyển sinh, xếp lịch, nhập điểm, điểm danh và trao đổi phụ huynh; ghi lại tác nhân, biểu mẫu, đầu vào/đầu ra và điểm nghẽn.

- Phân tích yêu cầu: BFD/BPMN, Use Case, quy tắc nghiệp vụ, ma trận quyền và tiêu chí chấp nhận.

- Thiết kế: ERD, Sequence Diagram cho luồng trọng điểm, UI Mockup, OpenAPI contract và kiến trúc module.

- Thực nghiệm phần mềm: xây prototype/MVP theo incremental delivery; mỗi tuần có deliverable chạy được hoặc tài liệu kiểm chứng được.

- Đánh giá: test unit/integration/API/E2E, bộ dữ liệu xung đột lịch, bộ ca điểm danh, ca hồ sơ thiếu minh chứng và ca thanh toán; đo tỷ lệ hard conflict của lịch phải bằng 0.

- So sánh: đối chiếu quy trình trước/sau theo số bước thao tác và thời gian phản hồi dự kiến trên kịch bản mẫu; không tuyên bố hiệu quả thực tế nếu chưa đo trên đơn vị thật.

## 12.1. Giả thuyết/tiêu chí đánh giá dự kiến

| Mã | Giả thuyết/tiêu chí | Cách kiểm chứng trong đồ án |
| --- | --- | --- |
| H1 | Quy trình tuyển sinh điện tử giảm việc nhập lại dữ liệu khi ứng viên trúng tuyển. | Demo một hồ sơ từ application sang student mà không nhập lại trường dữ liệu lõi. |
| H2 | Bộ sinh thời khóa biểu không tạo xung đột cứng. | Chạy tập dữ liệu kiểm thử và kiểm tra 0 trường hợp trùng giáo viên/phòng/lớp. |
| H3 | Điểm danh QR + realtime rút ngắn luồng thông báo cho phụ huynh. | Demo từ quét/đánh dấu Absent đến thông báo hiển thị ở Family Portal trong một phiên thử nghiệm. |
| H4 | Phân quyền theo actor giảm truy cập sai phạm vi. | Security test: giáo viên A không xem/sửa lớp B; phụ huynh A không xem học sinh B; ứng viên A không xem hồ sơ B. |

# 13. KIỂM THỬ VÀ TIÊU CHÍ CHẤP NHẬN

| Lớp kiểm thử | Phạm vi | Điều kiện đạt |
| --- | --- | --- |
| Unit test | Validation, mã tuyển sinh, conflict detector, tính điểm, QR token. | Có ca đúng/sai/biên; thuật toán lịch không cho hard conflict. |
| Integration test | JPA/MySQL, transaction, unique/FK, upload metadata. | Chạy với MySQL thật/test container; rollback đúng khi lỗi. |
| API test | Auth, quyền, ownership, trạng thái hồ sơ, publish timetable/grade. | Không có IDOR; status code và error message nhất quán. |
| E2E | Ứng viên -> duyệt -> nhập học; xếp lịch -> điểm danh -> phụ huynh; học phí -> VietQR. | Các luồng demo chính chạy từ đầu đến cuối trên môi trường deploy. |
| Security test | Sai quyền, token hết hạn, upload không hợp lệ, truy cập chéo người dùng. | Mặc định từ chối khi không đủ quyền; không lộ dữ liệu nhạy cảm. |
| Usability | Responsive, form, loading/error/empty state. | Không có màn hình chính bị vỡ trên desktop/mobile thông dụng. |

# 14. SẢN PHẨM BÀN GIAO SAU 12 TUẦN

- 01 Cổng tuyển sinh công khai chạy trên Internet, có URL ổn định và metadata SEO.

- 01 hệ thống quản trị đào tạo với tối thiểu các luồng: ứng viên -> xét tuyển -> nhập học -> lớp/môn -> thời khóa biểu -> điểm danh/điểm -> phụ huynh tra cứu.

- Source code GitHub có lịch sử commit của 5 thành viên, branch/PR rõ ràng và tag release phục vụ nghiệm thu.

- Cơ sở dữ liệu có migration/seed dữ liệu demo; ERD; OpenAPI/Swagger.

- Bộ tài liệu đề cương, phân tích thiết kế, báo cáo, hướng dẫn cài đặt/chạy và bộ test/kịch bản demo.

- Cloud deployment: Vercel cho frontend; Render/Railway cho backend; MySQL managed hoặc tương đương.

# 15. CẤU TRÚC BÁO CÁO DỰ KIẾN

| Chương | Nội dung chính |
| --- | --- |
| Chương 1 - Giới thiệu | Bối cảnh, lý do chọn đề tài, mục tiêu, phạm vi, đối tượng và đóng góp dự kiến. |
| Chương 2 - Cơ sở lý thuyết và công nghệ | Quản trị giáo dục số, tuyển sinh trực tuyến, RBAC/JWT, lập lịch có ràng buộc, QR/VietQR, realtime, stack triển khai. |
| Chương 3 - Phân tích yêu cầu | Khảo sát hiện trạng, tác nhân, BFD/BPMN, Use Case, quy tắc nghiệp vụ, yêu cầu phi chức năng. |
| Chương 4 - Thiết kế hệ thống | Kiến trúc, ERD, sequence, API, UI mockup, thiết kế thuật toán timetable và bảo mật. |
| Chương 5 - Xây dựng hệ thống | Triển khai theo module, các màn hình/luồng chính, tích hợp, deploy. |
| Chương 6 - Kiểm thử và đánh giá | Unit/integration/E2E/security, dữ liệu test, kết quả hard conflict, đánh giá hạn chế. |
| Chương 7 - Kết luận và hướng phát triển | Kết quả đạt được, giới hạn và các mở rộng ZNS/OnePay/VNPay/tối ưu lịch. |

# 16. ĐỐI CHIẾU 10 TIÊU CHÍ CHẤM ĐỀ CƯƠNG

| TT | Tiêu chí | Vị trí đáp ứng trong tài liệu |
| --- | --- | --- |
| 1 | Nêu bật lý do chọn đề tài, phù hợp thực tế | Mục 1.2, 1.3. |
| 2 | Nêu giải pháp/nghiên cứu liên quan | Mục 1.4, 3, 4, 8, 12. |
| 3 | Khoanh vùng đối tượng/phạm vi áp dụng | Mục 1.5, 2. |
| 4 | Phương pháp nghiên cứu/triển khai phù hợp | Mục 12. |
| 5 | Nêu điểm mới/giá trị đóng góp | Mục 1.6. |
| 6 | Kế hoạch thực hiện chi tiết | Tài liệu riêng 03 - Kế hoạch 12 tuần. |
| 7 | Các chương dự kiến hợp lý, bao quát | Mục 15. |
| 8 | Các chương tách biệt rõ ràng | Mục 15 phân tách theo phân tích - thiết kế - xây dựng - kiểm thử. |
| 9 | Tài liệu tham khảo | Mục 17. |
| 10 | Trình bày đúng font/cỡ chữ/canh lề | Tài liệu dùng Times New Roman 12, giãn dòng 1.5, đen trắng. |

# 17. TÀI LIỆU THAM KHẢO DỰ KIẾN

[1] Spring Boot Reference Documentation - tài liệu chính thức của Spring.

[2] Spring Security Reference - xác thực, phân quyền và bảo mật ứng dụng web.

[3] Next.js Documentation - App Router, Rendering, Metadata và SEO.

[4] MySQL Reference Manual - transaction, index, constraint và tối ưu truy vấn.

[5] RFC 7519 - JSON Web Token (JWT).

[6] RFC 6455 - The WebSocket Protocol.

[7] OWASP Application Security Verification Standard (ASVS) và OWASP Top 10.

[8] Tài liệu VietQR/NAPAS liên quan đến cấu trúc QR thanh toán và đối soát.

[9] Tài liệu/giáo trình về bài toán lập thời khóa biểu (educational timetabling) và constraint scheduling.

[10] Tài liệu quy trình, biểu mẫu tuyển sinh/đào tạo thực tế được nhóm khảo sát trong quá trình làm đồ án.

# 18. QUY ƯỚC CHUNG CHO NHÓM KHI TRIỂN KHAI

- Không tự ý thêm chức năng lớn ngoài phạm vi nếu chưa thống nhất nhóm; ưu tiên hoàn thành luồng end-to-end.

- Mỗi module có owner rõ ràng; owner chịu trách nhiệm DB -> backend -> frontend -> test -> tài liệu của module.

- API contract và model ID dùng chung phải chốt sớm; module khác được phép phát triển bằng mock data nếu API thật chưa hoàn thành.

- Không ai tự merge Pull Request của mình; bắt buộc ít nhất một reviewer.

- Commit nhỏ, mô tả rõ; không đẩy .env, secret, file upload thật hoặc dữ liệu cá nhân lên GitHub.

- Mỗi tuần phải có sản phẩm kiểm chứng được: tài liệu, migration, API, màn hình, test hoặc bản deploy; tránh dồn toàn bộ vào tuần 9-11.
