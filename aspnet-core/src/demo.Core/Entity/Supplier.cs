using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using demo.Common;
using System.ComponentModel.DataAnnotations;

namespace demo.Entity
{
    public class Supplier : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; }
        public string Email { get; set; }
        [MaxLength(512)]
        public string Address { get; set; }
        [MaxLength(16)]
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public virtual ICollection<GoodsReceipt> GoodsReceipts { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
