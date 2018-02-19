import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { IndexComponent } from './index/index.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';

const routing = RouterModule.forChild([
  {
      path: '', component: EmployeeComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'add/:mode/:id', component: AddEmployeeComponent },
          { path: 'add/:mode', component: AddEmployeeComponent },
          { path: 'list', component: EmployeeListComponent },

          { path: '**', redirectTo: '/employees/index' }
      ]
  },
]);

@NgModule({
  imports: [
    routing,
    RouterModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    EmployeeComponent,
    AddEmployeeComponent,
    IndexComponent,
    EmployeeListComponent,
    EmployeeNavbarComponent
  ]
})
export class EmployeesModule { }
