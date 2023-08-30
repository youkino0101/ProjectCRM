using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using demo.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Suppliers.Dto
{
    public class EditSupplierDto : EntityDto<long>
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