 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { TroubleticketsService } from './troubletickets.service';
import { Troubleticket } from './troubleticket.interface';
import { Http,Response } from '@angular/http';
import { CanActivate, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {environment} from "../../environments/environment";
declare var $: any;

@Component({
  selector: 'app-troubletickets',
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
  templateUrl: 'troubletickets.component.html',
  styleUrls: ['troubletickets.component.css']
})
export class TroubleticketsComponent {
  userForm: any;
  show:boolean = true;
  successshow: boolean = false;
  errorshow: boolean = false;

  ngOnInit() {
this.setcookie();
setTimeout(() => {
  this.progressbar();
    }, 1000);
  this.gettheme();
}
  private troubleticketsService: TroubleticketsService;

  constructor(private _cookieService:CookieService,private formBuilder: FormBuilder,protected http: Http,private router: Router) {


    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
       'phone': ['', Validators.required],
       'category': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(10)]]
    });
  }

 top: boolean = false;
   setcookie(){

   if(this._cookieService.get('menu') == 'top'){
     this.top = true;
   }

 };

submitForm(myForm) {
 if (!this.userForm.valid) {
      return '/home';
  }
  var result;
  if (this.userForm.dirty && this.userForm.valid) {
    result = this.addTickets(JSON.stringify(myForm.value));
    if(result!="error"){
     this.successshow = true;
    }else{
        this.errorshow = true;
    }
}
 }


  addTickets(formData){
    this.http.post(environment.createTicket,formData)
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.userForm.email = data.id;
          },
          (response: Response) => {
            this.handleError(response);
            return "error";
          }
        );
        return "success";
  }


    /**
   * Handle errors
   * @param response
   */
  handleError(response: Response) {
    if (response.status === 422) {
      let errors : Object = response.json();
      console.log(errors);
      for (var field in errors) {
        var fieldErrors: string[] = (<any>errors)[field];

      }
    }

    console.log(response);
  }

  saveUser() {

    console.log(this.userForm);
    if (!this.userForm.valid) {
      return '/home';
    }
    console.log(this.userForm.value);



  alert(this.userForm.value);


  alert(this.userForm);

   var result,
        userValue = this.userForm.value;

    alert(userValue);

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
