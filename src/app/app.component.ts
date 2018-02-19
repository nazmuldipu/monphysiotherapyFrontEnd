import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { NavbarService } from './services/navbar-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sideNav: NavbarService) {
  }
  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }
}
