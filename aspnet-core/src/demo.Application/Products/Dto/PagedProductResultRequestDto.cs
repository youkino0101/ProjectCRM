using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Products.Dto
{
    public class PagedProductResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
        public Status? Status { get; set; }
        public Category? Category { get; set; }
    }
}

