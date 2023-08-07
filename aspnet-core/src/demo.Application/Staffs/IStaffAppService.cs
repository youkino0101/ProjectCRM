using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Staffs.Dto;

namespace demo.Staffs
{
    public interface IStaffAppService : IAsyncCrudAppService<StaffDto, long, PagedStaffResultRequestDto, CreateStaffDto, EditStaffDto>
    {
       
    }
}
