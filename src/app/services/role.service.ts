import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/role.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class RoleService {
    roles: Role[];
    page: any;
    constructor(private dataSource: RestDataSource,
        private toastr: ToastrService) {

        dataSource.sendRequest(RequestMethod.Get, 'api/v1/roles', null , true, null)
            .subscribe(
                data => {
                    this.page = data;
                    this.roles = data.content;
                    toastr.success( 'Role list loaded', 'Role List');
                },
                error => {
                    toastr.error('Role list loading failed','Loading error')
                }
            );
    }

    getPage(): any {
        return this.page;
    }

    getRoles(): Role[] {
        return this.roles;
    }

    getRole(id: number): Role {
        return this.roles.find(p => p.id == id);
    }

    getRolesPage(page: number = null) {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        this.dataSource.sendRequest(RequestMethod.Get, 'api/v1/roles', null , true, pageUrl)
            .subscribe(
                data => {
                    this.page = data;
                    this.roles = data.content;
                    this.toastr.success( 'Role page Loaded', 'Role List');
                },
                error => {
                    this.toastr.error('Role page loading failed', 'Loading error')
                }
            );
    }

    saveRole(role: Role) {
        if (role.id == null || role.id === 0) {
            this.dataSource.sendRequest(RequestMethod.Post, 'api/v1/roles', role, true, null)
                .subscribe(
                    data => {
                        this.roles.push(data);
                        this.toastr.success( 'Role Saved', role.name);
                    },
                    error => {
                        this.toastr.error('Role saving failed', 'Save error')  
                    }
                );
        } else {
            this.dataSource.sendRequest(RequestMethod.Put, `api/v1/roles/${role.id}` , role, true, null)
                .subscribe(
                    data => {
                        this.roles.splice(this.roles.
                        findIndex(cus => cus.id === role.id), 1, role);
                        this.toastr.success( 'Role updated', role.name);
                    },
                    error => {
                        this.toastr.error('Role updating failed', 'Update error')
                    }
                );
        }
    }

    deleteRole(id: number) {
        this.dataSource.sendRequest(RequestMethod.Delete, `api/v1/roles/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.roles.splice(this.roles.
                    findIndex(cus => cus.id === id), 1);
                    this.toastr.success( 'Role deleted', 'Delete');
                }, 
                err => {
                    this.toastr.error('Role deleting failed', 'Delete error')
                }
            );
    }

}
