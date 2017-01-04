import { Component, Input } from '@angular/core';

import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'makepayment',
   templateUrl: 'app.payment.html',
    styleUrls: ['payment.css'],

})
export class MakePaymentComponent {

 step1: true;
 isquickpay: false;
 step3: false;
 step4: false;
ngOnInit() {
this.setcookie();
}
 constructor(private _cookieService:CookieService) {
    }
    top: boolean = false;
   setcookie(){
   
   if(this._cookieService.get('menu') == 'top'){
     this.top = true;
   }

 };
  onSelect() {
  	alert("hi");
 //isquickpay: true;

  }
}