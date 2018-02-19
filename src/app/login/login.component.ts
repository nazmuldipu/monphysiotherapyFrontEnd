import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  user: User;

  constructor(private builder: FormBuilder, private auth: AuthService) {
    this.user = new User();
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.builder.group({
      // name: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      remember: false,
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.authenticate(this.user);
    }
  }

  hasExclamationMark(input: FormControl) {
    const hasExclamation = input.value.indexOf('!') >= 0;
    return hasExclamation ? null : { needsExclamation: true };
  }

}
