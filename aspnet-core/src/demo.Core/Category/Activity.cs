using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using demo.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Category
{
    public class Activity : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public long CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public long StaffId { get; set; }
        public virtual Staff Staff { get; set; }
        public DateTime ActivityDate { get; set; } // ngày bắt đầu hoạt động
        public DateTime EndTime { get; set; }
        public ActivityType ActivityType { get; set; } // enum
        public string Description { get; set; } //  mô tả hoạt động
        public ActivityStatus Status { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
