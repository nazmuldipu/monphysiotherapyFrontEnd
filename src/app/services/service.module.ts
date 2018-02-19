import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { NavbarService } from './navbar-service';
import { AuthService } from './auth.service';
import { RestDataSource } from './rest.datasource';
import { RoleService } from './role.service';
import { PatientService } from './patient.service';
import { PSessionService } from './session.service';
import { PatientLedgerService } from './patient-ledger.service';
import { AccountingService } from './accounting.service';

@NgModule({
    providers: [
        UserService,
        NavbarService,
        AuthService,
        RestDataSource,
        RoleService,
        PatientService,
        PSessionService,
        PatientLedgerService,
        AccountingService
    ]

})

export class ServiceModule { }
