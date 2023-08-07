using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using demo.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Tasks : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string TaskCode { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; } // Ngày bắt đầu công việc
        public DateTime DueDate { get; set; } // Ngày dự kiến hoàn thành công việc
        public StatusTask Status { get; set; } // Trạng thái công việc
        public TaskPriority Priority { get; set; } // Độ ưu tiên của công việc
        public long ProjectId { get; set; } // Của dự án nào
        public virtual Projects Project { get; set; }
        public virtual ICollection<TaskAssignments> TaskAssignments { get; set; }
        public virtual ICollection<Notes> Notes { get; set; }
        public virtual ICollection<Attachments> Attachments { get; set; } 

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
