 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'about',
 templateUrl: 'about.html',
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
    styleUrls: ['about.css']
    
})
export class AboutComponent {
  show:boolean = true;
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