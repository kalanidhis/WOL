import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'app-billing',
  templateUrl: 'billing.component.html',
  styleUrls: ['billing.component.css']
})
export class BillingComponent {

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
}