import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientNavbarComponent } from './patient-navbar/patient-navbar.component';
import { IndexComponent } from './index/index.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import {
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule } from '@angular/material';

const routing = RouterModule.forChild([
  {
      path: '', component: PatientsComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'add/:mode/:id', component: AddPatientComponent },
          { path: 'add/:mode', component: AddPatientComponent },
          { path: 'list', component: PatientListComponent },
          { path: 'details/:id', component: PatientDetailsComponent },

          { path: '**', redirectTo: '/patients/index' }
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
    MatButtonModule
  ],
  declarations: [
    PatientsComponent,
    PatientDetailsComponent,
    AddPatientComponent,
    PatientListComponent,
    IndexComponent,
    PatientNavbarComponent
  ]
})
export class PatientsModule { }
