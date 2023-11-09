using AutoMapper;
using demo.Common;
using demo.Entity;

namespace demo.Orders.Dto
{
    public class OrderMapProfile : Profile
    {
        public OrderMapProfile()
        {
            //CreateMap<Order, OrderDto>().ForMember(dest => dest.StatusOrderName,
            //    opt => opt.MapFrom(src => src.StatusOrder.GetDescription())).ReverseMap();
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderInvoiceDto>();
            CreateMap<CreateOrderDto, Order>()
                .ForMember(dest => dest.OrderDetails, opt=> opt.MapFrom(src => src.listOrderDetail)).ReverseMap();
            CreateMap<CreateOrderDetailDto, OrderDetail>(); 
            CreateMap<Order, EditOrderDto>();
            CreateMap<EditOrderDto, Order>();
        }
    }
}
