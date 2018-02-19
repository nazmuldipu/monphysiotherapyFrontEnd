import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  arr = Array;
  role: Role;
  roleForm: FormGroup;

  constructor(private builder: FormBuilder,
    private service: RoleService,
    private toastr: ToastrService) {

    this.role = new Role();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.roleForm = this.builder.group({
      id: '',
      name: ['', Validators.required ],
    });
  }

  get roles(): Role[] {
    return this.service.getRoles();
  }
  get page() {
    return this.service.getPage();
  }

  getRolePage(pageNumber: number = null) {
    this.service.getRolesPage(pageNumber);
  }

  editRole(id: number) {
    if (id == 1) {
      this.toastr.error('ADMIN role is not editable', 'ADMIN ');
    } else {
      this.role = this.service.getRole(id);
    }
  }
  

  deleteRole(id: number) {
    if (id == 1) {
      this.toastr.error('ADMIN role is not deletable', 'ADMIN ');
    } else {
      this.service.deleteRole(id);
    }
  }

  addRole() {
    console.log(this.role);
    console.log(this.roleForm.value);
    if(this.roleForm.valid) {
      this.service.saveRole(this.role);
      this.role = new Role();
      this.createForm();
    }
  }

}
