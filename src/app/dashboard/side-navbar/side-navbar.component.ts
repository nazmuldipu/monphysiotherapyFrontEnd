import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '../../services/navbar-service';
import { CookieService } from 'ngx-cookie';
import { Role } from '../../models/role.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  // navCollaps: boolean;
  webTitle: String;
  menuList: any;
  selected: any;
  
  constructor(private router: Router,
    private Cookie: CookieService,
    private sideNav: NavbarService, 
    private auth: AuthService) {
    this.webTitle = 'মনের বাড়ি';
    this.menuList = [
      {
        'name': 'Home',
        'icon': 'fa-home',
        'url': '/home',
        'role': '',
        'secondMeu': [
          ]
      },
      {
        'name': 'Dashboard',
        'icon': 'fa-tachometer',
        'url': '/dashboard/index',
        'role': 'USER',
        'secondMeu': [
          ]
      },
      {
        'name': 'Employee',
        'icon': 'fa-user',
        'url': '',
        'role': 'ADMIN',
        'secondMeu': [
          {
            'name': 'Index',
            'icon': 'fa-folder-open',
            'url': '/dashboard/employees/index',
            'role': 'ADMIN',
          },
          {
            'name': 'Add',
            'icon': 'fa-plus',
            'url': '/dashboard/employees/add/add',
            'role': 'ADMIN',
          },
          {
            'name': 'List',
            'icon': 'fa-list',
            'url': '/dashboard/employees/list',
            'role': 'ADMIN',
          }
          ]
      },
      {
        'name': 'Accouting',
        'icon': 'fa-list-alt',
        'url': '',
        'role': 'ADMIN',
        'secondMeu': [
          {
            'name': 'Index',
            'icon': 'fa-folder-open',
            'url': '/dashboard/accountings/index',
            'role': 'ADMIN',
          },
          {
            'name': 'Invoice',
            'icon': 'fa-list',
            'url': '/dashboard/accountings/invoice',
            'role': 'ADMIN',
          },
          {
            'name': 'Cashbook',
            'icon': 'fa-money',
            'url': '/dashboard/accountings/cashbook',
            'role': 'ADMIN',
          },
          {
            'name': 'Collect Session Fee',
            'icon': 'fa-money',
            'url': '/dashboard/accountings/sessionFee',
            'role': 'ADMIN',
          },
          {
            'name': 'Add Income',
            'icon': 'fa-plus',
            'url': '/dashboard/accountings/addIncome',
            'role': 'ADMIN',
          },
          {
            'name': 'Add Expense',
            'icon': 'fa-minus',
            'url': '/dashboard/accountings/addExpense',
            'role': 'ADMIN',
          }
          
          ]
      },
      {
        'name': 'Patient',
        'icon': 'fa-male',
        'url': '',
        'role': 'ADMIN',
        'secondMeu': [
          {
            'name': 'Index',
            'icon': 'fa-folder-open',
            'url': '/dashboard/patients/index'
          },
          {
            'name': 'Add',
            'icon': 'fa-plus',
            'url': '/dashboard/patients/add/add'
          },
          {
            'name': 'List',
            'icon': 'fa-list',
            'url': '/dashboard/patients/list'
          }
          ]
      },
      {
        'name': 'Sessions',
        'icon': 'fa-calendar-check-o',
        'url': '',
        'role': 'ADMIN',
        'secondMeu': [
          {
            'name': 'Index',
            'icon': 'fa-folder-open',
            'url': '/dashboard/sessions/index',
            'role': 'ADMIN',
          },
          {
            'name': 'List',
            'icon': 'fa-list',
            'url': '/dashboard/sessions/list'
          }
          ]
      },
      {
        'name': 'Users',
        'icon': 'fa-user',
        'url': '',
        'role': 'ADMIN',
        'secondMeu': [
          {
            'name': 'Add User',
            'icon': 'fa-user-plus',
            'url': '/dashboard/users/add/add'
          },
          {
            'name': 'User List',
            'icon': 'fa-users',
            'url': '/dashboard/users/list'
          },
          {
            'name': 'Roles',
            'icon': 'fa-smile-o',
            'url': '/dashboard/users/role'
          }
          ]
      },
    ];
  }

  get user(){
    return this.auth.getCurrentUser();
  }
  get roles(){
    return this.auth.getRoles();
  }
  get isAuthenticated(): boolean {
    return !!this.Cookie.get('access_token');
  }

  get navCollaps() {
    return this.sideNav.getSideNavBarCollapse();
  }

  navbarTrigger(){
    this.sideNav.collapseNavber();
  }
  hasRole(role: string):boolean{
    if(role == '' || role == null)
      return true;
    return this.auth.hasRole(role);
  }

  select(smenu) {
    this.selected = (smenu);
  }

  isActive(smenu) {
    return this.selected === smenu;
  }

  navigateTo(url: string) {
    // this.router.navigate([url]);
    this.router.navigate([url]);
  }

  logout() {
    this.auth.clear();
  }

}
