using Abp.Application.Services;
using demo.Customers.Dto;

namespace demo.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, EditCustomerDto>
    {
    }
}
