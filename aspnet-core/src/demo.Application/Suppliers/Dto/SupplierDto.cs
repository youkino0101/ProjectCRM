using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.Suppliers.Dto
{
    public class SupplierDto : EntityDto<long>
    {
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public string StatusName { get; set; }
        public DateTime CreationTime { get; set; }
    }
}