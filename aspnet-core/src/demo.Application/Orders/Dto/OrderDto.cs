using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Orders.Dto
{
    public class OrderDto : EntityDto<long>
    {
        public string OrderCode { get; set; }
        public string OrderName { get; set; }
        public string PathImage { get; set; }
        public ulong Quantity { get; set; }
        public ulong Price { get; set; }
        public string Description { get; set; }
        public string StatusOrderName { get; set; }
        public Status Status { get; set; }
        public string CategoryName { get; set; }
        public string StatusName { get; set; }
    }
}