using System.Linq;
using AutoMapper;
using Abp.Authorization;
using Abp.Authorization.Roles;
using demo.Authorization.Roles;
using demo.Entity;

namespace demo.Staffs.Dto
{
    public class StaffMapProfile : Profile
    {
        public StaffMapProfile()
        {
            CreateMap<Staff, StaffDto>();
            CreateMap<CreateStaffDto, Staff>();
            CreateMap<Staff, EditStaffDto>();
            CreateMap<EditStaffDto, Staff>();
        }
    }
}
