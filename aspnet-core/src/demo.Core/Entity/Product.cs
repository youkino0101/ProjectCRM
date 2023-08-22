using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using demo.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Entity
{
    public class Product : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        [MaxLength(16)]
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string? PathImage { get; set; } = string.Empty;
        public ulong Quantity { get; set; }
        public ulong Price { get; set; }
        public string? Description { get; set; } = null;
        public Category Category { get; set; }
        public string? Trademark { get; set; } = null;
        public Status Status { get; set; }
        public virtual ICollection<GoodsReceiptDetail> GoodsReceiptDetails { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
