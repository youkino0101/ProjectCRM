using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.DashBoard.Dto;
using demo.Orders.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.DashBoard
{
    public interface IDashboardAppService : IApplicationService
    {
        Task<DashBoardDto> GetInfomationOrderOfDashBoardAsync();
    }
}
