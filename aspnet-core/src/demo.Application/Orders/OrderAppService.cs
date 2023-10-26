using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using demo.Orders.Dto;
using demo.Users;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Abp.UI;
using System.Linq;
using Abp.Extensions;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using demo.Authorization;
using Microsoft.EntityFrameworkCore;

namespace demo.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, long, PagedOrderResultRequestDto, CreateOrderDto, EditOrderDto>, IOrderAppService
    {
        public OrderAppService(IRepository<Order, long> repository) : base(repository)
        {
        }
        public override Task<OrderDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }

        public async override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            try
            {
                return await base.CreateAsync(input);
            } catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        public async override Task<OrderDto> UpdateAsync(EditOrderDto input)
        {
            try
            {
                
                return await base.UpdateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        protected override IQueryable<Order> CreateFilteredQuery(PagedOrderResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.OrderCode.Contains(input.Keyword))
                .WhereIf(input.Status.HasValue, x => x.StatusOrder == input.Status);
        }
        protected override IQueryable<Order> ApplySorting(IQueryable<Order> query, PagedOrderResultRequestDto input)
        {
            return query.OrderByDescending(s => s.Id);
        }

    }
}
