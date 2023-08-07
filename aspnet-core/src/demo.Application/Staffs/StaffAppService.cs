using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.UI;
using demo.Category;
using demo.Staffs.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace demo.Staffs
{
    public class StaffAppService : AsyncCrudAppService<Staff, StaffDto, long, PagedStaffResultRequestDto, CreateStaffDto, EditStaffDto>, IStaffAppService
    {
        public StaffAppService(IRepository<Staff, long> repository) : base(repository)
        {
        }

        public override Task<StaffDto> CreateAsync(CreateStaffDto input)
        {
            try
            {
                input.StaffStatus = Common.StaffStatus.Active;
                return base.CreateAsync(input);

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
                .WhereIf(input.StaffStatus.HasValue, x => x.StaffStatus == input.StaffStatus);
        }
    }
}

