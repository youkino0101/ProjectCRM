using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Abp.Auditing;
using demo.AuditLogs.Dto;
using demo.Authorization;

namespace demo.AuditLogs
{
    [AbpAuthorize(PermissionNames.Pages_AuditLogs)]
    public class AuditLogAppService : AsyncCrudAppService<AuditLog, AuditLogDto, long, PagedAuditLogResultRequestDto, AuditLogDto, AuditLogDto>, IAuditLogAppService
    {
        public AuditLogAppService(IRepository<AuditLog, long> repository) : base(repository)
        { 
        }

        protected override IQueryable<AuditLog> CreateFilteredQuery(PagedAuditLogResultRequestDto input)
        {
            var result = Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                    x => x.ServiceName.Contains(input.Keyword)
                    || x.MethodName.Contains(input.Keyword)
                    || x.Exception.Contains(input.Keyword)
                    || x.ExceptionMessage.Contains(input.Keyword)
                    || x.Parameters.Contains(input.Keyword))
                .OrderByDescending(r => r.Id);

            return result;
        }
    }
}

