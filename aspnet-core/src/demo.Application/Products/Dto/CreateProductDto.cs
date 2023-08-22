using demo.Common;
using Microsoft.AspNetCore.Http;

namespace demo.Products.Dto
{
    public class CreateProductDto
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public IFormFile? File { get; set; }
        public string? PathImage { get; set; }
        public ulong Quantity { get; set; }
        public ulong Price { get; set; }
        public string? Description { get; set; }
        public Category Category { get; set; }
        public string Trademark { get; set; }
        public Status Status { get; set; }
    }
}
