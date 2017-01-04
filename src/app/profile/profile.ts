import { Component, Input } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.css']
  
})

export class profileComponent {
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