using Abp.Application.Services;
using Abp.Domain.Repositories;
using demo.Entity;
using demo.Products.Dto;
using demo.Users;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Abp.UI;

namespace demo.Products
{
    public class ProductAppService : AsyncCrudAppService<Product, ProductDto, long, PagedProductResultRequestDto, CreateProductDto, EditProductDto>, IProductAppService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductAppService(IRepository<Product, long> repository, IWebHostEnvironment webHostEnvironment) : base(repository)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async override Task<ProductDto> CreateAsync([FromForm]CreateProductDto input)
        {
            try
            {
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

        public async override Task<ProductDto> UpdateAsync([FromForm]EditProductDto input)
        {
            try
            {
                if (input.File != null && input.File.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + input.File.FileName;

                    // Save the file with the new name
                    var imagePath = Path.Combine("images", uniqueFileName);
                    string filePath = Path.Combine(_webHostEnvironment.WebRootPath, imagePath);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await input.File.CopyToAsync(fileStream);
                        File.Delete(input.PathImage);
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
    }
}
