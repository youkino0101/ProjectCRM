using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Suppliers.Dto
{
    public class PagedSupplierResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public Status? Status { get; set; }
    }
}

