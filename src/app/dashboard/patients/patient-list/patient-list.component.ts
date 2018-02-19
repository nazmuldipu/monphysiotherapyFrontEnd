import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  arr = Array;
  // options = {
  //   year: 'numeric', month: 'numeric',
  //   day: 'numeric', hour: '2-digit', hour12: true, minute: '2-digit'
  // };

  constructor(private service : PatientService) { }
  
  ngOnInit() {
  }

  get patients(): Patient[]{
    return this.service.getPatients();
  }

  get page() {
    return this.service.getPage();
  }
  getPatinetPage(pageNumber: number = null) {
    this.service.getPatientPage(pageNumber);
  }

  deletePatient(id: number){
    if (confirm('Are you sure to delete')) {
      console.log(id);
    }
  }

}
