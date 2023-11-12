using demo.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace demo.GoodsReceipts.Dto
{
    public class CreateGoodsReceiptDto 
    {
        public string GoodsReceiptCode { get; set; }
        public string WareHouse { get; set; }
        public Status Status { get; set; }
        public long SupplierId { get; set; }
        public long StaffId { get; set; }
        public ulong? TotalPrice { get; set; }
        public List<CreateGoodsReceiptDetailDto> listGoodsReceiptDetail { get; set; }
    }
}
