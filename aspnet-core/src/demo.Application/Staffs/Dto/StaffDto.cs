using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.Staffs.Dto
{
    public class StaffDto : EntityDto<long>
    {
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public StaffStatus StaffStatus { get; set; }
        public DateTime CreationTime { get; set; }
    }
}