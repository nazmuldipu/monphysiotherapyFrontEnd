import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';

@Injectable()
export class PatientService {
    patients: Patient[] = [];
    // user: User;
    page: any;
    serviceUrl = 'api/v1/patients';
    private locator = (p: Patient, id: number) => p.id == id;

    constructor(private dataSource: RestDataSource,
        private router: Router) {
            dataSource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, null)
            .subscribe(
                data => {
                    console.log( 'Patient list Loaded');
                    this.page = data;
                    this.patients = data.content;
                },
                error => {
                    console.log('Data loading failed');
                }
            );
    }
    
    getPage(): any {
        return this.page;
    }

    getPatients(): Patient[]{
        return this.patients;
    }

    getPatient(id: number){
        return this.patients.find(p => this.locator(p, id));
    }

    getPatientPage(pageNumber: number = null){
        const pageUrl = pageNumber == null ? ''  :  'page=' + pageNumber + '&';
        this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl)
            .subscribe(
                data => {
                    console.log( 'Patient list Loaded');
                    this.page = data;
                    this.patients = data.content;
                },
                error => {
                    console.log('Data loading failed');
                }
            );
    }

    savePatient(patient: Patient){
        if (patient.id == 0 || patient.id == null) {
            this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl, patient, true, null)
            .subscribe(
                data => {
                    console.log( 'Patient saved');
                    this.router.navigateByUrl('/dashboard/patients/list');
                    this.patients.push(data);
                },
                error => {
                    console.log('Operation failed ');
                }
            );
        } else {
            this.dataSource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${patient.id}`, patient, true, null)
            .subscribe(
                data => {
                    this.patients.splice(this.patients .findIndex(p => this.locator(p, patient.id)), 1, patient);
                    this.router.navigateByUrl('/dashboard/patients/list');
                    console.log( 'Patient updated');
                },
                error => {
                    console.log('Operation failed ');
                }
            );
        }
    }

    deleteUser(id: number){
        this.dataSource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.patients.splice(this.patients.findIndex(cus => cus.id === id), 1);
                    console.log( 'Patient deleted', 'Success');
                }, 
                err => {
                    console.log('Could not delete', 'Failed');
                }
            );
    }

}
