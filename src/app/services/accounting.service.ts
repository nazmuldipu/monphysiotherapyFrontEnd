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
    message= '';
    errMessage = '';
    serviceUrl = 'api/v1/accounting';
    constructor(private dataSource: RestDataSource) { 
        this.getCashBookPage();
    }

    getCashbooks():Cashbook[]{
        return this.cashbooks;
    }

    getPage():any{
        return this.page;
    }

    getMessage(): string{
        return this.message;
    }

    getErrorMessage(): string {
        return this.errMessage;
    }

    getCashBookPage(pageNumber: number = null){
        const pageUrl = pageNumber == null ? ''  :  'page=' + pageNumber + '&';
        this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl, null, true, pageUrl)
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

    collectSessionFee(pId: number, patientLedger: PatientLedger):Observable<any>{
        console.log(patientLedger);
        return this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl+`/sessionFee/${pId}`, patientLedger, true, null);
    }

    saveCashbook(cashbook: Cashbook){
        if (cashbook.id == 0 || cashbook.id == null) {
            this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl, cashbook, true, null)
            .subscribe(
                data => {
                    console.log( 'Cashbook saved');
                    this.cashbooks.push(data);
                    this.message = 'Saved Successfully';
                },
                error => {
                    console.log('Operation failed ');
                    this.errMessage = error.status;
                
                }
            );
        }
    }
}
