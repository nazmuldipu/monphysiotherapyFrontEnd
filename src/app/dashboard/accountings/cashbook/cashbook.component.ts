import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../../services/accounting.service';
import { Cashbook } from '../../../models/cashbook.model';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.scss']
})
export class CashbookComponent implements OnInit {
  arr = Array;
  // cashbooks : Cashbook[] = [];


  constructor(private accountingService: AccountingService) { 
  }

  ngOnInit() {
  }
  get cashbooks() : Cashbook[]{
    return this.accountingService.getCashbooks();
  }

  get page(): any{
    return this.accountingService.getPage();
  }
  
  getCashbookPage(pageNumber: number = null){
    this.accountingService.getCashBookPage(pageNumber);
  }
  

}
