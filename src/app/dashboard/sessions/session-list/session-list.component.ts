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
  
  // Getting Sessions informations---------------------------------------------------
  get psessions(): PSession[]{
    return this.sessionService.getSessions();
  }

  get psessionPage(){
    return this.sessionService.getPage();
  }

  getPSessionsPage(pageNumber: number = null){
    console.log(pageNumber);
    this.sessionService.getSessionPage(pageNumber);
  }
}
