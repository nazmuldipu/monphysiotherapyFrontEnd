import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../../services/accounting.service';
import { Cashbook } from '../../../models/cashbook.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  arr = Array;
  cashbookForm: FormGroup;
  cashbook: Cashbook;
  // message= '';
  // errMessage = '';

  constructor(
    private builder: FormBuilder,
    private accountingService: AccountingService) {

    this.cashbook = new Cashbook();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.cashbookForm = this.builder.group({
      date: ['', Validators.required ],
      explanation: ['', Validators.required ],
      credit: ['', Validators.required ],
    });
  }

  get cashbooks() : Cashbook[]{
    return this.accountingService.getCashbooks();
  }

  get page(): any{
    return this.accountingService.getPage();
  }

  get message(): string{
    return this.accountingService.getMessage();
  }

  get errMessage(): string{
    return this.accountingService.getErrorMessage();
  }
  
  getCashbookPage(pageNumber: number = null){
    this.accountingService.getCashBookPage(pageNumber);
  }

  saveExpense(){
    if(this.cashbookForm.valid){
      this.accountingService.saveCashbook(this.cashbook);
    }
  }

  dateChanged(newDate) {
    if(newDate != null){
      newDate = new Date(newDate);
      this.cashbook.date = newDate.getTime();
    }
  }

}
