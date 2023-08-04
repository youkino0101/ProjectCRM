using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Task : Entity<long>
    {
        public string TaskCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } // Ngày bắt đầu công việc
        public DateTime DueDate { get; set; } // Ngày dự kiến hoàn thành công việc
        public string Status { get; set; } // Trạng thái công việc
        public string Priority { get; set; } // Độ ưu tiên của công việc
        public long ProjectId { get; set; } // Của dự án nào
        public long UserId { get; set; } // Người nhận công việc(có thể null)
    }
}
