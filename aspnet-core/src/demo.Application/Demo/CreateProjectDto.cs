using demo.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Demo
{
    public class CreateProjectDto
    {
        public string CodeProject { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } // Mô tả dự án
        public DateTime StartDate { get; set; } // Ngày bắt đầu dự án
        public DateTime DueDate { get; set; } // Ngày dự kiến hoàn thành dự án
        public StatusProject StatusProject { get; set; } // trạng thái dự án
        public string? LeaderName { get; set; } // người nhận dự án (có thể null)
    }
}
