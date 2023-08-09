import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';
import * as AccountApiServiceProxies from './account-service';
import * as ConfigurationApiServiceProxies from './configuration-service';
import * as StaffApiServiceProxies from './staff-service';
import * as RoleApiServiceProxies from './role-service';
import * as SessionApiServiceProxies from './session-service';
import * as TenantApiServiceProxies from './tenant-service';
import * as TokenAuthApiServiceProxies from './tokenAuth-service';
import * as UserApiServiceProxies from './user-service';


@NgModule({
    providers: [
        RoleApiServiceProxies.RoleServiceProxy,
        SessionApiServiceProxies.SessionServiceProxy,
        TenantApiServiceProxies.TenantServiceProxy,
        UserApiServiceProxies.UserServiceProxy,
        TokenAuthApiServiceProxies.TokenAuthServiceProxy,
        AccountApiServiceProxies.AccountServiceProxy,
        ConfigurationApiServiceProxies.ConfigurationServiceProxy,
        StaffApiServiceProxies.StaffServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
