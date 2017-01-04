 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'contact-bar',
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
    templateUrl: 'contact.html',
    styleUrls: ['contact.css']
  
})

export class ContactComponent {
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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/