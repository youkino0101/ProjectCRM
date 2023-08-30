using Abp.Application.Services;
using demo.Suppliers.Dto;

namespace demo.Suppliers
{
    public interface ISupplierAppService : IAsyncCrudAppService<SupplierDto, long, PagedSupplierResultRequestDto, CreateSupplierDto, EditSupplierDto>
    {
        
    }
}
