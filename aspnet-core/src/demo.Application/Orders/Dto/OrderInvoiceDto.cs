using Abp.Application.Services.Dto;
using demo.Common;
using demo.Entity;
using System;
using System.Collections.Generic;

namespace demo.Orders.Dto
{
    public class OrderInvoiceDto : EntityDto<long>
    {
        public string OrderCode { get; set; }
        public string Warehouse { get; set; }
        public string StaffName { get; set; }
        public string AddressCompany { get; set; }
        public string PhoneNumberCompany { get; set; }
        public string EmailCompany { get; set; }
        public string CustomerName { get; set; }
        public string AddressCustomer { get; set; }
        public string PhoneNumberCustomer { get; set; }
        public string EmailCustomer { get; set; }
        public List<OrderDetailDto> orderDetailDtos { get; set; }
        public ulong? TotalPrice { get; set; }
        public DateTime CreationTime { get; set; }
    }
}