using AutoMapper;
using demo.Common;
using demo.Entity;

namespace demo.GoodsReceipts.Dto
{
    public class GoodsReceiptMapProfile : Profile
    {
        public GoodsReceiptMapProfile()
        {
            //CreateMap<GoodsReceipt, GoodsReceiptDto>().ForMember(dest => dest.StatusGoodsReceiptName,
            //    opt => opt.MapFrom(src => src.StatusGoodsReceipt.GetDescription())).ReverseMap();
            CreateMap<GoodsReceipt, GoodsReceiptDto>();
            CreateMap<GoodsReceipt, GoodsReceiptInvoiceDto>();
            CreateMap<CreateGoodsReceiptDto, GoodsReceipt>()
                .ForMember(dest => dest.GoodsReceiptDetails, opt=> opt.MapFrom(src => src.listGoodsReceiptDetail)).ReverseMap();
            CreateMap<CreateGoodsReceiptDetailDto, GoodsReceiptDetail>(); 
            CreateMap<GoodsReceipt, EditGoodsReceiptDto>();
            CreateMap<EditGoodsReceiptDto, GoodsReceipt>();
        }
    }
}
