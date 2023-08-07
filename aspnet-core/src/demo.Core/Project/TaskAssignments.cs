using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using demo.Category;

namespace demo.Project
{
    public class TaskAssignments : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public long TaskId { get; set; }
        public virtual Tasks Task { get; set; }

        public long StaffId { get; set; }
        public virtual Staffs Staff { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
