using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using demo.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Quote : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string QuotesCode { get; set; }
        public long CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
        public long ProjectId { get; set; } // Của dự án nào
        public virtual Project Project { get; set; }
        public DateTime QuoteDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; }
        public long Amount { get; set; }
        public long Vat { get; set; }
        public long TotalAmount { get; set; }
        public virtual ICollection<QuoteDetail> QuoteDetails { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
