using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class QuoteDetails : Entity<long>
    {
        public long QuoteId { get; set; }
        public string QuoteName { get; set;}
        public long Quantity { get; set;}
        public long Price { get; set;}
        public long Subtotal { get; set;}
    }
}
