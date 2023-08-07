using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using demo.Common;
using System;
using System.Collections.Generic;

namespace demo.Project
{
    public class Project : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string CodeProject { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } // Mô tả dự án
        public DateTime StartDate { get; set; } // Ngày bắt đầu dự án
        public DateTime DueDate { get; set; } // Ngày dự kiến hoàn thành dự án
        public StatusProject StatusProject { get; set; } // trạng thái dự án
        public string? LeaderName { get; set; } // người nhận dự án (có thể null)
        public virtual ICollection<Task> Tasks { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
