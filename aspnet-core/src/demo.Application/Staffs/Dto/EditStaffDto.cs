using Abp.Application.Services.Dto;
using demo.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Staffs.Dto
{
    public class EditStaffDto : EntityDto<long>
    {
        public string StaffName { get; set; }
        [MaxLength(16)]
        public string PhoneNumber { get; set; }
        [MaxLength(64)]
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        [MaxLength(512)]
        public string Address { get; set; }
        public StaffStatus StaffStatus { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
