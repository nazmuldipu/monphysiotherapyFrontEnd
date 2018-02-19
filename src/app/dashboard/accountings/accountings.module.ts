import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AccountingsComponent } from './accounting.component';
import { IndexComponent } from './index/index.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SessionFeeComponent } from './sessionFee/session-fee.component';
import { AddIncomeComponent } from './addIncome/add-income.component';
import { AddExpenseComponent } from './addExpense/add-expense.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { MatIconModule, MatInputModule } from '@angular/material';

const routing = RouterModule.forChild([
  {
      path: '', component: AccountingsComponent,
      children: [
        { path: 'index', component: IndexComponent },
        { path: 'cashbook', component: CashbookComponent },
        { path: 'invoice', component: InvoiceComponent },
        { path: 'sessionFee', component: SessionFeeComponent },
        { path: 'addIncome', component: AddIncomeComponent },
        { path: 'addExpense', component: AddExpenseComponent },

        { path: '**', redirectTo: '/accountings/index' }
      ]
  },
]);

@NgModule({
  imports: [
    routing,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    MatInputModule,
    MatIconModule,
  ],
  declarations: [
    AccountingsComponent,
    IndexComponent,
    InvoiceComponent,
    CashbookComponent,
    SessionFeeComponent,
    AddIncomeComponent,
    AddExpenseComponent
  ]
})
export class AccountingsModule { }
