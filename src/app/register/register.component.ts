import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { RestDataSource } from '../services/rest.datasource';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // TODO: password and confirm password similarity check
  hide = true;
  registerForm: FormGroup;
  user: User;

  constructor(
    private builder: FormBuilder,
    private dataSource: RestDataSource) {

    this.user = new User();
    this.user.active = false;
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.builder.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(5) ] ],
      confirmPassword: ['', [Validators.required] ],
      terms: ['', Validators.requiredTrue]
    });
  }

  register() {
    console.log(this.registerForm);
    console.log(this.registerForm.valid);

    if (this.registerForm.valid) {
      console.log(this.user);
      
    }
  }

  hasExclamationMark(input: FormControl) {
    const hasExclamation = input.value.indexOf('!') >= 0;
    return hasExclamation ? null : { needsExclamation: true };
  }
}
