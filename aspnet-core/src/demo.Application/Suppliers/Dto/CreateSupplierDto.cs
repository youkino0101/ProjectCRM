using Abp.Authorization.Users;
using demo.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace demo.Suppliers.Dto
{
    public class CreateSupplierDto
    {
        [Required]
        public string SupplierCode { get; set; }
        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string SupplierName { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
    }
}
