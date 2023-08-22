using Abp.Application.Services;
using demo.Products.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Products
{
    public interface IProductAppService : IAsyncCrudAppService<ProductDto, long, PagedProductResultRequestDto, CreateProductDto, EditProductDto>
    {
    }
}
