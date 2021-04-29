import { Component, OnInit } from '@angular/core';
import {QuotationsService} from '../quotations.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuotationResponse} from "../quotation";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: QuotationResponse[] = [];
  constructor(private snackBar:MatSnackBar,
    private QuotationService1: QuotationsService) { }

  ngOnInit(): void {
    this.getQuotations();
  }

  getQuotations() {
    this.QuotationService1.getAllQuotation()
      .then((r: any) =>{
        this.list = r;
      })
      .catch((e: any) => this.showError(e));
  }

  // -------------------------------------Snackbar Management-------------------------------------

  showError(error: any) {
    this.snackBar.open(error || 'Internal server error', '', {
      duration: 5000,
      panelClass: ['danger-snackbar']// 'success-snackbar', 'danger-snackbar', 'warning-snackbar', 'info-snackbar'
    });
  }

  showSuccess(response: any) {
    this.snackBar.open(response.message || 'Successful operation!', '', {
      duration: 5000,
      panelClass: ['success-snackbar']// 'success-snackbar', 'danger-snackbar', 'warning-snackbar', 'info-snackbar'
    });
  }

}
