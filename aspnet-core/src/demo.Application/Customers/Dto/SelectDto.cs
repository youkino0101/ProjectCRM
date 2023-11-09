using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Customers.Dto
{
    public class SelectDto : EntityDto<long>
    {
       public string Text { get; set; }
    }
}
