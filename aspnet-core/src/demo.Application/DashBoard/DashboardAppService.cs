using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using demo.Products;
using demo.Extensions;
using demo.Staffs;
using System.Threading.Tasks;
using demo.DashBoard.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using Abp.UI;
using System.Collections.Generic;
using System.Linq;
using demo.Orders.Dto;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace demo.DashBoard
{
    public class DashboardAppService : IApplicationService, IDashboardAppService
    {
        private IRepository<Order, long> _orderRepository;
        private IRepository<Product, long> _productRepository;
        private IRepository<OrderDetail, long> _orderDetailRepository;
        public DashboardAppService(IRepository<Order, long> orderRepository, IRepository<Product, long> productRepository, IRepository<OrderDetail, long> orderDetailRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<DashBoardDto> GetInfomationOrderOfDashBoardAsync()
        {
            var today = DateTime.Today;
            var dashboardDto = new DashBoardDto();

            var query = await _orderRepository.GetAllIncluding(x => x.OrderDetails)
                .Where(o => o.CreationTime.Date == today && o.StatusOrder == Common.StatusOrder.Completed)
                .ToListAsync();

            var mostSoldProductToday = query.SelectMany(o => o.OrderDetails)
                .GroupBy(od => od.ProductId)
                .OrderByDescending(g => g.Sum(od => (int)od.Quantity))
                .FirstOrDefault();

            dashboardDto.MostSoldProduct = mostSoldProductToday != null
                ? $"{mostSoldProductToday.Sum(od => (int)od.Quantity)}({(await _productRepository.FirstOrDefaultAsync(p => p.Id == mostSoldProductToday.Key))?.ProductName})"
                : "Notyet";

            dashboardDto.TotalOrder = await _orderRepository.CountAsync(o => o.CreationTime.Date == today);
            dashboardDto.TotalRevenue = query.Sum(o => (int)o.TotalPrice.GetValueOrDefault());
            dashboardDto.TotalProductSold = query.SelectMany(o => o.OrderDetails).Sum(od => (int)od.Quantity);
            dashboardDto.TotalProductsInStock = (await _productRepository.GetAll().ToListAsync()).Sum(p => (int)p.Quantity);
            dashboardDto.TotalProductsSold = (await _orderDetailRepository.GetAll().ToListAsync()).Sum(od => (int)od.Quantity);

            ulong minimumStockLevel = 15;
            dashboardDto.ProductsBelowMinimum = (await _productRepository.GetAll().Where(p => p.Quantity < minimumStockLevel).CountAsync());

            var mostSoldProduct = _orderDetailRepository.GetAll()
                .GroupBy(od => od.ProductId)
                .AsEnumerable()
                .OrderByDescending(g => g.Sum(od => (int)od.Quantity))
                .FirstOrDefault();

            dashboardDto.MostSoldProductInfo = mostSoldProduct != null
                ? $"{mostSoldProduct.Sum(od => (int)od.Quantity)}({(await _productRepository.FirstOrDefaultAsync(p => p.Id == mostSoldProduct.Key))?.ProductName})"
                : "Notyet";

            return dashboardDto;
        }


    }

}
