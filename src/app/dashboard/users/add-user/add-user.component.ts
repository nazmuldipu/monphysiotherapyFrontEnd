import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  hide = true;
  user: User;
  tRoles: any;

  userForm: FormGroup;
  editing = false;

  constructor(private builder: FormBuilder,
    private service: UserService,
    private roleService: RoleService,
    private activeRoute: ActivatedRoute) {
    
      this.user = new User();
      
      this.editing = activeRoute.snapshot.params['mode'] == 'edit';
      if (this.editing) {
        Object.assign(this.user,
          service.getUser(activeRoute.snapshot.params['id']));
      }
      this.createForm();
   }

  ngOnInit() {
  }

  get roles(): Role[]{
    return this.roleService.getRoles();
  }

  createForm() {
    this.userForm = this.builder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      active: false,
      roles: ['', Validators.required],
    });
  }

  addUser() {
    if(this.userForm.valid){
      this.service.saveUser(this.user);
      
    }
  }

}
