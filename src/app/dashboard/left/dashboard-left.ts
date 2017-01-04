import {Component, NgModule, trigger, transition, style, animate, state, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
declare var $: any;
import {CookieService} from 'angular2-cookie/core';
@Component({
    selector: 'dashboard-left',
    animations: [
        trigger(
            'myAnimation',
            [
                transition(
                    ':enter', [
                        style({transform: 'translateX(100%)', opacity: 0}),
                        animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
                    ]
                ),
                transition(
                    ':leave', [
                        style({transform: 'translateX(0)', 'opacity': 1}),
                        animate('500ms', style({transform: 'translateX(100%)', opacity: 0})),

                    ]
                )]
        )
    ],
    templateUrl: 'dashboard-left.html',
    styleUrls: ['dashboard-left.css'],
})

export class DashboardLeft implements OnInit {
    show: boolean = true;
    public ticketData;
    public invoiceData;
    public invoiceDueData;
    public filterQuery = "";
    public rowsOnPage = 2;
    public sortBy = "name";
    public sortOrder = "desc";

    //Widgets Toggle
    public showAccountDetails: boolean = true;
    public showPreviousInvoices: boolean = true;
    public showOffers: boolean = true;
    public showNotifications: boolean = true;
    public showOpenRequests: boolean = true;
    public showSupport: boolean = true;
    public showBlog: boolean = false;
    private inEditMode: boolean = false;





    constructor(private http: Http,private _cookieService:CookieService) {
    }

    ngOnInit() {
        this.getAllTickets();
        this.getInvoiceData();
        this.getInvoiceDueAmount();
        this.progressbar();
        this.gettheme();
    }

    getAllTickets() {
        this.http.get(environment.getLast2Invoices)
            .subscribe(
                data => {
                    this.ticketData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }


    getInvoiceData() {
        this.http.get(environment.last2Months)
            .subscribe(
                data => {
                    this.invoiceData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }

    getInvoiceDueAmount() {
        this.http.get(environment.getCurrentInvoice)
            .subscribe(
                data => {
                    this.invoiceDueData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }

    progressbar() {
        $('.progress').show();
        $('.progress .progress-bar').css("width",
            function () {
                return $(this).attr("aria-valuenow") + "%";


            }
        )
        setTimeout(() => {
            $('.progress').hide();
        }, 3000);

    }

    toggleEditMode(){
        this.inEditMode = false;
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
