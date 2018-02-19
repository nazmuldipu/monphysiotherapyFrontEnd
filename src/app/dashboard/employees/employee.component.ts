import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  template: `
    <app-employee-navbar></app-employee-navbar>
    <router-outlet></router-outlet>
  `
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
