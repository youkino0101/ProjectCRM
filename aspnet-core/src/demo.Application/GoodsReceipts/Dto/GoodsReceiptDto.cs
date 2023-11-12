using Abp.Application.Services.Dto;
using demo.Common;
using System;
using System.Collections.Generic;

namespace demo.GoodsReceipts.Dto
{
    public class GoodsReceiptDto : EntityDto<long>
    {
        public string GoodsReceiptCode { get; set; }
        public string WareHouse { get; set; }
        public string? StaffName { get; set; }
        public string? SupplierName { get; set; }
        public string Status { get; set; }
        public ulong? TotalPrice { get; set; }
        public DateTime CreationTime { get; set; }
    }
}