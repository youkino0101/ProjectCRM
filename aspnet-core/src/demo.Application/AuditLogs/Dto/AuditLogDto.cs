using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;

namespace demo.AuditLogs.Dto
{
    [AutoMapFrom(typeof(AuditLog))]
    public class AuditLogDto : EntityDto<long>
    {
        public int? TenantId { get; set; }

        public long? UserId { get; set; }

        public string ServiceName { get; set; }

        public string MethodName { get; set; }

        public string Parameters { get; set; }

        public string? ReturnValue { get; set; }

        public DateTime ExecutionTime { get; set; }
        public int ExecutionDuration { get; set; }

        public string ClientIpAddress { get; set; }

        public string? ClientName { get; set; }

        public string BrowserInfo { get; set; }

        public string ExceptionMessage { get; set; }

        public string Exception { get; set; }

        public long? ImpersonatorUserId { get; set; }
        public int? ImpersonatorTenantId { get; set; }

        public string CustomData { get; set; }
    }
}
