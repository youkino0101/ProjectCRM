using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Quotes : Entity<long>
    {
        public long CustomerId { get; set; }
        public long ProjectId { get; set; }
        public DateTime QuoteDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; }
        public long Amount { get; set; }
        public long Vat { get; set; };
        public long TotalAmount { get; set; }
    }
}
