Bảng "Projects" (Dự án):
ProjectID (Khóa chính): Mã duy nhất của dự án.
ProjectName: Tên dự án.
Description: Mô tả chi tiết về dự án.
StartDate: Ngày bắt đầu dự án.
DueDate: Ngày dự kiến hoàn thành dự án.
Status: Trạng thái của dự án (đang triển khai, đã hoàn thành, v.v.).
AssignedTo: Người được giao quản lý dự án.
CreatedBy: Người tạo dự án.
CreatedDate: Ngày tạo dự án.
UpdatedBy: Người cập nhật dự án.
UpdatedDate: Ngày cập nhật dự án.

BBảng "Tasks" (Công việc):
TaskID (Khóa chính): Mã duy nhất của công việc.
Title: Tiêu đề của công việc.
Description: Mô tả chi tiết công việc.
StartDate: Ngày bắt đầu công việc.
DueDate: Ngày kết thúc dự kiến của công việc.
Status: Trạng thái của công việc (đang thực hiện, đã hoàn thành, v.v.).
Priority: Độ ưu tiên của công việc (thấp, trung bình, cao, v.v.).
CreatedBy: Người tạo công việc.
CreatedDate: Ngày tạo công việc.
UpdatedBy: Người cập nhật công việc.
UpdatedDate: Ngày cập nhật công việc.

Bảng "TaskAssignments" (Việc giao công việc cho nhân viên):
AssignmentID (Khóa chính): Mã duy nhất của việc giao công việc.
TaskID (Khóa ngoại): Liên kết việc giao công việc với công việc cụ thể.
UserID (Khóa ngoại): Liên kết việc giao công việc với người nhân viên được giao công việc.

Bảng "Users" (Người dùng):
UserID (Khóa chính): Mã duy nhất của người dùng.
FirstName: Tên.
LastName: Họ.
Email: Địa chỉ email của người dùng.
Role: Vai trò của người dùng (quản lý, nhân viên, v.v.).

Bảng "Customers" (Khách hàng):
CustomerID (Khóa chính): Mã duy nhất của khách hàng.
CompanyName: Tên công ty của khách hàng.
ContactName: Tên người liên hệ.
Email: Địa chỉ email của người liên hệ.
Phone: Số điện thoại của người liên hệ.

Bảng "Notes" 
NoteID (Khóa chính): Mã duy nhất của ghi chú.
TaskID (Khóa ngoại): Liên kết ghi chú với công việc cụ thể.
UserID (Khóa ngoại): Liên kết ghi chú với người dùng tạo nó.
Content: Nội dung của ghi chú.
CreatedDate: Ngày tạo ghi chú.

Bảng "Attachments" (Tệp đính kèm):
AttachmentID (Khóa chính): Mã duy nhất của tệp đính kèm.
TaskID (Khóa ngoại): Liên kết tệp đính kèm với công việc cụ thể.
UserID (Khóa ngoại): Liên kết tệp đính kèm với người dùng tạo nó.
FileName: Tên tệp đính kèm.
FilePath: Đường dẫn lưu trữ tệp đính kèm.
CreatedDate: Ngày tạo tệp đính kèm.

Bảng "Quotes" (Báo giá) (đã bổ sung các trường liên kết "CustomerID" và "ProjectID"):
QuoteID (Khóa chính): Mã duy nhất của báo giá.
CustomerID (Khóa ngoại): Liên kết báo giá với khách hàng cụ thể.
ProjectID (Khóa ngoại): Liên kết báo giá với dự án cụ thể (nếu có).
QuoteDate: Ngày tạo báo giá.
ExpiryDate: Ngày hết hạn của báo giá.
Status: Trạng thái của báo giá (đang hiệu lực, đã hết hạn, đã chấp nhận, v.v.).
Amount: tổng tiền trong chi tiết báo giá
VAT: thuế GTGT
TotalAmount: Tổng số tiền trong báo giá.

Bảng "QuoteDetails" (Chi tiết báo giá) ():
ID (Khóa chính): Mã duy nhất của chi tiết báo giá.
QuoteID (Khóa ngoại): Liên kết chi tiết báo giá với báo giá chính tương ứng.
Name: Tên chi tiết dịch vụ
Quantity: Số lượng dịch vụ được báo giá.
Price: Đơn giá của dịch vụ.
Subtotal: Tổng tiền cho mỗi dòng trong báo giá (Quantity x UnitPrice).
(Ví dụ: Phí khởi tạo, 1, 1.000.000;
		Phí duy trì theo tháng;
		Phí duy trì theo năm;
		Phí sử dụng vĩnh viễn)
		
		
Bảng "Activities" (Hoạt động):
ActivityID (Khóa chính): Mã duy nhất của hoạt động.
CustomerID (Khóa ngoại): Liên kết hoạt động với khách hàng cụ thể.
UserID (Khóa ngoại): Liên kết hoạt động với người dùng tương ứng.
ActivityDate: Ngày thực hiện hoạt động.
ActivityType: Loại hoạt động (lịch sử liên hệ, lịch hẹn, v.v.).
Description: Mô tả chi tiết hoạt động.
Status: Trạng thái của hoạt động (đã xác nhận, chưa xác nhận, đã hủy, v.v.).