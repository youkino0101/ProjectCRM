using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace demo.Extensions
{
    public class GenerateNumber : Entity<int>
    {
        [MaxLength(6)]
        public string Code { get; set; }
        [MaxLength(64)]
        public string MoTa { get; set; }
        public int SoHienTai { get; set; }
        public int DoDaiSo { get; set; }
    }
}
