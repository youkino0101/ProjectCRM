using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using demo.Common;

namespace demo.Category
{
    public class Staffs : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
    {
        [MaxLength(16)]
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        [MaxLength(16)]
        public string PhoneNumber { get; set; }
        [MaxLength(64)]
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        [MaxLength(512)]
        public string Address { get; set; }
        public string? AvatarImage { get; set; }
        public StaffStatus StaffStatus { get; set; }

        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}
