using System.Linq;
using AutoMapper;
using demo.Entity;
using demo.Common;

namespace demo.Staffs.Dto
{
    public class StaffMapProfile : Profile
    {
        public StaffMapProfile()
        {
            CreateMap<Staff, StaffDto>().ForMember(dest => dest.StaffStatusName,
                opt => opt.MapFrom(src => src.StaffStatus.GetDescription()));
            CreateMap<CreateStaffDto, Staff>();
            CreateMap<Staff, EditStaffDto>();
            CreateMap<EditStaffDto, Staff>();
        }
    }
}
