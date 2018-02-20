import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { PSession } from '../models/session.model';

@Injectable()
export class PSessionService {
    sessions: PSession[] = [];
    // user: User;
    page: any;
    serviceUrl = 'api/v1/sessions';
    private locator = (p: PSession, id: number) => p.id == id;

    constructor(private dataSource: RestDataSource,
        // private toastr: ToastrService,
        private router: Router) {
    }
    
    getPage(): any {
        return this.page;
    }

    getSessions(): PSession[]{
        return this.sessions;
    }

    getSession(id: number){
        return this.sessions.find(p => this.locator(p, id));
    }

    getSessionPage(pageNumber: number = null){
        const pageUrl = pageNumber == null ? '' : 'page=' + pageNumber + '&';
        this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl)
            .subscribe(
                data => {
                    this.page = data;
                    this.sessions = data.content;
                    console.log('Sessoin list loaded');
                },
                error => {
                    console.log('Session loading error with code ' + error.status);
                }
            );
    }

    getPatientSessionPage(pId: number, pageNumber: number = null): Observable<any>{
        const pageUrl = pageNumber == null ? '' : 'page=' + pageNumber + '&';
        return this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl + `/patient/${pId}`, null , true, pageUrl);
    }

    getPatientLastSession(pId: number):Observable<PSession>{
        return this.dataSource.sendRequest(RequestMethod.Get, this.serviceUrl+`/patientLast/${pId}`, null, true, null);
    }
    
    savePSession(pId: number, psession: PSession): Observable<any> {
        if (psession.id == 0 || psession.id == null) {
            return this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl+`/${pId}`, psession, true, null);
        } else {
            return this.dataSource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${pId}/${psession.id}`, psession, true, null)
        }
    }

    deleteUser(id: number){
        this.dataSource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.sessions.splice(this.sessions.findIndex(cus => cus.id === id), 1);
                    // this.showSuccess( 'Session deleted', 'Delete Success');
                }, 
                err => {
                    // this.showError('Could not delete', 'Delete Failed');
                }
            );
    }
}
