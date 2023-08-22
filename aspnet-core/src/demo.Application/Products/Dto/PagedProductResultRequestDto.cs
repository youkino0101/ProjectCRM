using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Products.Dto
{
    public class PagedProductResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public StaffStatus? StaffStatus { get; set; }
    }
}

