using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Customers.Dto
{
    public class PagedCustomerResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public Status? Status { get; set; }
    }
}

