import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { StaffsComponent } from './staffs/staffs.component';
import { AuditLogsComponent } from './auditlog/auditlogs.component';
import { ProductsComponent } from './product/products.component';
import { SupplierComponent } from './suppliers/suppliers.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'staffs', component: StaffsComponent, canActivate: [AppRouteGuard], data: { permission: 'Pages.Users' }, },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'audit-logs', component: AuditLogsComponent, canActivate: [AppRouteGuard], data: { permission: 'Pages.AuditLogs' } },
                    { path: 'products', component: ProductsComponent,  data: {permission: 'Pages.Products'}, canActivate: [AppRouteGuard] },
                    { path: 'suppliers', component: SupplierComponent, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
