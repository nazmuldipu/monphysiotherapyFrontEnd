import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Patient } from '../../../models/patient.model';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patientForm: FormGroup;
  patient: Patient;
  editing = false;

  constructor(private builder: FormBuilder,
    private service : PatientService,
    private activeRoute: ActivatedRoute) {
    this.patient = new Patient();

    this.createForm();
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    if (this.editing) {
      Object.assign(this.patient,
        service.getPatient(activeRoute.snapshot.params['id']));
    }
  }
  ngOnInit() { }

  createForm() {
    this.patientForm = this.builder.group({
      name: ['', Validators.required ],
      age: ['', Validators.required ],
      phone: ['01', Validators.required ],
      date: ['', Validators.required ],
      chiefComplain: '',
      pastHistory: '',
      pastMedicalHistory: '',
      onExaminaton: '',
      tender: '',
      soiling: false,
      redness: false,
      treatments: new FormArray([new FormControl('')]),
      advices: new FormArray([new FormControl('')]),
      requiredTests: new FormArray([new FormControl('')]),
      medications: new FormArray([new FormControl('')]),
      prescribeFee: ['500', Validators.required ],
      sessionFee: ['300', Validators.required ],
    });

    this.patient.phone = '01';
    this.patient.sessionFee = 300;
    this.patient.prescribeFee = 500;
    this.patient.treatments = [];
    this.patient.advices = [];
    this.patient.requiredTests = [];
    this.patient.medications = [];
  }

  get treatments(): FormArray {
    return this.patientForm.get('treatments') as FormArray;
  }
  addTreatments() {
    this.treatments.push(new FormControl());
  }

  get advices(): FormArray {
    return this.patientForm.get('advices') as FormArray;
  }
  addAdvices() {
    this.advices.push(new FormControl());
  }

  get requiredTests(): FormArray {
    return this.patientForm.get('requiredTests') as FormArray;
  }
  addRequiredTests() {
    this.requiredTests.push(new FormControl());
  }

  get medications(): FormArray {
    return this.patientForm.get('medications') as FormArray;
  }
  addMedications() {
    this.medications.push(new FormControl());
  }

  addPatient() {
    console.log(this.patient);
    if(this.patientForm.valid){
      this.service.savePatient(this.patient);
    }
  }

  // this method to set patient date value
  private dateChanged(newDate) {
    if(newDate != null){
      newDate = new Date(newDate);
      this.patient.date = newDate.getTime();
    }
  }
}
