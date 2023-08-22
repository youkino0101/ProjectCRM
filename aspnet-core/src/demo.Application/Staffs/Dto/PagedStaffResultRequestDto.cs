using Abp.Application.Services.Dto;
using demo.Common;

namespace demo.Staffs.Dto
{
    public class PagedStaffResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public StaffStatus? StaffStatus { get; set; } = Common.StaffStatus.Active;
    }
}

