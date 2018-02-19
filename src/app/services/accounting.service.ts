import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { PatientLedger } from '../models/patient-ledger.model';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { Cashbook } from '../models/cashbook.model';

@Injectable()
export class AccountingService {
    cashbooks: Cashbook[] = [];
    page: any;
    serviceUrl = 'api/v1/accounting';
    constructor(private dataSource: RestDataSource) { 
    }

    getCashbooks():Cashbook[]{
        return this.cashbooks;
    }

    getPage():any{
        return this.page;
    }

    collectSessionFee(pId: number, patientLedger: PatientLedger):Observable<any>{
        console.log(patientLedger);
        return this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl+`/sessionFee/${pId}`, patientLedger, true, null);
    }

    getCashBookPage(pageNumber: number = null){
        const pageUrl = pageNumber == null ? ''  :  'page=' + pageNumber + '&';
        this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl+`/cashbook`, null, true, pageUrl)
        .subscribe(
            data => {
                this.cashbooks = data.content;
                this.page = data;
            },
            error =>{
                console.log('Cash book loading error');
                console.log(error);
            }
        )
    }
}
