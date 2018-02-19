import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chage-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  user: User;
  userForm: FormGroup;
  
  constructor(private builder: FormBuilder, 
    private service: UserService,
    private auth: AuthService) {

    this.user = this.auth.getCurrentUser();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.builder.group({
      id: '',
      name: '',
      email: '',
      password: [Validators.required, Validators.minLength(5)]
    });
  }

  addUser() {
    if(this.userForm.valid){
      this.service.changeUserPassword(this.user);
    }
  }

  
  
  // get currentUser(){
  //   // return this.service.getCurrentUser();
  // }
  
}
