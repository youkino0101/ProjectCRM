using Abp.Application.Services.Dto;

namespace demo.Customers.Dto
{
    public class PagedCustomerResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

