using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.Customers.Dto
{
    public class CustomerDto : EntityDto<long>
    {
        public string CodeCustomer { get; set; }
        public string NameCustomer { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public string StatusName { get; set; }
        public DateTime CreationTime { get; set; }
    }
}