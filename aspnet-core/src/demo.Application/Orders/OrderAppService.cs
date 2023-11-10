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
using demo.Products;
using demo.Extensions;
using demo.Staffs;
using demo.Common;

namespace demo.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, long, PagedOrderResultRequestDto, CreateOrderDto, EditOrderDto>, IOrderAppService
    {
        IProductAppService _productRepository;
        IExtensionAppService _extensionAppService;
        public OrderAppService(IRepository<Order, long> repository, IProductAppService productRepository, IExtensionAppService extensionAppService, IStaffAppService staffAppService) : base(repository)
        {
            _productRepository = productRepository;
            _extensionAppService = extensionAppService;
        }
        public override Task<OrderDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }

        public async Task<OrderInvoiceDto> GetExtensionAsync(EntityDto<long> input)
        {
            try
            {
                var entity = await Repository.GetAll().Include(o => o.Staff).Include(o => o.Customer).Include(o => o.OrderDetails).ThenInclude(od => od.Product).FirstOrDefaultAsync(a => a.Id == input.Id);
                if (entity == null)
                {
                    throw new UserFriendlyException("Mã hóa đơn không tìm thấy");
                }
                var listOrderDetails = new List<OrderDetailDto>();
                int index = 1;
                if (entity.OrderDetails.Count > 0)
                {
                    foreach (var item in entity.OrderDetails)
                    {
                        listOrderDetails.Add(new OrderDetailDto
                        {
                            Id = item.Id,
                            Amount = item.Amount,
                            Number = index,
                            ProductCode = item.Product.ProductCode,
                            ProductName = item.Product.ProductName,
                            Quantity = item.Quantity,
                            UnitPrice = item.UnitPrice
                        });
                        index++;
                    }
                }
                var result = new OrderInvoiceDto
                {
                    Id = entity.Id,
                    AddressCompany = "233 Trần Phú, Phước Vĩnh, TP.Huế, Huế",
                    AddressCustomer = entity.Customer.Address,
                    CustomerName = entity.Customer.NameCustomer,
                    EmailCompany = "cms.ecommerce@gmail.com",
                    EmailCustomer = entity.Customer.Email,
                    OrderCode = entity.OrderCode,
                    PhoneNumberCompany = "033 538 2112",
                    PhoneNumberCustomer = entity.Customer.PhoneNumber,
                    StaffName = entity.Staff.StaffName,
                    TotalPrice = entity.TotalPrice,
                    Warehouse = "Kho 1",
                    orderDetailDtos = listOrderDetails,
                    CreationTime = entity.CreationTime
                };
                return result;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        public async override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            try
            {
                if (input.listOrderDetail != null && input.listOrderDetail.Count > 0)
                {
                    foreach (var item in input.listOrderDetail)
                    {
                        var product = await _productRepository.GetIdAsync(item.ProductId);
                        if (product.Quantity < item.Quantity)
                        {
                            throw new UserFriendlyException("Số lượng vượt quá hàng tồn kho, vui lòng nhập ít hơn " + product.Quantity + " của sản phẩm " + product.ProductName);
                        }
                        product.Quantity -= item.Quantity;
                        await _productRepository.UpdateAsync(product);
                    }
                }
                input.OrderCode = await _extensionAppService.GetGenerateNumber("HD");
                input.Warehouse = "Kho 1";
                input.StatusOrder = StatusOrder.Completed; 
                return await base.CreateAsync(input);
            }
            catch (Exception ex)
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
        public override async Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            var query = CreateFilteredQuery(input);
            var count = await AsyncQueryableExecuter.CountAsync(query);
            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return new PagedResultDto<OrderDto>(
                count,
                entities.Select(x=> new OrderDto
                {
                    Id = x.Id,
                    OrderCode = x.OrderCode,
                    Warehouse = x.Warehouse,
                    StaffName = x.Staff.StaffName,
                    CustomerName = x.Customer.NameCustomer,
                    StatusOrder = x.StatusOrder.GetDescription(),
                    TotalPrice = x.TotalPrice,
                    CreationTime = x.CreationTime
                }).ToList()
            );
        }
        protected override IQueryable<Order> CreateFilteredQuery(PagedOrderResultRequestDto input)
        {
            return Repository.GetAllIncluding(x=> x.Customer, y=>y.Staff).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.OrderCode.Contains(input.Keyword)
            || x.Customer.NameCustomer.Contains(input.Keyword) || x.Staff.StaffName.Contains(input.Keyword))
                .WhereIf(input.FromDate.HasValue, x => x.CreationTime >= input.FromDate.GetValueOrDefault().Date)
                .WhereIf(input.ToDate.HasValue, x => x.CreationTime < input.ToDate.GetValueOrDefault().Date.AddDays(1))
                .WhereIf(input.StatusOrder.HasValue, x=> x.StatusOrder == input.StatusOrder);
        }
        protected override IQueryable<Order> ApplySorting(IQueryable<Order> query, PagedOrderResultRequestDto input)
        {
            return query.OrderByDescending(s => s.Id);
        }

        public async Task<ListResultDto<ChartAxeDto>> GetChartAxeOrderAsync()
        {
            DateTime currentDate = DateTime.Now;

            // Tạo một danh sách chứa thông kê tháng theo định dạng bạn muốn
            var monthlyStats = new List<ChartAxeDto>();

            for (int i = 0; i < 12; i++)
            {
                // Lấy ngày đầu tháng hiện tại
                DateTime firstDayOfCurrentMonth = new DateTime(currentDate.Year, currentDate.Month, 1);

                // Lấy tháng và năm
                string monthName = currentDate.ToString("MMM");
                int year = currentDate.Year;

                // Truy vấn danh sách các đơn đặt trong tháng này
                var ordersInCurrentMonth = Repository.GetAll()
                    .Where(o => o.CreationTime >= firstDayOfCurrentMonth && o.CreationTime < firstDayOfCurrentMonth.AddMonths(1))
                    .ToList();

                // Số lượng đơn đặt trong tháng này
                int orderCountInCurrentMonth = ordersInCurrentMonth.Count;

                // Tính tổng tiền của các đơn đặt trong tháng này
                float totalAmountInCurrentMonth = ordersInCurrentMonth.Sum(o => (float)o.TotalPrice.GetValueOrDefault());

                // Thêm thông tin tháng vào danh sách
                monthlyStats.Add(new ChartAxeDto
                {
                    Month = monthName,
                    TotalAmount = totalAmountInCurrentMonth,
                    OrderCount = orderCountInCurrentMonth
                });

                // Di chuyển đến tháng trước đó
                currentDate = currentDate.AddMonths(-1);
            }
            monthlyStats.Reverse();
            // Sắp xếp danh sách theo tháng theo thứ tự tăng dần
            return new ListResultDto<ChartAxeDto>(monthlyStats);
        }
    }
}
