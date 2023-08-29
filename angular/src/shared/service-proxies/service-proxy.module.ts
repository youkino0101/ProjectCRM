import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as AccountApiServiceProxies from './account-service';
import * as ConfigurationApiServiceProxies from './configuration-service';
import * as StaffApiServiceProxies from './staff-service';
import * as RoleApiServiceProxies from './role-service';
import * as SessionApiServiceProxies from './session-service';
import * as TenantApiServiceProxies from './tenant-service';
import * as TokenAuthApiServiceProxies from './tokenAuth-service';
import * as UserApiServiceProxies from './user-service';
import * as AuditLogApiServiceProxies from './audit-log-service';
import * as ProductApiServiceProxies from './product-service';
import * as ExtensionApiServiceProxies from './service-proxies';


@NgModule({
    providers: [
        AccountApiServiceProxies.AccountServiceProxy,
        ConfigurationApiServiceProxies.ConfigurationServiceProxy,
        RoleApiServiceProxies.RoleServiceProxy,
        SessionApiServiceProxies.SessionServiceProxy,
        StaffApiServiceProxies.StaffServiceProxy,
        TenantApiServiceProxies.TenantServiceProxy,
        TokenAuthApiServiceProxies.TokenAuthServiceProxy,
        UserApiServiceProxies.UserServiceProxy,
        AuditLogApiServiceProxies.AuditLogServiceProxy,
        ProductApiServiceProxies.ProductServiceProxy,
        ExtensionApiServiceProxies.ExtensionServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
