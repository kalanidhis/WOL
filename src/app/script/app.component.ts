import { Component } from '@angular/core';

import {CookieService} from 'angular2-cookie/core';



@Component({
  selector: 'app',
  templateUrl: '../html/app.component.html',
  styleUrls: ['../css/app.component.css'],
   providers: [CookieService]
})

export class AppComponent {

 public ngOnInit(): any
  {


  }

	  constructor(private _cookieService:CookieService) {

  }


}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/