using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Localization;
using Abp.MultiTenancy;
using demo.Extensions;

namespace demo.EntityFrameworkCore.Seed.Host
{
    public class DefaultGenerateNumberCreator
    {
        public static List<GenerateNumber> InitialGenerateNumber => GetGenerateNumber();

        private static List<GenerateNumber> GetGenerateNumber()
        {
            return new List<GenerateNumber>
            {
                new GenerateNumber(){Code ="P", Description ="Product", CurrentNumber = 0, Digit = 6},
                new GenerateNumber(){Code ="SUP", Description ="Supplier", CurrentNumber = 0, Digit = 6},
            };
        }

        private readonly demoDbContext _context;

        public DefaultGenerateNumberCreator(demoDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateGenerateNumber();
        }

        private void CreateGenerateNumber()
        {
            foreach (var data in InitialGenerateNumber)
            {
                AddGenerateNumberIfNotExists(data);
            }
        }

        private void AddGenerateNumberIfNotExists(GenerateNumber data)
        {
            if (_context.GenerateNumber.IgnoreQueryFilters().Any(l => l.Code == data.Code && l.Description == data.Description))
            {
                return;
            }

            _context.GenerateNumber.Add(data);
            _context.SaveChanges();
        }
    }
}
