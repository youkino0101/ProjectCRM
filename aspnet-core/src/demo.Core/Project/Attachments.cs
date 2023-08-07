﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using demo.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Project
{
    public class Attachments : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long TaskId { get; set; }
        public virtual Tasks Task { get; set; }
        public long StaffId { get; set; }
        public virtual Staffs Staff { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
