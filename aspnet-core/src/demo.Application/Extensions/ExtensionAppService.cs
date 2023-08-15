using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace demo.Extensions
{
    public class ExtensionAppService : IApplicationService, IExtensionAppService
    {
        IRepository<GenerateNumber> _repository;
        public ExtensionAppService(IRepository<GenerateNumber> repository)
        {
            _repository = repository;
        }

        public async Task<string> GetGenerateNumber(string code)
        {
            try
            {
                string result = "";

                var enity = await _repository.FirstOrDefaultAsync(x => x.Code == code);
                if (enity != null)
                {
                    enity.SoHienTai++;
                    await _repository.UpdateAsync(enity);
                    result = enity.Code + enity.SoHienTai.ToString().PadLeft(enity.DoDaiSo, '0');
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("GetGenerateNumber exception message");
            }
        }
    }
}

