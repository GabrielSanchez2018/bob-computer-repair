/*
============================================
; Title:  invoice-summary-dialog.component.ts
; Author: Gabriel Sanchez
; Date:   24 April 2020
; Description: Material dialog for the Invoice Summary dialog
;===========================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: any;

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
   }

  ngOnInit() {
  }

}
