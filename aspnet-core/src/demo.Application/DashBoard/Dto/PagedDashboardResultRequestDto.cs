using Abp.Application.Services.Dto;
using demo.Common;
using System;

namespace demo.Orders.Dto
{
    public class PagedDashboardResultRequestDto : PagedResultRequestDto
    {
        public string? Keyword { get; set; }
    }
}

