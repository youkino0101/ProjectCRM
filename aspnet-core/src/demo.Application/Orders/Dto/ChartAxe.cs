using Abp.Application.Services.Dto;
using demo.Common;
using System;
using System.Collections.Generic;

namespace demo.Orders.Dto
{
    public class ChartAxeDto
    {
        public string Month { get; set; }
        public int OrderCount { get; set; }
        public float TotalAmount { get; set; }
    }
}