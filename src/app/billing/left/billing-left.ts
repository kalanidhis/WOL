 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
  import {CookieService} from 'angular2-cookie/core';
declare var $: any;
@Component({
  selector: 'billing-left',
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
  templateUrl: 'billing-left.html',
  styleUrls: ['billing-left.css']
})
export class BillingLeftComponent {
  show:boolean = true;
  dateval: string;
  public invoiceData;
  model: any = {};
ngOnInit(){
  this.progressbar();
   this.gettheme();
}
constructor(private http: Http, private _cookieService:CookieService) {
    this.getCurrentMonthBilling();
    }


getCurrentMonthBilling(){
this.http.get(environment.getCurrentInvoice)
      .subscribe(
        data => { this.invoiceData = data.json()
          this.model.monthvalue=this.invoiceData[0].month+"-"+this.invoiceData[0].year;
        },
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

  getBillingDetails(monthVal) {

    if (monthVal.length > 5) {

      let res = monthVal.split("-");
      let obj = {
        monthName: res[0],
        monthId: new Date(monthVal + '-1-01').getMonth() + 1 + "",
        year: res[1] + ""
      };
      let jsonString = JSON.stringify(obj);

      this.http.post(environment.getBillingDetails, jsonString)
        .subscribe(
          data => {
            this.invoiceData = data.json()
          },
          err => console.error(err),
          () => console.log(this.invoiceData)
        );
    }

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
