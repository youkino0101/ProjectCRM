using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using demo.Authorization.Roles;
using demo.Authorization.Users;
using demo.MultiTenancy;
using demo.Project;
using demo.Category;

namespace demo.EntityFrameworkCore
{
    public class demoDbContext : AbpZeroDbContext<Tenant, Role, User, demoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Attachments> Attachment { set; get; }
        public DbSet<Notes> Note { set; get; }
        public DbSet<Projects> Project { set; get; }
        public DbSet<Quotes> Quote { set; get; }
        public DbSet<QuoteDetails> QuoteDetail { set; get; }
        public DbSet<TaskAssignments> TaskAssignment { set; get; }
        public DbSet<Tasks> Tasks { set; get; }
        public DbSet<Activities> Activity { set; get; }
        public DbSet<Customers> Customer { set; get; }
        public DbSet<Staffs> Staff { set; get; }

        public demoDbContext(DbContextOptions<demoDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Customers>(entity => { entity.HasIndex(p => p.Email); });
            builder.Entity<Staffs>(entity => { entity.HasIndex(p => p.StaffCode); });
            builder.Entity<Activities>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Projects>(entity => { entity.HasIndex(p => p.CodeProject); });
            builder.Entity<Tasks>().HasOne(c => c.Project).WithMany(t => t.Tasks).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<TaskAssignments>().HasOne(c => c.Task).WithMany(t => t.TaskAssignments).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Attachments>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Notes>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Quotes>(entity => { entity.HasIndex(p => p.QuotesCode); });
            builder.Entity<QuoteDetails>().HasOne(c => c.Quote).WithMany(t => t.QuoteDetails).OnDelete(DeleteBehavior.Cascade);

        }
    }
}
