import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'app-users',
  template: `
    <router-outlet></router-outlet>
  `
})
export class UsersComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

}
