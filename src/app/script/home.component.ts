import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'app-home',
  templateUrl: '../html/home.component.html',
  styleUrls: ['../css/home.component.css']
  
})
export class HomeComponent implements OnInit {
  	public ticketData;
  	public invoiceData;
  	public invoiceDueData;
    public filterQuery = "";
    public rowsOnPage = 2;
    public sortBy = "name";
    public sortOrder = "desc";
isClassVisible: false;
issubmenu:false;


       gotoHeroes() {
       window.location.href = '/billing';
  
}

    constructor(private router: Router,private _cookieService:CookieService) {
    }

 top: boolean = false;
 setcookie(){
   
   if(this._cookieService.get('menu') == 'top'){
     this.top = true;
   }

 };


ngOnInit() {
this.setcookie();
}

}
