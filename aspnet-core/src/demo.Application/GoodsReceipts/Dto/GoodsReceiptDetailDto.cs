using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.GoodsReceipts.Dto
{
    public class GoodsReceiptDetailDto : EntityDto<long>
    {
        public int Number { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public ulong Quantity { get; set; } // số lượng 
        public ulong UnitPrice { get; set; } // đơn giá
        public ulong Amount { get; set; } // tiền
    }
}