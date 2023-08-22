using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using demo.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Entity
{
    public class GoodsReceipt : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string GoodsReceiptCode { get; set; }
        public string WareHouse { get; set; }
        public long? StaffId { get; set; }
        public virtual Staff Staff { get; set; }
        public long? SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }
        public ulong TotalPrice { get; set; }
        public Status Status { get; set; }
        public virtual ICollection<GoodsReceiptDetail> GoodsReceiptDetails { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
