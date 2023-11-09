using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Authorization;
using demo.Customers.Dto;
using demo.Entity;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo.Customers
{
    [AbpAuthorize(PermissionNames.Pages_Customers)]
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, EditCustomerDto>, ICustomerAppService
    {
        public CustomerAppService(IRepository<Customer, long> repository) : base(repository)
        {
        }

        protected override IQueryable<Customer> CreateFilteredQuery(PagedCustomerResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.NameCustomer.Contains(input.Keyword)
               || x.CodeCustomer.Contains(input.Keyword)
               || x.Email.Contains(input.Keyword)
               || x.PhoneNumber.Contains(input.Keyword)
               || x.Address.Contains(input.Keyword))
                .WhereIf(input.Status.HasValue, x => x.Status == input.Status); 
        }
        [AbpAuthorize(PermissionNames.Pages_Customer_Create)]
        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            try
            {
               return base.CreateAsync(input);
            } catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }
        [AbpAuthorize(PermissionNames.Pages_Customer_View)]
        public override Task<CustomerDto> GetAsync(EntityDto<long> input)
        {
            try
            {
                return base.GetAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }
        [AbpAuthorize(PermissionNames.Pages_Customer_Edit)]
        public override Task<CustomerDto> UpdateAsync(EditCustomerDto input)
        {
            try
            {
                return base.UpdateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
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
                      Text = x.NameCustomer + " - " + x.PhoneNumber
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

