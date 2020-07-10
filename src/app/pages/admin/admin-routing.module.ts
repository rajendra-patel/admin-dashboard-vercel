import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListusersComponent } from './dashboard/listusers/listusers.component';
import { EditusersComponent } from './dashboard/editusers/editusers.component';
import { ListcompaniesComponent } from './dashboard/listcompanies/listcompanies.component';
import { EditcompaniesComponent } from './dashboard/editcompanies/editcompanies.component'
import { ListcouponsComponent } from './dashboard/listcoupons/listcoupons.component';
import { EditcouponsComponent } from './dashboard/editcoupons/editcoupons.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component:  ListusersComponent },
      { path: 'editusers', component: EditusersComponent },
      { path: 'companies', component: ListcompaniesComponent },
      { path: 'editcompanies', component: EditcompaniesComponent },
      { path: 'coupons', component: ListcouponsComponent },
      { path: 'editcoupons', component: EditcouponsComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
