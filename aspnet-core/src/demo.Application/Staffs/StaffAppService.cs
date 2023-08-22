using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Common;
using demo.Entity;
using demo.Staffs.Dto;
using demo.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace demo.Staffs
{
    public class StaffAppService : AsyncCrudAppService<Staff, StaffDto, long, PagedStaffResultRequestDto, CreateStaffDto, EditStaffDto>, IStaffAppService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUserAppService _userAppService;

        public StaffAppService(IRepository<Staff, long> repository, IWebHostEnvironment webHostEnvironment, IUserAppService userAppService) : base(repository)
        {
            _webHostEnvironment = webHostEnvironment;
            _userAppService = userAppService;
        }

        public async override Task<StaffDto> CreateAsync(CreateStaffDto input)
        {
            try
            {
                input.StaffStatus = StaffStatus.Active;
                var user = await _userAppService.CreateAsync(
                    new Users.Dto.CreateUserDto()
                    {
                        UserName = input.StaffCode,
                        Name = input.StaffName,
                        Surname = input.StaffCode,
                        EmailAddress = input.Email,
                        IsActive = true ,
                        Password = CommonHelper.PasswordDefault,
                        RoleNames = new string[] { }
                    });

                input.UserId = user.Id;

                return await base.CreateAsync(input);

            } catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        public override Task<StaffDto> GetAsync(EntityDto<long> input)
        {
            try
            {
                return base.GetAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        public async override Task<StaffDto> UpdateAsync(EditStaffDto input)
        {
            try
            {
                var user = await _userAppService.GetAsync(new EntityDto<long>(input.UserId));
                if (user != null)
                {
                    user.Name = input.StaffName;
                    user.EmailAddress = input.Email;
                    user.IsActive = input.StaffStatus == StaffStatus.Active ? true : false;
                    user.RoleNames = input.StaffStatus == StaffStatus.Active ? user.RoleNames : new string[] { };
                    await _userAppService.UpdateAsync(user);
                }

                return await base.UpdateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        protected override IQueryable<Staff> CreateFilteredQuery(PagedStaffResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.StaffName.Contains(input.Keyword)
                || x.Email.Contains(input.Keyword)
                || x.PhoneNumber.Contains(input.Keyword)
                || x.Address.Contains(input.Keyword))
                .WhereIf(input.StaffStatus.HasValue, x => x.StaffStatus == input.StaffStatus).OrderByDescending(s => s.CreationTime);
        }
        public override Task<PagedResultDto<StaffDto>> GetAllAsync(PagedStaffResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }
    }
   
}

