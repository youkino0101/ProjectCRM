using AutoMapper;
using demo.Common;
using demo.Entity;

namespace demo.Suppliers.Dto
{
    public class SupplierMapProfile : Profile
    {
        public SupplierMapProfile()
        {
            CreateMap<Supplier, SupplierDto>()
                .ForMember(dest => dest.StatusName,
                opt => opt.MapFrom(src => src.Status.GetDescription())).ReverseMap(); ;
            CreateMap<CreateSupplierDto, Supplier>();
            CreateMap<Supplier, EditSupplierDto>();
            CreateMap<EditSupplierDto, Supplier>();
        }
    }
}
