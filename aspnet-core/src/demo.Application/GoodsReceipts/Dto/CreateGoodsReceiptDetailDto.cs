using Abp.Application.Services.Dto;
using demo.Common;
using Microsoft.AspNetCore.Http;

namespace demo.GoodsReceipts.Dto
{
    public class CreateGoodsReceiptDetailDto : EntityDto<long>
    {
        public long ProductId { get; set; }
        public long? GoodsReceiptId { get; set; }
        public string Unit { get; set; }
        public ulong AccordingToDocument { get; set; }
        public ulong ActuallyImported { get; set; }
        public ulong UnitPrice { get; set; }
        public ulong Amount { get; set; } 
    }
}
