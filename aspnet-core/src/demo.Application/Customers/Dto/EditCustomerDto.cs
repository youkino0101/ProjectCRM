using Abp.Application.Services.Dto;
using demo.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Customers.Dto
{
    public class EditCustomerDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string? CompanyName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
