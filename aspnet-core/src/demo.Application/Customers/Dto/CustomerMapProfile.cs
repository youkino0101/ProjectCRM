using System.Linq;
using AutoMapper;
using Abp.Authorization;
using Abp.Authorization.Roles;
using demo.Authorization.Roles;
using demo.Entity;
using demo.Common;

namespace demo.Customers.Dto
{
    public class CustomerMapProfile : Profile
    {
        public CustomerMapProfile()
        {
            CreateMap<Customer, CustomerDto>().ForMember(dest => dest.StatusName,
                opt => opt.MapFrom(src => src.Status.GetDescription())).ReverseMap(); 
            CreateMap<CreateCustomerDto, Customer>();
            CreateMap<Customer, EditCustomerDto>();
            CreateMap<EditCustomerDto, Customer>();
        }
    }
}
