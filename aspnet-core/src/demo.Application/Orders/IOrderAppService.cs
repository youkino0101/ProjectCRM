using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Orders.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService<OrderDto, long, PagedOrderResultRequestDto, CreateOrderDto, EditOrderDto>
    {
        Task<OrderInvoiceDto> GetExtensionAsync(EntityDto<long> input);
    }
}
