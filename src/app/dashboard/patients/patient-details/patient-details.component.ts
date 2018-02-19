import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { PSessionService } from '../../../services/session.service';
import { PSession } from '../../../models/session.model';
import { PatientLedgerService } from '../../../services/patient-ledger.service';
import { PatientLedger } from '../../../models/patient-ledger.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  arr = Array;
  pId: number;

  sessions: PSession[]=[];
  sessionPage: any;

  pLedgers: PatientLedger[] =[];
  pLedgerPage: any;

  constructor(
    private patientService : PatientService,
    private patientLedgerService: PatientLedgerService,
    private sessionService : PSessionService,
    private activeRoute: ActivatedRoute) { 

    this.pId = activeRoute.snapshot.params['id'];
    this.getPatientSessions();
    this.getPatientLedger();
  }

  ngOnInit() {
  }

  get patient(): Patient{
    return this.patientService.getPatient(this.pId);
  }

  getPatientSessions(pageNumber: number = null){
    this.sessionService.getPatientSessionPage(this.pId, pageNumber)
      .subscribe(
        data => {
          this.sessions = data.content;
          this.sessionPage = data;
        }
      )
  }

  getPatientLedger(pageNumber: number = null){
    this.patientLedgerService.getPatientLedgerPage(this.pId, pageNumber)
      .subscribe(
        data => {
          this.pLedgers = data.content;
          this.pLedgerPage = data;
        }
      )
  }
}
