import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { RestDataSource } from '../services/rest.datasource';
import { PasswordValidation } from './password.validation';
import { RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

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
    private router: Router,
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
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  register() {
    console.log(this.user);
    if (this.registerForm.valid) {
      this.dataSource.sendRequest(RequestMethod.Post, '/register',this.user,false,null)
      .subscribe(
        data => {
          console.log(data.statusText);
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log(error.status);
          this.router.navigateByUrl('/login');
        }
      )
      
    }
  }

  hasExclamationMark(input: FormControl) {
    const hasExclamation = input.value.indexOf('!') >= 0;
    return hasExclamation ? null : { needsExclamation: true };
  }
}
