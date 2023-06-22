using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using demo.Authorization.Roles;
using demo.Authorization.Users;
using demo.MultiTenancy;

namespace demo.EntityFrameworkCore
{
    public class demoDbContext : AbpZeroDbContext<Tenant, Role, User, demoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public demoDbContext(DbContextOptions<demoDbContext> options)
            : base(options)
        {
        }
    }
}
