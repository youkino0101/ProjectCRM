using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Entity
{
    public class GoodsReceiptDetail : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public long? ProductId { get; set; }
        public virtual Product Product { get; set; }
        public long? GoodsReceiptId { get; set; }
        public virtual GoodsReceipt GoodsReceipt { get; set; }
        public string Unit { get; set; }
        public ulong AccordingToDocument { get; set; }
        public ulong ActuallyImported { get; set; }
        public ulong UnitPrice { get; set; }
        public ulong Amount { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
