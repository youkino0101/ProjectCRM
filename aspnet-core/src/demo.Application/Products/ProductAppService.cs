using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using demo.Products.Dto;
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
using Abp.Application.Services.Dto;
using Abp.Authorization;
using demo.Authorization;
using Microsoft.EntityFrameworkCore;

namespace demo.Products
{
    [AbpAuthorize(PermissionNames.Pages_Products)]
    public class ProductAppService : AsyncCrudAppService<Product, ProductDto, long, PagedProductResultRequestDto, CreateProductDto, EditProductDto>, IProductAppService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductAppService(IRepository<Product, long> repository, IWebHostEnvironment webHostEnvironment) : base(repository)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        [AbpAuthorize(PermissionNames.Pages_Product_View)]
        public override Task<ProductDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }

        [AbpAuthorize(PermissionNames.Pages_Product_Create)]
        public async override Task<ProductDto> CreateAsync([FromForm]CreateProductDto input)
        {
            try
            {
                input.Status = Common.Status.Active;
                input.PathImage = null;
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

                    input.PathImage = imagePath;
                }
                return await base.CreateAsync(input);
            } catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }
        [AbpAuthorize(PermissionNames.Pages_Product_Edit)]
        public async override Task<ProductDto> UpdateAsync([FromForm]EditProductDto input)
        {
            try
            {
                if (input.PathImage.Equals("null"))
                {
                    input.PathImage = null;
                }
                if (input.File != null && input.File.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + input.File.FileName;

                    // Save the file with the new name
                    var imagePath = Path.Combine("images", uniqueFileName);
                    string filePath = Path.Combine(_webHostEnvironment.WebRootPath, imagePath);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await input.File.CopyToAsync(fileStream);
                        File.Delete("wwwroot/" +input.PathImage);
                    }

                    input.PathImage = imagePath;
                }
                return await base.UpdateAsync(input);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Đã xảy ra lỗi, vui lòng thử lại!!!");
            }
        }

        protected override IQueryable<Product> CreateFilteredQuery(PagedProductResultRequestDto input)
        {
            return Repository.GetAll().WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.ProductCode.Contains(input.Keyword)
                || x.ProductName.Contains(input.Keyword)
                || x.Trademark.Contains(input.Keyword))
                .WhereIf(input.Status.HasValue, x => x.Status == input.Status)
                .WhereIf(input.Category.HasValue, x => x.Category == input.Category);
        }
        protected override IQueryable<Product> ApplySorting(IQueryable<Product> query, PagedProductResultRequestDto input)
        {
            return query.OrderByDescending(s => s.Id);
        }

        public async Task<ListResultDto<ProductDto>> SearchAsync()
        {
            var listEntity = await Repository.GetAll()
                .WhereIf(true, x => x.Status == Common.Status.Active).ToListAsync();
            return new ListResultDto<ProductDto>(ObjectMapper.Map<List<ProductDto>>(listEntity));
        }

        public async Task<EditProductDto> GetIdAsync(long id)
        {
            var entity = await Repository.GetAsync(id);
            return ObjectMapper.Map(entity, new EditProductDto());
        }
    }
}
