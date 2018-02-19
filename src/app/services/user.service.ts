import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    users: User[];
    // user: User;
    page: any;
    serviceUrl = 'api/v1/users';
    private locator = (p: User, id: number) => p.id == id;

    constructor(private dataSource: RestDataSource,
        private toastr: ToastrService,
        private router: Router) {
            dataSource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, null)
            .subscribe(
                data => {
                    this.showSuccess( 'User list Loaded', 'User List');
                    this.page = data;
                    this.users = data.content;
                },
                error => {
                    this.showError('Data loading failed','Loading error');
                }
            );
    }

    getPage(): any {
        return this.page;
    }

    getUsers(): User[]{
        return this.users;
    }
    getUser(id: number){
        return this.users.find(p => this.locator(p, id));
    }

    changeUserPassword(user: User){
        this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl+`/changePassword/${user.id}`, user, true, null)
        .subscribe(
            data => {
                this.router.navigateByUrl('/dashboard/index');
                this.showSuccess( 'Password changed', user.name);
            },
            error => {
                this.showError('Operation failed ', user.name);
            }
        );
    }

    saveUser(user: User){
        if (user.id == 0 || user.id == null) {
            this.dataSource.sendRequest(RequestMethod.Post, this.serviceUrl, user, true, null)
            .subscribe(
                data => {
                    this.showSuccess( 'User saved', user.name);
                    this.router.navigateByUrl('/dashboard/users/list');
                    this.users.push(data);
                },
                error => {
                    this.showError('Operation failed ', user.name);
                }
            );
        } else {
            this.dataSource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${user.id}`, user, true, null)
            .subscribe(
                data => {
                    this.users.splice(this.users .findIndex(p => this.locator(p, user.id)), 1, user);
                    this.router.navigateByUrl('/dashboard/users/list');
                    this.showSuccess( 'User updated', user.name);
                },
                error => {
                    this.showError('Operation failed ', user.name);
                }
            );
        }
    }

    deleteUser(id: number){
        this.dataSource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.users.splice(this.users.findIndex(cus => cus.id === id), 1);
                    this.showSuccess( 'User deleted', 'Success');
                }, 
                err => {
                    this.showError('Could not delete', 'Failed');
                }
            );
    }

    showSuccess(message: string, title: string) {
        this.toastr.success(message, title);
    }
    showInfo(message: string, title: string) {
        this.toastr.info(message, title);
    }
    showError(message: string, title: string) {
        this.toastr.error(message, title);
    }

    // register(user: User) {
    //     this.dataSource.sendRequest(RequestMethod.Post, 'register', user, false, null)
    //         .subscribe(
    //             data => this.showSuccess('Registration Success', user.name), // success path
    //             error => this.showError('Registration Failed : ' + error.status, null) // error path
    //         );
    // }

}
