using Abp.Application.Services.Dto;
using demo.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Orders.Dto
{
    public class EditOrderDto : EntityDto<long>
    {
        public string OrderCode { get; set; }
        public string OrderName { get; set; }
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