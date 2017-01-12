import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Routes, RouterModule} from '@angular/router';
import {Router} from '@angular/router';
declare var $: any;
import {CookieService} from 'angular2-cookie/core';
@Component({
    selector: 'dashboard-top',
       animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)',opacity: 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)' ,opacity: 0})),
          
        ]

      )]
    )
  ],
    templateUrl: 'dashboard-top.html',
     styleUrls: ['dashboard-top.css'],
})

export class DashboardTop  implements OnInit {
show:boolean = true;
  	public ticketData;
  	public invoiceData;
  	public invoiceDueData;
    public filterQuery = "";
    public rowsOnPage = 2;
    public sortBy = "name";
    public sortOrder = "desc";

     constructor(private router: Router,private http: Http,private _cookieService:CookieService) {
    }



ngOnInit() {
 this.getAllTickets();
this.getInvoiceData();
this.getInvoiceDueAmount();
this.gettheme();

setTimeout(() => {
   this.progressbar();
    }, 1000);
}

    billing() {
        window.location.href = '/billing';

    }

  getAllTickets() {
    this.http.get(environment.getLast2Invoices)
      .subscribe(
        data => { this.ticketData = data.json()},
        err => console.error(err),
        () => console.log('done')
      );
  }


  getInvoiceData() {
    this.http.get(environment.last2Months)
      .subscribe(
        data => { this.invoiceData = data.json()},
        err => console.error(err),
        () => console.log('done')
      );
  }

  getInvoiceDueAmount(){
    this.http.get(environment.getCurrentInvoice)
      .subscribe(
        data => { this.invoiceDueData = data.json()},
        err => console.error(err),
        () => console.log('done')
      );
  }
    progressbar(){
    $('.progress').show();
     $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";

                  
                }
        )
setTimeout(() => {
      $('.progress').hide();
    }, 3000);

  }


    //Change theme
     isBlue: boolean = false;
    isNavy: boolean = false;
    isWhite: boolean = false; 
    isGreen: boolean = false; 
    isIndigo: boolean = false;
     public theme;
 gettheme(){
   this.theme=this._cookieService.get('theme');

   switch (this.theme) {  
  case "green":  
    this.isBlue = false;
    this.isNavy = false;
    this.isWhite = false; 
    this.isGreen = true; 
    this.isIndigo = false;
    break;
  case "blue":  
   this.isBlue = true;
    this.isNavy = false;
    this.isWhite = false; 
    this.isGreen = false; 
    this.isIndigo = false; 
    break;  
  case "navy":  
    this.isBlue = false;
    this.isNavy = true;
    this.isWhite = false; 
    this.isGreen = false; 
    this.isIndigo = false; 
    break;  
  case "indigo":  
    this.isBlue = false;
    this.isNavy = false;
    this.isWhite = false; 
    this.isGreen = false; 
    this.isIndigo = true; 
    break; 
  case "white":  
     this.isBlue = false;
    this.isNavy = false;
    this.isWhite = true; 
    this.isGreen = false; 
    this.isIndigo = false;  
    break;  
 
} 
    }
}
