using Abp.Application.Services;
using Abp.Application.Services.Dto;
using demo.Customers.Dto;
using demo.GoodsReceipts.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.GoodsReceipts
{
    public interface IGoodsReceiptAppService : IAsyncCrudAppService<GoodsReceiptDto, long, PagedGoodsReceiptResultRequestDto, CreateGoodsReceiptDto, EditGoodsReceiptDto>
    {
        
    }
}
