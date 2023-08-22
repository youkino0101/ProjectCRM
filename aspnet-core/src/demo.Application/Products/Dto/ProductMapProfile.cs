using System.Linq;
using AutoMapper;
using Abp.Authorization;
using Abp.Authorization.Roles;
using demo.Authorization.Roles;
using demo.Entity;

namespace demo.Products.Dto
{
    public class ProductMapProfile : Profile
    {
        public ProductMapProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();
            CreateMap<Product, EditProductDto>();
            CreateMap<EditProductDto, Product>();
        }
    }
}
