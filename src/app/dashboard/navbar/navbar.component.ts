import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { NavbarService } from '../../services/navbar-service';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  roles: any;
  username: string;

  constructor(public auth: AuthService,
  private Cookie: CookieService,
  private sideNav: NavbarService) {

    this.roles = this.Cookie.getObject('roles');
    this.username = this.Cookie.get('username');
  }

  get isAuthenticated(): boolean {
    return !!this.Cookie.get('access_token');
  }

  setSideNav() {
    this.sideNav.setSideNavBarCollapse();
  }
  logout() {
    this.auth.clear();
  }
}
