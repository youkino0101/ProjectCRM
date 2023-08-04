using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Activity
{
    public class Activities : Entity<long>
    {
        public long CustomerId { get; set; }
        public long UserId { get; set; }
        public DateTime ActivityDate { get; set; }
        public DateTime EndTime { get; set; }
        public string ActivityType { get; set; } // enum
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
