import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
declare var $: any;
@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.css']
})

export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string;
    show: boolean = false;
    reg: boolean = false;
    user: string;
    password: string;

    ngOnInit() {
        this.setcookie();
    }

    constructor(private _cookieService: CookieService) {
    }

    setcookie() {
        this._cookieService.put('user', 'bradCarpenter');
        this._cookieService.put('pwd', 'bradCarpenter');


    };

    register() {

        alert(this.model.regusername);

        this._cookieService.put('user', this.model.regusername);
        this._cookieService.put('pwd', this.model.regpassword);
        this._cookieService.put('email', this.model.email);
        this._cookieService.put('tel', this.model.tel);
        this.reg = !this.reg;
        $('.ico').toggleClass('fa-pencil');
        // Switches the forms
        $('.form').animate({
            height: "toggle",
            'padding-top': 'toggle',
            'padding-bottom': 'toggle',
            opacity: "toggle"
        }, "slow");
        setTimeout(() => {
                this.reg = !this.reg;
            }


            , 6000);
    }

    login() {
        this.user = this._cookieService.get('user');
        this.password = this._cookieService.get('pwd');

        if (this.user == this.model.username && this.password == this.model.password) {
            window.location.href = '/home';

        }
        else {
            this.show = !this.show;
            setTimeout(() => {
                    this.show = !this.show;
                }


                , 6000);
        }
        /*
         this.loading = true;
         this.authenticationService.login(this.model.username, this.model.password)
         .subscribe(
         data => {
         this.router.navigate([this.returnUrl]);
         },
         error => {
         this.alertService.error(error);
         this.loading = false;
         });*
         window.location.href = '/home';*/
    }
}
