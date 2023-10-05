using demo.Common;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Http;

namespace demo.Staffs.Dto
{
    public class CreateStaffDto
    {
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public StaffStatus StaffStatus { get; set; }
        public long UserId { get; set; }
    }
}
