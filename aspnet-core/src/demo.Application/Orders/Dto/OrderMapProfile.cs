using AutoMapper;
using demo.Common;
using demo.Entity;

namespace demo.Orders.Dto
{
    public class OrderMapProfile : Profile
    {
        public OrderMapProfile()
        {
            CreateMap<Order, OrderDto>().ForMember(dest => dest.StatusOrderName,
                opt => opt.MapFrom(src => src.StatusOrder.GetDescription())).ReverseMap();
            CreateMap<CreateOrderDto, Order>();
            CreateMap<Order, EditOrderDto>();
            CreateMap<EditOrderDto, Order>();
        }
    }
}
