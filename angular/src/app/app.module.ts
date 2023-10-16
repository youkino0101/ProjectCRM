import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
// staffs
import { StaffsComponent } from '@app/staffs/staffs.component';
import { CreateStaffDialogComponent } from './staffs/create-staff/create-staff-dialog.component';
import { EditStaffDialogComponent } from './staffs/edit-staff/edit-staff-dialog.component';
// auditlogs
import { AuditLogsComponent } from './auditlog/auditlogs.component';
import { ViewAuditLogDialogComponent } from './auditlog/view-log/view-log-dialog.component';
// product
import { ProductsComponent } from '@app/product/products.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { ViewProductDialogComponent } from './product/view-product/view-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
// suppliers
import { SupplierComponent } from '@app/suppliers/suppliers.component';
import { CreateSupplierDialogComponent } from './suppliers/create-supplier/create-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './suppliers/view-supplier/view-supplier-dialog.component';
import { EditSupplierDialogComponent } from './suppliers/edit-supplier/edit-supplier-dialog.component';
// // customers
import { CustomerComponent } from '@app/customers/customers.component';
import { CreateCustomerDialogComponent } from './customers/create-customer/create-customer-dialog.component';
import { ViewCustomerDialogComponent } from './customers/view-customer/view-customer-dialog.component';
import { EditCustomerDialogComponent } from './customers/edit-customer/edit-customer-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // staffs
        StaffsComponent,
        CreateStaffDialogComponent,
        EditStaffDialogComponent,
        // auditlogs
        AuditLogsComponent,
        ViewAuditLogDialogComponent,
        // product
        ProductsComponent,
        CreateProductDialogComponent,
        ViewProductDialogComponent,
        EditProductDialogComponent,
        // suppliers
        SupplierComponent,
        CreateSupplierDialogComponent,
        ViewSupplierDialogComponent,
        EditSupplierDialogComponent,
        // customers
        CustomerComponent,
        CreateCustomerDialogComponent,
        ViewCustomerDialogComponent,
        EditCustomerDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: []
})
export class AppModule {}
