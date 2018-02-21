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
  sessionForm: FormGroup;
  session: PSession;
  patient: Patient;
  message = '';
  errMessage= '';

  constructor(
    private builder: FormBuilder,
    private patientService : PatientService,
    private sessionService : PSessionService,
    private activeRoute: ActivatedRoute) { 

      this.session = new PSession();
      // sessionService.getPSessionPage(this.pId, null);
      this.createForm();

  }

  ngOnInit() {
  }

  createForm() {
    this.sessionForm = this.builder.group({
      date: ['', Validators.required ],
      treatments: ['', Validators.required ],
      comments: '',
      sessionFee: [ '', Validators.required ],
    });
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


  // Add patient info into form
  addSession(id){
    this.patient = this.patientService.getPatient(id);
    this.getPatientLastSession(id);
  }

  getPatientLastSession(pId: number){
    this.sessionService.getPatientLastSession(pId)
    .subscribe(
      data => {
        this.session.treatments = data.treatments;
        this.session.sessionFee = data.sessionFee;
      },
      error => console.log('Last session loading error ' + error.status)
    );
  }

  dateChanged(newDate) {
    if(newDate != null){
      newDate = new Date(newDate);
      this.session.date = newDate.getTime();
    }
  }

  saveSession(){
    if(this.sessionForm.valid){
      this.sessionService.savePSession(this.patient.id, this.session)
        .subscribe(
              data => {
                  this.message = 'Session Saved'
              },
              error => {
                this.errMessage = 'Error, Session could not saved' + error.status;
                  console.log('Session saveing operation failed ');
              }
          );
    }
  }

  

}
