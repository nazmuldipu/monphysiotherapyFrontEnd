import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PSession } from '../../../models/session.model';
import { Patient } from '../../../models/patient.model';
import { PSessionService } from '../../../services/session.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
  arr = Array;
  pId: number;
  sessionForm: FormGroup;
  session: PSession;
  
  // patient: Patient
  sessions: PSession[];
  sessionPage: any;

  constructor(
    private builder: FormBuilder,
    private patientService : PatientService,
    private sessionService : PSessionService,
    private activeRoute: ActivatedRoute) { 

      this.pId = activeRoute.snapshot.params['pId'];
      this.session = new PSession();
      // sessionService.getPSessionPage(this.pId, null);
      this.createForm();
      this.getPatientSessions();
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
          this.getLastSession();
        }
      )
  }

  createForm() {
    this.sessionForm = this.builder.group({
      date: ['', Validators.required ],
      treatments: ['', Validators.required ],
      comments: '',
      sessionFee: [ '', Validators.required ],
    });
  }

  getLastSession(){
    if(this.sessions.length > 0){
      const lastSession = this.sessions[this.sessions.length -1 ];
      // this.session.date = new Date();
      this.session.treatments = lastSession.treatments;
      this.session.sessionFee = lastSession.sessionFee;
    }
  }

  dateChanged(newDate) {
    if(newDate != null){
      newDate = new Date(newDate);
      this.session.date = newDate.getTime();
    }
  }

  saveSession(){
    if(this.sessionForm.valid){
      this.sessionService.savePSession(this.pId, this.session)
        .subscribe(
              data => {
                  this.sessions.push(data);
              },
              error => {
                  console.log('Session saveing operation failed ');
              }
          );
    }
  }

}
