using demo.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace demo.Orders.Dto
{
    public class CreateOrderDto
    {
        public string OrderCode { get; set; }
        public string Warehouse { get; set; }
        public long CustomerId { get; set; }
        public long StaffId { get; set; }
        public StatusOrder StatusOrder { get; set; }
        public ulong? TotalPrice { get; set; }
        public List<CreateOrderDetailDto> listOrderDetail { get; set; }
    }
}
