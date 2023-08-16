using Abp.Application.Services;
using demo.AuditLogs.Dto;

namespace demo.AuditLogs
{
    public interface IAuditLogAppService : IAsyncCrudAppService<AuditLogDto, long, PagedAuditLogResultRequestDto, AuditLogDto, AuditLogDto>
    {

    }
}
