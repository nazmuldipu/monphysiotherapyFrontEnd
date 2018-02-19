import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionComponent } from './sessions.component';
import { IndexComponent } from './index/index.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


const routing = RouterModule.forChild([
  {
      path: '', component: SessionComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'add/:mode/:pId/:id', component: AddSessionComponent },
          { path: 'add/:mode/:pId', component: AddSessionComponent },
          { path: 'list', component: SessionListComponent },

          { path: '**', redirectTo: 'sessions/index' }
      ]
  },
]);

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    // MatCheckboxModule,
    NgbModule
  ],
  declarations: [
    SessionComponent,
    IndexComponent,
    AddSessionComponent,
    SessionListComponent
  ]
})
export class SessionsModule { }
