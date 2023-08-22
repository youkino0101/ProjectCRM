using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using demo.Common;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace demo.Entity
{
    public class Customer : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        [MaxLength(16)]
        public string CodeCustomer { get; set; }
        public string NameCustomer { get; set; }
        public string Email { get; set; }
        [MaxLength(512)]
        public string Address { get; set; }
        [MaxLength(16)]
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
