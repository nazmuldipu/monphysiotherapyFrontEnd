import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar-service';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-navbar></app-navbar>
    <div class="container-fluid">
    <app-side-navbar></app-side-navbar>
      <div class="row" >
        <div [ngClass]="navCollaps? 'col-md-12 p-0' : 'side-nav-offset col-md-12'">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .side-nav-offset{ padding-left: 305px;}
    .container-fluid {
      font-size: 14px;
      padding-top: 56px;
    }
    @media (max-width:767px) {
      .side-nav-offset{ padding-left: 0;}
    }
  `]
})
export class DashboardComponent implements OnInit {

  constructor(private sideNav: NavbarService) { }

  ngOnInit() {
  }

  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }

}
