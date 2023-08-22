using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Entity
{
    public class OrderDetail : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public long? ProductId { get; set; }
        public virtual Product Product { get; set; }
        public long? OrderId { get; set; }
        public virtual Order Order { get; set;}
        public string Unit { get; set; }
        public ulong Quantity { get; set; }
        public ulong UnitPrice { get; set; }
        public ulong Amount { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
