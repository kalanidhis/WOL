import {Component, NgModule, trigger, transition, style, animate, state, OnInit, Input} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {ColorPickerDirective, ColorPickerService, Rgba} from 'angular2-color-picker';
import {CookieService} from 'angular2-cookie/core';
import {Routes, RouterModule} from '@angular/router';
import {Router} from '@angular/router';
declare var $: any;


@Component({
    selector: 'dashboard-left',
    animations: [
        trigger(
            'myAnimation',
            [
                transition(
                    ':enter', [
                        style({transform: 'translateX(100%)', opacity: 0}),
                        animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
                    ]
                ),
                transition(
                    ':leave', [
                        style({transform: 'translateX(0)', 'opacity': 1}),
                        animate('500ms', style({transform: 'translateX(100%)', opacity: 0})),

                    ]
                )]
        )
    ],
    templateUrl: 'dashboard-left.html',
    styleUrls: ['dashboard-left.css'],
})

export class DashboardLeft implements OnInit {
    show: boolean = true;
    public ticketData;
    public invoiceData;
    public invoiceDueData;
    public filterQuery = "";
    public rowsOnPage = 2;
    public sortBy = "name";
    public sortOrder = "desc";

    //Colors
    private color: string = '#2889e9';

    //Widgets Toggle
    public showAccountDetails: boolean = true;
    public showPreviousInvoices: boolean = false;
    public showOffers: boolean = true;
    public showNotifications: boolean = true;
    public showOpenRequests: boolean = true;
    public showSupport: boolean = true;
    public showBlog: boolean = true;
    private inEditMode: boolean = false;
    private editDashboard: boolean = false;
    public showServices: boolean = true;
    public isShakeMode: boolean = false;
    public showQuickLinks: boolean = true;
    public isBoxShadow:boolean = false;

    constructor(private http: Http, private _cookieService: CookieService, private cpService: ColorPickerService) {
    }

    ngOnInit() {
        this.getAllTickets();
        this.getInvoiceData();
        this.getInvoiceDueAmount();
        this.progressbar();
        this.gettheme();
    }

    getAllTickets() {
        this.http.get(environment.getLast2Invoices)
            .subscribe(
                data => {
                    this.ticketData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }
    billing() {
        window.location.href = '/billing';

    }

    getInvoiceData() {
        this.http.get(environment.last2Months)
            .subscribe(
                data => {
                    this.invoiceData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }

    getInvoiceDueAmount() {
        this.http.get(environment.getCurrentInvoice)
            .subscribe(
                data => {
                    this.invoiceDueData = data.json()
                },
                err => console.error(err),
                () => console.log('done')
            );
    }

    progressbar() {
        $('.progress').show();
        $('.progress .progress-bar').css("width",
            function () {
                return $(this).attr("aria-valuenow") + "%";


            }
        )
        setTimeout(() => {
            $('.progress').hide();
        }, 3000);

    }

    disableDashboardEdit() {
        this.editDashboard = false;
        this.inEditMode = false;
        this.isShakeMode = false;
    }

    enableDashboardEdit() {
        this.editDashboard = true;
        this.inEditMode = true;
        this.isColorPicker = true;
    }

    //Change theme
    isBlue: boolean = false;
    isNavy: boolean = false;
    isWhite: boolean = false;
    isGreen: boolean = false;
    isIndigo: boolean = false;
    isColorPicker: boolean = false;

    public theme;

    setTheme(theme) {
        console.log(theme);
        this.switchTheme(theme);
        this._cookieService.put('theme', theme);
    }

    gettheme() {
        this.theme = this._cookieService.get('theme');
        this.switchTheme(this.theme);
    }

    switchTheme(theme) {
        switch (theme) {
            case "green":
                console.log(" Went in Green");
                this.isGreen = true;
                this.isBlue = false;
                this.isNavy = false;
                this.isWhite = false;
                this.isIndigo = false;
                this.isColorPicker = false;
                break;
            case "blue":
                console.log(" Went in Blue");
                this.isBlue = true;
                this.isNavy = false;
                this.isWhite = false;
                this.isGreen = false;
                this.isIndigo = false;
                this.isColorPicker = false;
                break;
            case "navy":
                console.log(" Went in Navy");
                this.isNavy = true;
                this.isBlue = false;
                this.isWhite = false;
                this.isGreen = false;
                this.isIndigo = false;
                this.isColorPicker = false;
                break;
            case "indigo":
                console.log(" Went in Indigo");
                this.isIndigo = true;
                this.isBlue = false;
                this.isNavy = false;
                this.isWhite = false;
                this.isGreen = false;
                this.isColorPicker = false;
                break;
            case "white":
                console.log(" Went in White");
                this.isWhite = true;
                this.isBlue = false;
                this.isNavy = false;
                this.isGreen = false;
                this.isIndigo = false;
                this.isColorPicker = false;
                break;
        }
    }
}
