using AutoMapper;
using demo.Common;
using demo.Entity;


namespace demo.Products.Dto
{
    public class ProductMapProfile : Profile
    {
        public ProductMapProfile()
        {
            CreateMap<Product, ProductDto>().ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category.GetDescription()))
                .ForMember(dest => dest.StatusName,
                opt => opt.MapFrom(src => src.Status.GetDescription())).ReverseMap(); ;
            CreateMap<CreateProductDto, Product>();
            CreateMap<Product, EditProductDto>();
            CreateMap<EditProductDto, Product>();
        }
    }
}
