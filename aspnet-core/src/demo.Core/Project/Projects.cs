using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static demo.Common.Enum;

namespace demo.Project
{
    public class Projects : Entity<long>
    {
        public string CodeProject { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } // Ngày bắt đầu dự án
        public DateTime DueDate { get; set; } // Ngày dự kiến hoàn thành dự án
        public StatusProject StatusProject { get; set; } // trạng thái dự án
        public string LeaderName { get; set; } // người nhận dự án (có thể null)
    }
}
