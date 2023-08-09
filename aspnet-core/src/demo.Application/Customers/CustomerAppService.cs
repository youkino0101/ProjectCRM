using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Category;
using demo.Customers.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace demo.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, EditCustomerDto>, ICustomerAppService
    {
        public CustomerAppService(IRepository<Customer, long> repository) : base(repository)
        {
        }

        protected override IQueryable<Customer> CreateFilteredQuery(PagedCustomerResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword)
               || x.CompanyName.Contains(input.Keyword)
               || x.Email.Contains(input.Keyword)
               || x.PhoneNumber.Contains(input.Keyword)
               || x.Address.Contains(input.Keyword));
        }

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
    }
}
