using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Customers.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace demo.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, EditCustomerDto>
    {
        Task<ListResultDto<SelectDto>> GetSelectListItemAsync();
    }
}
