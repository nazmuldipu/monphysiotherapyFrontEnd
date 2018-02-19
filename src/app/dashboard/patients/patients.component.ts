import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'app-employee',
  template: `
    <router-outlet></router-outlet>
  `
})
export class PatientsComponent implements OnInit {
  patientForm: FormGroup;
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  createForm() {
    this.patientForm = this.builder.group({
      name: ['', Validators.required ],
      age: ['', Validators.required ],
      phone: ['', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$') ] ],
      date: ['', Validators.required ],
      chiefComplain: '',
      pastHistory: '',
      pastMedicalHistory: '',
      onExaminaton: '',
      tender: '',
      soiling: '',
      redness: '',
      treatments: this.builder.array([]),
      advices: this.builder.array([]),
      requiredTests: this.builder.array([]),
      medications: this.builder.array([]),
      prescribeFee: '',
      sessionFee: '',
    });
  }

}
