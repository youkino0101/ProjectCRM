using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Notes : Entity<long>
    {
        public string Content { get; set; } // nội dung của ghi chú
        public long TaskId { get; set; }
        public long UserId { get; set; }
    }
}
