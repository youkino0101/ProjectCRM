using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Customers.Dto;
using demo.Suppliers.Dto;
using System.Threading.Tasks;

namespace demo.Suppliers
{
    public interface ISupplierAppService : IAsyncCrudAppService<SupplierDto, long, PagedSupplierResultRequestDto, CreateSupplierDto, EditSupplierDto>
    {
        Task<ListResultDto<SelectDto>> GetSelectListItemAsync();
    }
}
