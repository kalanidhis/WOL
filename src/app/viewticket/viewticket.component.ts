 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {CookieService} from 'angular2-cookie/core';
 import {environment} from "../../environments/environment";
declare var $: any;
@Component({
    selector: 'app-viewticket',
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
    templateUrl: 'viewticket.component.html',
    styleUrls: ['viewticket.component.css']

})
export class ViewticketComponent implements OnInit {
  show:boolean = true;
 	public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "desc";

   constructor(private http: Http,private _cookieService:CookieService) {
    }

    ngOnInit(): void {
        this.http.get(environment.getAllTickets)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 1000);
            });

             this.setcookie();
setTimeout(() => {
  this.progressbar();
    }, 1000);
       this.gettheme();
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
    top: boolean = false;
   setcookie(){

   if(this._cookieService.get('menu') == 'top'){
     this.top = true;
   }

 };

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.name.length;
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
