using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using demo.EntityFrameworkCore;
using demo.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace demo.Web.Tests
{
    [DependsOn(
        typeof(demoWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class demoWebTestModule : AbpModule
    {
        public demoWebTestModule(demoEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(demoWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(demoWebMvcModule).Assembly);
        }
    }
}