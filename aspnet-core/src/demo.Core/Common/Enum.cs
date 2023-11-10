using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace demo.Common
{
   
    public enum StatusProject
    {
        InThePlan, // trong kết hoạch
        InProgress, // đang tiến hành
        Completed, // hoàn thành
        Paused, // tạm dừng
    }

    public enum StatusTask // Trạng thái công việc
    {
        New, // mới
        InProgress, // đang tiến hành
        Completed, // hoàn thành
        Canceled // đã hủy
    }

    public enum TaskPriority // Độ ưu tiên công việc 
    {
        Low, // thấp 
        Medium, // trung bình
        High, // cao
        Urgent // cấp bách
    }

    public enum StaffStatus
    {
        Active, //  hoạt động
        OnLeave // đã thôi việc
    }

    public enum ActivityType
    {
        Meeting, //  cuộc họp
        CallClient, // cuộc gọi với khách hàng
        Lunch, // hẹn ăn với khách hàng
        Orther // Khác
    }

    public enum ActivityStatus // Trạng thái công việc
    {
        UnConfirmed, // chưa xác nhận
        Confirmed, // đã xác nhận
        Completed, // hoàn thành
        Canceled // đã hủy
    }

    public enum QuoteStatus
    {
        Approved, // Báo giá đã được duyệt.
        Accepted, // Báo giá đã được chấp nhận bởi khách hàng.
        Expired, // báo giá hết hạn
        Rejected, // Báo giá bị từ chối.
    }
    public enum Status
    {
        [Display(Name = "Active")]
        Active, // hoạt động
        [Display(Name = "Processing")]
        Processing, // đang xử lý
        [Display(Name = "Lock")]
        Lock, // khóa
        [Display(Name = "Canceled")]
        Canceled, // đã hủy
        [Display(Name = "Orther")]
        Orther, // khác
    }
    public enum Category
    {
        [Display(Name = "SmartPhone")]
        SmartPhone, // điện thoại thông minh
        [Display(Name = "Ipad")]
        Ipad, // máy tính bảng
        [Display(Name = "Phone")]
        Phone, // điện thoại bth
        [Display(Name = "Orther")]
        Orther // 
    }
    public enum StatusOrder
    {
        [Display(Name = "Processing")]
        Processing, // đang xử lý
        [Display(Name = "Confirmed")]
        Confirmed, // đã xác nhận
        [Display(Name = "Completed")]
        Completed, // đã hoàn thành
        [Display(Name = "Canceled")]
        Cancel, // đã hủy
        [Display(Name = "Orther")]
        Orther // khác
    }
}
