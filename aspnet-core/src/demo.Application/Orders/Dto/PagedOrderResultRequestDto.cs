using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Orders.Dto
{
    public class PagedOrderResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public StatusOrder? Status { get; set; }
    }
}

