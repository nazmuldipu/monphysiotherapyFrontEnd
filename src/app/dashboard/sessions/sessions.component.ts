import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  template: `
    <router-outlet></router-outlet>
  `
})
export class SessionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
