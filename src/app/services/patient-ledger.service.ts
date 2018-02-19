import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { RestDataSource } from './rest.datasource';
import { PatientLedger } from '../models/patient-ledger.model';

@Injectable()
export class PatientLedgerService {
    // patientsLedger: PatientLedger[] = [];
    // user: User;
    // page: any;
    serviceUrl = '/api/v1/patientLedgers';
    private locator = (p: PatientLedger, id: number) => p.id == id;

    constructor(private dataSource: RestDataSource) {
    }

    getPatientLedgerPage(pId: number, pageNumber: number = null): Observable<any> {
        const pageUrl = pageNumber == null ? ''  :  'page=' + pageNumber + '&';
        return this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl+`/${pId}`, null , true, pageUrl);
    }
}
