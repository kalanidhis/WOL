import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-billing',
  templateUrl: '../html/billing.component.html',
  styleUrls: ['../css/billing.component.css']
})
export class BillingComponent {

 dateval: string;
public invoiceData;

  constructor(private http: Http) {
    }
     
	getBillingDetails(monthVal){

	if (monthVal.length > 5) {

		var res = monthVal.split("-");
		var obj = { 
            monthName: res[0],
            monthId: new Date(monthVal+'-1-01').getMonth()+1+"",
            year: res[1]+""
        }; 
	    var jsonString= JSON.stringify(obj);

      this.http.post('http://localhost:8080/invoice/billingdetails',jsonString)
      .subscribe(
        data => { this.invoiceData = data.json()},
        err => console.error(err),
        () => console.log(this.invoiceData)
      );
	}

   }
}