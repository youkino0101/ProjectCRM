using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using demo.GoodsReceipts.Dto;
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
using demo.Products.Dto;

namespace demo.GoodsReceipts
{
    [AbpAuthorize(PermissionNames.Pages_GoodsReceipts)]
    public class GoodsReceiptAppService : AsyncCrudAppService<GoodsReceipt, GoodsReceiptDto, long, PagedGoodsReceiptResultRequestDto, CreateGoodsReceiptDto, EditGoodsReceiptDto>, IGoodsReceiptAppService
    {
        IProductAppService _productRepository;
        IExtensionAppService _extensionAppService;
        public GoodsReceiptAppService(IRepository<GoodsReceipt, long> repository, IProductAppService productRepository, IExtensionAppService extensionAppService, IStaffAppService staffAppService) : base(repository)
        {
            _productRepository = productRepository;
            _extensionAppService = extensionAppService;
        }
        [AbpAuthorize(PermissionNames.Pages_GoodsReceipts_View)]
        public override Task<GoodsReceiptDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }
        //[AbpAuthorize(PermissionNames.Pages_GoodsReceipts_View)]
        //public async Task<GoodsReceiptInvoiceDto> GetExtensionAsync(EntityDto<long> input)
        //{
        //    try
        //    {
        //        var entity = await Repository.GetAll().Include(o => o.Staff).Include(o => o.Supplier).Include(o => o.GoodsReceiptDetails).ThenInclude(od => od.Product).FirstOrDefaultAsync(a => a.Id == input.Id);
        //        if (entity == null)
        //        {
        //            throw new UserFriendlyException("Mã hóa đơn không tìm thấy");
        //        }
        //        var listGoodsReceiptDetails = new List<GoodsReceiptDetailDto>();
        //        int index = 1;
        //        if (entity.GoodsReceiptDetails.Count > 0)
        //        {
        //            foreach (var item in entity.GoodsReceiptDetails)
        //            {
        //                listGoodsReceiptDetails.Add(new GoodsReceiptDetailDto
        //                {
        //                    Id = item.Id,
        //                    Amount = item.Amount,
        //                    Number = index,
        //                    ProductCode = item.Product.ProductCode,
        //                    ProductName = item.Product.ProductName,
        //                    Quantity = item.ActuallyImported,
        //                    UnitPrice = item.UnitPrice
        //                });
        //                index++;
        //            }
        //        }
        //        var result = new GoodsReceiptInvoiceDto
        //        {
        //            Id = entity.Id,
        //            AddressCompany = "233 Trần Phú, Phước Vĩnh, TP.Huế, Huế",
        //            AddressCustomer = entity.Customer.Address,
        //            CustomerName = entity.Customer.NameCustomer,
        //            EmailCompany = "cms.ecommerce@gmail.com",
        //            EmailCustomer = entity.Customer.Email,
        //            GoodsReceiptCode = entity.GoodsReceiptCode,
        //            PhoneNumberCompany = "033 538 2112",
        //            PhoneNumberCustomer = entity.Customer.PhoneNumber,
        //            StaffName = entity.Staff.StaffName,
        //            TotalPrice = entity.TotalPrice,
        //            Warehouse = "Kho 1",
        //            orderDetailDtos = listGoodsReceiptDetails,
        //            CreationTime = entity.CreationTime
        //        };
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
        //    }
        //}
        [AbpAuthorize(PermissionNames.Pages_GoodsReceipts_Create)]
        public async override Task<GoodsReceiptDto> CreateAsync(CreateGoodsReceiptDto input)
        {
            try
            {
                if (input.listGoodsReceiptDetail != null && input.listGoodsReceiptDetail.Count > 0)
                {
                    foreach (var item in input.listGoodsReceiptDetail)
                    {
                        var product = await _productRepository.GetIdAsync(item.ProductId);
                        product.Quantity += item.ActuallyImported;
                        await _productRepository.UpdateAsync(product);
                    }
                }
                input.GoodsReceiptCode = await _extensionAppService.GetGenerateNumber("NH");
                input.WareHouse = "Kho 1";
                input.Status = Status.Orther; 
                return await base.CreateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        public async override Task<GoodsReceiptDto> UpdateAsync(EditGoodsReceiptDto input)
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
        public override async Task<PagedResultDto<GoodsReceiptDto>> GetAllAsync(PagedGoodsReceiptResultRequestDto input)
        {
            var query = CreateFilteredQuery(input);
            var count = await AsyncQueryableExecuter.CountAsync(query);
            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return new PagedResultDto<GoodsReceiptDto>(
                count,
                entities.Select(x=> new GoodsReceiptDto
                {
                    Id = x.Id,
                    GoodsReceiptCode = x.GoodsReceiptCode,
                    WareHouse = x.WareHouse,
                    StaffName = x.Staff.StaffName,
                    SupplierName = x.Supplier.SupplierName,
                    Status = x.Status.GetDescription(),
                    TotalPrice = x.TotalPrice,
                    CreationTime = x.CreationTime
                }).ToList()
            );
        }
        protected override IQueryable<GoodsReceipt> CreateFilteredQuery(PagedGoodsReceiptResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Supplier, y => y.Staff).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.GoodsReceiptCode.Contains(input.Keyword)
            || x.Supplier.SupplierName.Contains(input.Keyword) || x.Staff.StaffName.Contains(input.Keyword))
                .WhereIf(input.FromDate.HasValue, x => x.CreationTime >= input.FromDate.GetValueOrDefault().Date)
                .WhereIf(input.ToDate.HasValue, x => x.CreationTime < input.ToDate.GetValueOrDefault().Date.AddDays(1));
        }
        protected override IQueryable<GoodsReceipt> ApplySorting(IQueryable<GoodsReceipt> query, PagedGoodsReceiptResultRequestDto input)
        {
            return query.OrderByDescending(s => s.Id);
        }


    }
}
