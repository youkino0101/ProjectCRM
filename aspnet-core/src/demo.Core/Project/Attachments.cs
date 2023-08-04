using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Attachments : Entity<long>
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long TaskId { get; set; }
        public long UserId { get; set; }
    }
}
