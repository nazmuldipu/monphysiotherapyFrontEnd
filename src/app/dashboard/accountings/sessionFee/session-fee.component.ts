import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { PatientLedger } from '../../../models/patient-ledger.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient } from '../../../models/patient.model';
import { AccountingService } from '../../../services/accounting.service';

@Component({
  selector: 'app-accouting-session-fee',
  templateUrl: './session-fee.component.html',
  styleUrls: ['./session-fee.component.scss']
})
export class SessionFeeComponent implements OnInit {
  arr = Array;
  message= '';
  errMessage = '';
  pId: number;
  pledgerForm: FormGroup;
  pledger: PatientLedger;


  constructor(
    private accountingService: AccountingService,
    private builder: FormBuilder,
    private patientService: PatientService) {
      this.pledger = new PatientLedger();
      this.pledger.patient = new Patient();
      this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.pledgerForm = this.builder.group({
      date: ['', Validators.required ],
      name: '',
      explanation: ['', Validators.required ],
      credit: ['', Validators.required ],
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

  // trigger function 
  addSessionFee(id: number){
    this.pId = id;
    const patient = this.patientService.getPatient(id);

    this.pledger.patient.id = patient.id;
    this.pledger.patient.name = patient.name;
    this.pledger.explanation = patient.name + ': Session Fee' ;
  }

  dateChanged(newDate) {
    if(newDate != null){
      newDate = new Date(newDate);
      this.pledger.date = newDate.getTime();
    }
  }

  saveSessionFee(){
    if(this.pledgerForm.valid){
      this.accountingService.collectSessionFee(this.pId, this.pledger)
      .subscribe(
        data=>{
          this.message = data.statusText;
          this.getPatinetPage();
        },
        error =>{
          this.errMessage = error.status;
          console.log(this.errMessage);
        }
      );
      // Form reset
      this.pledger = new PatientLedger();
      this.pledger.patient = new Patient();
    }
  }

}
