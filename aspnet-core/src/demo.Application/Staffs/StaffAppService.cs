using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Category;
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

        public async override Task<StaffDto> CreateAsync([FromForm]CreateStaffDto input)
        {
            try
            {
                input.StaffStatus = Common.StaffStatus.Active;
                if (input.File != null && input.File.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + input.File.FileName;

                    // Save the file with the new name
                    var imagePath = Path.Combine("images", uniqueFileName);
                    string filePath = Path.Combine(_webHostEnvironment.WebRootPath, imagePath);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await input.File.CopyToAsync(fileStream);
                    }

                    input.Address = imagePath;
                }
                    
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

        public override Task<StaffDto> UpdateAsync(EditStaffDto input)
        {
            try
            {
                return base.UpdateAsync(input);
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
    }
   
}

