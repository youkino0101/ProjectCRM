using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace demo.Authorization
{
    public class demoAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));

            context.CreatePermission(PermissionNames.Pages_AuditLogs, L("AuditLogs"));

            context.CreatePermission(PermissionNames.Pages_Staffs, L("Staffs"));
            context.CreatePermission(PermissionNames.Pages_Staff_Create, L("Staff.Create"));
            context.CreatePermission(PermissionNames.Pages_Staff_View, L("Staff.View"));
            context.CreatePermission(PermissionNames.Pages_Staff_Edit, L("Staff.Edit"));

            context.CreatePermission(PermissionNames.Pages_Products, L("Products"));
            context.CreatePermission(PermissionNames.Pages_Product_Create, L("Product.Create"));
            context.CreatePermission(PermissionNames.Pages_Product_View, L("Product.View"));
            context.CreatePermission(PermissionNames.Pages_Product_Edit, L("Product.Edit"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, demoConsts.LocalizationSourceName);
        }
    }
}
