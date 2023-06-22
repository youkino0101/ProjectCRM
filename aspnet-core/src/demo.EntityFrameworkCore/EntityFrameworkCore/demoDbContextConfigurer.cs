using System;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace demo.EntityFrameworkCore
{
    public static class demoDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<demoDbContext> builder, string connectionString)
        {
            var serverVersion = new MySqlServerVersion(new Version(5, 7, 33));
            builder.UseMySql(connectionString, serverVersion);
        }

        public static void Configure(DbContextOptionsBuilder<demoDbContext> builder, DbConnection connection)
        {
            var serverVersion = new MySqlServerVersion(new Version(5, 7, 33));
            builder.UseMySql(connection, serverVersion);
        }
    }
}
