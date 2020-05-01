import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-purchases-by-service',
    templateUrl: './purchases-by-service.component.html',
    styleUrls: ['./purchases-by-service.component.css']
})
export class PurchasesByServiceComponent implements OnInit {
    purchases: any;
    data: any;
    itemCount = [];
    labels = [];

    constructor(private http: HttpClient) {
        // Call the purchases-graph API
        this.http.get('api/invoices/purchases-graph').subscribe(res => {
            // map the response data to the purchases variable
            this.purchases = res;

            // Loop over the purchases to split out the services and item count
            for (const item of this.purchases) {
                this.labels.push(item._id.title);
                this.itemCount.push(item.count);
            }

            // Build the object literal for the primeNG bar graph
            this.data = {
                labels: this.labels, // label for services
                datasets: [
                    // Graph object
                    {
                        backgroundColor: [
                            '#ED0A3F',
                            '#FF8833',
                            '#5FA777',
                            '#0066CC',
                            '#6B3FA0',
                            '#AF593E',
                            '#6CDAE7',
                        ],
                        hoverBackgroundColor: [
                            '#ED0A3F',
                            '#FF8833',
                            '#5FA777',
                            '#0066CC',
                            '#6B3FA0',
                            '#AF593E',
                            '#6CDAE7',
                        ],
                        data: this.itemCount
                    },
                ]
            };
            // Verify the data objects structure matches primeNG's expected format
            console.log('Date object');
            console.log(this.data);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
    }
}
