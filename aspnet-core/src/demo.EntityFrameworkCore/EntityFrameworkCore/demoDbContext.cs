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
        public DbSet<Attachment> Attachment { set; get; }
        public DbSet<Note> Note { set; get; }
        public DbSet<Project.Project> Project { set; get; }
        public DbSet<Quote> Quote { set; get; }
        public DbSet<QuoteDetail> QuoteDetail { set; get; }
        public DbSet<TaskAssignment> TaskAssignment { set; get; }
        public DbSet<Task> Tasks { set; get; }
        public DbSet<Activity> Activity { set; get; }
        public DbSet<Customer> Customer { set; get; }
        public DbSet<Staff> Staff { set; get; }

        public demoDbContext(DbContextOptions<demoDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Customer>(entity => { entity.HasIndex(p => p.Email); });
            builder.Entity<Staff>(entity => { entity.HasIndex(p => p.StaffCode); });
            builder.Entity<Activity>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Project.Project>(entity => { entity.HasIndex(p => p.CodeProject); });
            builder.Entity<Task>().HasOne(c => c.Project).WithMany(t => t.Tasks).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<TaskAssignment>().HasOne(c => c.Task).WithMany(t => t.TaskAssignments).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Attachment>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Note>(entity => { entity.HasIndex(p => p.Id); });

            builder.Entity<Quote>(entity => { entity.HasIndex(p => p.QuotesCode); });
            builder.Entity<QuoteDetail>().HasOne(c => c.Quote).WithMany(t => t.QuoteDetails).OnDelete(DeleteBehavior.Cascade);

        }
    }
}
