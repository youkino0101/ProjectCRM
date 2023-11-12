using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.GoodsReceipts.Dto
{
    public class PagedGoodsReceiptResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}

