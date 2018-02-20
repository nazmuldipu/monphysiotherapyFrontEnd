import { Component, OnInit } from '@angular/core';
import { PSessionService } from '../../../services/session.service';
import { PatientService } from '../../../services/patient.service';
import { PSession } from '../../../models/session.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  arr = Array;
  patient: Patient;
  psessions: PSession[] = [];
  psessionPage: any;
  pId: number;

  constructor(private sessionService: PSessionService,
    private patientService: PatientService) {
    
  }
  
  ngOnInit() {
  }

  // Getting patient informations---------------------------------------------------
  get patients(){
    return this.patientService.getPatients();
  }

  get patientPage(){
    return this.patientService.getPage();
  }

  getPatinetPage(pageNumber: number = null) {
    this.patientService.getPatientPage(pageNumber);
  }
  
  // Getting Patinet Sessions History--------------------------------------------------
  getPSessionsPage(pageNumber: number = null){
    this.sessionService.getPatientSessionPage(this.pId, pageNumber)
    .subscribe(
      data => {
        this.psessions = data.content;
        this.psessionPage = data;
      },
      error =>{
        console.log('Patient session loading error');
      }
    );
  }

  sessionList(id:number, pageNumber: number = null){
    this.pId = id;
    this.sessionService.getPatientSessionPage(id)
    .subscribe(
      data => {
        this.psessions = data.content;
        this.psessionPage = data;
      },
      error =>{
        console.log('Patient session loading error');
      }
    );
  }
}
