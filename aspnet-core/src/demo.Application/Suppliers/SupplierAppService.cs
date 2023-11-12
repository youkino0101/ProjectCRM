using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using System.Threading.Tasks;
using System;
using Abp.UI;
using System.Linq;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using demo.Authorization;
using demo.Suppliers.Dto;
using demo.Customers.Dto;
using System.Collections.Generic;

namespace demo.Suppliers
{
    [AbpAuthorize(PermissionNames.Pages_Suppliers)]
    public class SupplierAppService : AsyncCrudAppService<Supplier, SupplierDto, long, PagedSupplierResultRequestDto, CreateSupplierDto, EditSupplierDto>, ISupplierAppService
    {
        public SupplierAppService(IRepository<Supplier, long> repository) : base(repository)
        {
        }
        [AbpAuthorize(PermissionNames.Pages_Supplier_View)]
        public override Task<SupplierDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }

        [AbpAuthorize(PermissionNames.Pages_Supplier_Create)]
        public async override Task<SupplierDto> CreateAsync(CreateSupplierDto input)
        {
            try
            {
                return await base.CreateAsync(input);
            } catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }
        [AbpAuthorize(PermissionNames.Pages_Supplier_Edit)]
        public async override Task<SupplierDto> UpdateAsync(EditSupplierDto input)
        {
            try
            {
                return await base.UpdateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        protected override IQueryable<Supplier> CreateFilteredQuery(PagedSupplierResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.SupplierCode.Contains(input.Keyword)
                || x.SupplierName.Contains(input.Keyword)
                || x.PhoneNumber.Contains(input.Keyword))
                .WhereIf(input.Status.HasValue, x => x.Status == input.Status);
        }

        public async Task<ListResultDto<SelectDto>> GetSelectListItemAsync()
        {
            try
            {
                var result = Repository.GetAll()
                  .Where(x => x.Status == Common.Status.Active)
                  .Select(x => new SelectDto()
                  {
                      Id = x.Id,
                      Text = x.SupplierName + " - " + x.PhoneNumber
                  })
                  .ToList();

                return new ListResultDto<SelectDto>(ObjectMapper.Map<List<SelectDto>>(result));
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Customer > GetSelectListItemAsync lỗi");
            }
        }
    }
}
