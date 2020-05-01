
import { Component, OnInit } from '@angular/core';
import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {
  form: FormGroup;
  username: string;

  services = [
    {title: 'Password Reset', price: 39.99, id: '101'},
    {title: 'Spyware Removal', price: 99.9, id: '102'},
    {title: 'RAM Upgrade', price: 129.99, id: '103'},
    {title: 'Software Installation', price: 49.99, id: '104'},
    {title: 'PC Tune-up', price: 89.99, id: '105'},
    {title: 'Keyboard Cleaning', price: 45.00, id: '106'},
    {title: 'Disk Clean-up', price: 149.99, id: '107'}
  ];

  constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
              private dialog: MatDialog, private router: Router) {

    // get the username
    this.username = this.cookieService.get('sessionuser');
  }

  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  submit(form) {
    console.log(form);
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push({
          id: key
        });
      }
    }

    const lineItems = [];

    /**
     * Build the invoice object
     */
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }
    console.log(lineItems);
    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      lineItems: lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      username: this.username,
      orderDate: new Date()
    };
    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.http.post('/api/invoices/' + invoice.username, {
          lineItems: invoice.lineItems,
          partsAmount: invoice.partsAmount,
          laborAmount: invoice.laborAmount,
          lineItemTotal: invoice.lineItemTotal,
          total: invoice.total,
          orderDate: invoice.orderDate
        }).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        });
      }
    });
  }
}

