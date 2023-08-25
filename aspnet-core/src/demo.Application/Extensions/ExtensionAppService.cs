using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Common;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace demo.Extensions
{
    [AbpAuthorize]
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
                    enity.CurrentNumber++;
                    await _repository.UpdateAsync(enity);
                    result = enity.Code + enity.CurrentNumber.ToString().PadLeft(enity.Digit, '0');
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("GetGenerateNumber exception message");
            }
        }

        public async Task<List<SelectListItem>> GetSelectListItemEnumStatusAsync()
        {
            try
            {
                return EnumHelper.GetSelectListFromEnum<Status>();
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("GetSelectListItemEnum exception message");
            }
        }

        public async Task<List<SelectListItem>> GetSelectListItemEnumCategoryAsync()
        {
            try
            {
                return EnumHelper.GetSelectListFromEnum<Category>();
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("GetSelectListItemEnum exception message");
            }
        }
    }
}

