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
        public ulong Quantity { get; set; } // số lượng 
        public ulong UnitPrice { get; set; } // đơn giá
        public ulong Amount { get; set; } // tiền
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
