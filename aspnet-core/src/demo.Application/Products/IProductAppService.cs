using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Products.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Products
{
    public interface IProductAppService : IAsyncCrudAppService<ProductDto, long, PagedProductResultRequestDto, CreateProductDto, EditProductDto>
    {
        Task<ListResultDto<ProductDto>> SearchAsync();
    }
}
