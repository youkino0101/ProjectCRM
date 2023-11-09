using Abp.Application.Services.Dto;
using demo.Common;
using System;
using System.Collections.Generic;

namespace demo.Orders.Dto
{
    public class OrderDto : EntityDto<long>
    {
        public string OrderCode { get; set; }
        public string Warehouse { get; set; }
        public string? StaffName { get; set; }
        public string? CustomerName { get; set; }
        public string StatusOrder { get; set; }
        public ulong? TotalPrice { get; set; }
        public DateTime CreationTime { get; set; }
    }
}