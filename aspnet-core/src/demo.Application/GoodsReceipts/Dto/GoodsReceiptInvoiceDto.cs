using Abp.Application.Services.Dto;
using demo.Common;
using demo.Entity;
using System;
using System.Collections.Generic;

namespace demo.GoodsReceipts.Dto
{
    public class GoodsReceiptInvoiceDto : EntityDto<long>
    {
        public string GoodsReceiptCode { get; set; }
        public string Warehouse { get; set; }
        public string StaffName { get; set; }
        public string AddressCompany { get; set; }
        public string PhoneNumberCompany { get; set; }
        public string EmailCompany { get; set; }
        public string CustomerName { get; set; }
        public string AddressSupplier { get; set; }
        public string PhoneNumberSupplier { get; set; }
        public string EmailCustomer { get; set; }
        public List<GoodsReceiptDetailDto> goodsReceiptDetailDtos { get; set; }
        public ulong? TotalPrice { get; set; }
        public DateTime CreationTime { get; set; }
    }
}