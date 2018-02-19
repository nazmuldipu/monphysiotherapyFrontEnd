import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MatIconModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardIndexComponent } from './index/index.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';



const routing = RouterModule.forChild([
  {
      path: '', component: DashboardComponent,
      children: [
          { path: 'index', component: DashboardIndexComponent },
          { path: 'employees', loadChildren: 'app/dashboard/employees/employees.module#EmployeesModule' },
          { path: 'accountings', loadChildren: 'app/dashboard/accountings/accountings.module#AccountingsModule' },
          { path: 'patients', loadChildren: 'app/dashboard/patients/patients.module#PatientsModule'},
          { path: 'sessions', loadChildren: 'app/dashboard/sessions/sessions.module#SessionsModule'},
          { path: 'users', loadChildren: 'app/dashboard/users/users.module#UsersModule'},

          { path: '**', redirectTo: '/dashboard/index' }
      ]
  },
]);

@NgModule({
  imports: [
    routing,
    RouterModule,
    CommonModule,
    FormsModule,
    NgbModule,

    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SideNavbarComponent,
    DashboardIndexComponent
  ]
})
export class DashboardModule { }
