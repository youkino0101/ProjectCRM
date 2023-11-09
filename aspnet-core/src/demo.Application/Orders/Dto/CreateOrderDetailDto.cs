using demo.Common;
using Microsoft.AspNetCore.Http;

namespace demo.Orders.Dto
{
    public class CreateOrderDetailDto
    {
        public long ProductId { get; set; }
        public long? OrderId { get; set; }
        public string Unit { get; set; }
        public ulong Quantity { get; set; }
        public ulong UnitPrice { get; set; }
        public ulong Amount { get; set; } 
    }
}
