import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RoleComponent } from './role/role.component';
import { ChangePasswordComponent } from './chage-password/change-password.component';
import { MatInputModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

const routing = RouterModule.forChild([
  {
      path: '', component: UsersComponent,
      children: [
          { path: 'list', component: UserListComponent },
          { path: 'add/:mode/:id', component: AddUserComponent },
          { path: 'add/:mode', component: AddUserComponent },
          { path: 'role', component: RoleComponent },
          { path: 'changePassword', component: ChangePasswordComponent },

          { path: '**', redirectTo: '/dashboard/users/list' }
      ]
  },
]);

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    NgbModule,

    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    AddUserComponent,
    RoleComponent,
    ChangePasswordComponent,
  ]
})
export class UsersModule { }
