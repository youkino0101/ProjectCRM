using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.DashBoard.Dto
{
    public class DashBoardDto
    {
        public int TotalOrder { get; set; } // Tổng đơn trong ngày
        public float TotalRevenue { get; set; } // Doanh thu trong ngày
        public int TotalProductSold { get; set; } // sản phẩm bán trong ngày
        public string MostSoldProduct { get; set; } // tên sản phẩm bán chạy nhất trong ngày

        public int TotalProductsInStock { get; set; } // Tổng số lượng sản phẩm trong kho
        public float TotalProductsSold { get; set; } // Tổng số lượng sản phẩm đã bán được
        public int ProductsBelowMinimum { get; set; } // Số lượng sản phẩm xuống mức tối thiểu
        public string MostSoldProductInfo { get; set; } // Sản phẩm được bán nhiều nhất trong kho
    }
}
