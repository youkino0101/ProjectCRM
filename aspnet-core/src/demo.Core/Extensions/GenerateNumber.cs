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
        public string Description { get; set; }
        public int CurrentNumber { get; set; } // số hiện tại
        public int Digit { get; set; } // bao nhiêu chữ số
    }
}
