 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
    import {CookieService} from 'angular2-cookie/core';
declare var $: any;
@Component({
  selector: 'profile-left',

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
    templateUrl: 'profile-left.html',
    styleUrls: ['profile-left.css']
  
})

export class ProfileLeftComponent implements OnInit {
	  show:boolean = true;
    ngOnInit(){
  this.progressbar();
       this.gettheme();
}
   constructor(private _cookieService:CookieService) {
    }
         gotoHome() {
       window.location.href = '/home';
  
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