using Abp.Application.Services.Dto;
using System;

namespace demo.AuditLogs.Dto
{
    //custom PagedResultRequestDto
    public class PagedAuditLogResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
