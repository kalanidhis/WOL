import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { TroubleticketsService } from './troubletickets.service';
import { Troubleticket } from './troubleticket.interface';
import { Http,Response } from '@angular/http';
import { CanActivate, Router } from '@angular/router';



@Component({
  selector: 'app-troubletickets',
  templateUrl: '../html/troubletickets.component.html',
  styleUrls: ['../css/troubletickets.component.css']
})
export class TroubleticketsComponent {
  userForm: any;
  private troubleticketsService: TroubleticketsService;

  constructor(private formBuilder: FormBuilder,protected http: Http,private router: Router) {


    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
       'phone': ['', Validators.required],
       'category': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(10)]]
    });
  }

submitForm(myForm) {
 if (!this.userForm.valid) {
      return '/home';
  }
  var result;
  if (this.userForm.dirty && this.userForm.valid) {
    result = this.addTickets(JSON.stringify(myForm.value));
    if(result!="error"){
   this.router.navigate(['./viewticket']);
    }
}
 }


  addTickets(formData){
    this.http.post('http://localhost:8080/tickets/create',formData)
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
}
