using Abp.Application.Services.Dto;
using demo.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Products.Dto
{
    public class EditProductDto : EntityDto<long>
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public IFormFile File { get; set; }
        public string PathImage { get; set; }
        public ulong Quantity { get; set; }
        public ulong Price { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public string Trademark { get; set; }
        public Status Status { get; set; }
    }
}
