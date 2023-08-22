using System.Linq;
using AutoMapper;
using Abp.Authorization;
using Abp.Authorization.Roles;
using demo.Authorization.Roles;
using demo.Entity;

namespace demo.Customers.Dto
{
    public class CustomerMapProfile : Profile
    {
        public CustomerMapProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CreateCustomerDto, Customer>();
            CreateMap<Customer, EditCustomerDto>();
            CreateMap<EditCustomerDto, Customer>();
        }
    }
}
