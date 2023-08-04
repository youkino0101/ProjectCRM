using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Common
{
    public static class Enum
    {
        public enum StatusProject
        {
            InThePlan, // trong kết hoạch
            InProgress, // đang tiến hành
            Completed, // hoàn thành
            Paused, // tạm dừng
        }
    }
}
