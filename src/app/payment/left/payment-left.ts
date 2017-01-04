 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {Http} from "@angular/http";
  import {CookieService} from 'angular2-cookie/core';
declare var $: any;
@Component({
  selector: 'payment-left',
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
   templateUrl: 'payment-left.html',
    styleUrls: ['payment-left.css'],

})
export class PaymentLeftComponent {
  show:boolean = true;
 step1: true;
 isquickpay: false;
 step3: false;
 step4: false;
 public invoiceData;
  model: any = {};

  constructor(private http: Http,private _cookieService:CookieService) {
    }
    ngOnInit(){
  this.progressbar();
   this.gettheme();
}

  onSelect() {
  	alert("hi");
 //isquickpay: true;

  }

  getPaymentDetails(){

  	 this.http.get('http://localhost:8080/invoice/currectinvoice')
      .subscribe(
        data => { this.invoiceData = data.json()
        this.model.id=this.invoiceData[0].id;
        this.model.payamount=this.invoiceData[0].amount;
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

  paybill(){
     var obj = {
            billId: this.model.id+"",
            paidAmount: this.model.payamount+"",
        };
	    var jsonString= JSON.stringify(obj);

       this.http.post('http://localhost:8080/invoice/update',jsonString)
      .subscribe(
        data => { this.invoiceData = data.json()},
        err => console.error(err),
        () => console.log(this.invoiceData)
      );
  }
       gotoHome() {
       window.location.href = '/home';
  
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
