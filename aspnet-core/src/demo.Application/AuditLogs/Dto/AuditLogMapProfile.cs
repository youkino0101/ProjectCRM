using Abp.Auditing;
using AutoMapper;

namespace demo.AuditLogs.Dto
{
    public class AuditLogMapProfile : Profile
    {
        public AuditLogMapProfile()
        {
            CreateMap<AuditLogDto, AuditLog>();
        }
    }
}
