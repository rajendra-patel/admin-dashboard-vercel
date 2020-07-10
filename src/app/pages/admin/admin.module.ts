import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ListusersComponent } from './dashboard/listusers/listusers.component';
import { EditusersComponent } from './dashboard/editusers/editusers.component';
import { ButtonrendererComponent } from './dashboard/buttonrenderer/buttonrenderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { ListcompaniesComponent } from './dashboard/listcompanies/listcompanies.component';
import { EditcompaniesComponent } from './dashboard/editcompanies/editcompanies.component';
import { ListcouponsComponent } from './dashboard/listcoupons/listcoupons.component';
import { EditcouponsComponent } from './dashboard/editcoupons/editcoupons.component';
import { AddUserComponent } from './dashboard/add-user/add-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCouponComponent } from './dashboard/add-coupon/add-coupon.component';
import { AddCompanyComponent } from './dashboard/add-company/add-company.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, DashboardComponent, HeaderComponent, ListusersComponent, EditusersComponent, ButtonrendererComponent, ListcompaniesComponent, EditcompaniesComponent, ListcouponsComponent, EditcouponsComponent, AddUserComponent, AddCouponComponent, AddCompanyComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents([ButtonrendererComponent])
  ]
})
export class AdminModule { }
