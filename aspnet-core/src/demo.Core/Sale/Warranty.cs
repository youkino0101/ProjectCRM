using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Sale
{
    // Bảo hành và hỗ trợ:
    public class Warranty
    {
        public int OrderId { get; set; }
        public string WarrantyRequest { get; set; }
        public List<string> RepairHistory { get; set; }
    }
}
