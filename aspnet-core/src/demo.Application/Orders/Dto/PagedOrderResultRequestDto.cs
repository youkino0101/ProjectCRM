using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.Orders.Dto
{
    public class PagedOrderResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}

