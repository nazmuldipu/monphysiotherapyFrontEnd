import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cashbook } from '../../../models/cashbook.model';
import { AccountingService } from '../../../services/accounting.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {
  arr = Array;
  cashbookForm: FormGroup;
  cashbook: Cashbook;
  
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
      debit: ['', Validators.required ],
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

  saveIncome(){
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
