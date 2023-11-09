using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using demo.Common;
using System;
using System.Collections.Generic;

namespace demo.Entity
{
    public class Order : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string OrderCode { get; set; }
        public string Warehouse { get; set; }
        public long? CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public long? StaffId { get; set; }
        public virtual Staff Staff { get; set; }
        public StatusOrder StatusOrder { get; set; }
        public ulong? TotalPrice { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
