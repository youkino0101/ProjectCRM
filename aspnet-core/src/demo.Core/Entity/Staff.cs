using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using demo.Common;
using demo.Authorization.Users;
using System.Collections.Generic;

namespace demo.Entity
{
    public class Staff : Entity<long>, IHasCreationTime, IHasModificationTime, ICreationAudited, IModificationAudited
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
        public string? Address { get; set; }
        public StaffStatus StaffStatus { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<GoodsReceipt> GoodsReceipts { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }
        //Liên kết với tài khoản người dùng
        public long UserId { get; set; }
        public virtual User User { get; set; }
    }
}
