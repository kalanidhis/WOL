import {Component, Input} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

declare var $: any;
@Component({
    selector: 'side-bar',
    templateUrl: 'app.sidebar.html',
    styleUrls: ['app.sidebar.css'],
    providers: [CookieService]
})
export class SideBarLeftComponent {

    isClassVisible: false;
    issubmenu: false;
    top: boolean = false;
    @Input() inEditMode;

    ngOnInit() {
        this.gotoHome();
         this.gettheme();
    }

    constructor(private router: Router, private _cookieService: CookieService) {
    }



    clicked() {

        this._cookieService.put('menu', 'top');
        location.reload();
    }

    gotoHeroes() {
        window.location.href = '/billing';

    }

    gotoHome() {
        $('.carousel').carousel({
            interval: 4000
        })

    }

    toggleEditMode(){
        this.inEditMode = false;
    }
settheme(theme){
  this._cookieService.put('theme',theme);
    location.reload();
}
      isBlue: boolean = false;
    isNavy: boolean = false;
    isWhite: boolean = false; 
    isGreen: boolean = false; 
    isIndigo: boolean = false;
     public theme;

    gettheme(){

        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});

   this.theme=this._cookieService.get('theme');
if(this.theme == undefined){
     this._cookieService.put('theme','green');
this.theme = 'green';
}
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
