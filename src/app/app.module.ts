import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieModule } from 'ngx-cookie';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Material
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarService } from './services/navbar-service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ServiceModule } from './services/service.module';

const appRoutes: Routes = [
  { path : 'home', component: HomeComponent},
  { path : 'login', component: LoginComponent},
  { path : 'register', component: RegisterComponent},
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // SideNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    // CommonModule,
    FormsModule ,
    HttpModule,
    BrowserModule,
    ServiceModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
