using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using demo.Authorization.Roles;
using demo.Authorization.Users;
using demo.MultiTenancy;
using demo.Extensions;
using demo.Entity;

namespace demo.EntityFrameworkCore
{
    public class demoDbContext : AbpZeroDbContext<Tenant, Role, User, demoDbContext>
    {
        /* Define a DbSet for each entity of the application */
       
        public DbSet<Customer> Customer { set; get; }
        public DbSet<Staff> Staff { set; get; }
        public DbSet<Supplier> Supplier {  set; get; }
        public DbSet<Product> Product { set; get; }
        public DbSet<Order> Order { set; get; }
        public DbSet<OrderDetail> OrderDetail { set; get; }
        public DbSet<GoodsReceipt> GoodsReceipt { set; get; }
        public DbSet<GoodsReceiptDetail> GoodsReceiptDetail { set; get; }
        // Extension
        public DbSet<GenerateNumber> GenerateNumber { set; get; }

        public demoDbContext(DbContextOptions<demoDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Customer>(entity => { entity.HasIndex(p => p.Email).IsUnique(); });
            builder.Entity<Staff>(entity => { entity.HasIndex(p => p.StaffCode); });
            builder.Entity<GenerateNumber>(entity => { entity.HasIndex(p => p.Code); });
            builder.Entity<Supplier>(entity => { entity.HasIndex(p => p.SupplierCode); });
            builder.Entity<Product>(entity => { entity.HasIndex(p => p.ProductCode); });
            builder.Entity<Order>().HasOne(c => c.Customer).WithMany(o => o.Orders).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<OrderDetail>().HasOne(o => o.Order).WithMany(od => od.OrderDetails).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<GoodsReceipt>().HasOne(s => s.Supplier).WithMany(o => o.GoodsReceipts).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<GoodsReceiptDetail>().HasOne(o => o.GoodsReceipt).WithMany(od => od.GoodsReceiptDetails).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
