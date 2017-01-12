import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {AppComponent}  from './script/app.component';
import {NavBarComponent} from './script/nav-bar.component';

import {DashboardComponent} from './script/dashboard.component';


/**/
import {HttpModule} from "@angular/http";
import {DataTableModule} from "angular2-datatable";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataFilterPipe}   from './script/data-filter.pipe';
import {SampleDataFilterPipe}   from './sampledata/sampledata-filter.pipe';

import {InvoiceComponent} from './invoice/invoice.component';


import {PaymenthistoryComponent} from './paymenthistory/paymenthistory.component';
import {HomeComponent} from './script/home.component';
import {BillingComponent} from './billing/billing.component';
import {ViewticketComponent} from './viewticket/viewticket.component';
import {LoginComponent} from './login/login.component';
/*-------------------------------final-----------------------------------------*/
import {SideBarTopComponent} from './navigation/topbar/sidebartop';
import {SideBarLeftComponent} from './navigation/leftbar/sidebar.component';
import {ContactComponent} from './contactus/contact';
import {profileComponent} from './profile/profile';
import {AboutComponent} from './about/about';
import {TroubleticketsComponent} from './createticket/troubletickets.component';
import {ControlMessagesComponent} from './createticket/control-messages.component';
import {MakePaymentComponent} from './payment/app.makepayment.component';
import {CheckComponent} from './payment/check';
import {CardComponent} from './payment/card';
import {QuickpayComponent} from './payment/quickpay';
import {DashboardTop} from './dashboard/top/dashboard-top';
import {DashboardLeft} from './dashboard/left/dashboard-left';
import {ContactLeftComponent} from './contactus/left/contact-left';
import {ContactTopComponent} from './contactus/top/contact-top';

import {BillingTopComponent} from './billing/top/billing-top';
import {BillingLeftComponent} from './billing/left/billing-left';


import {PaymentLeftComponent} from './payment/left/payment-left';
import {PaymentTopComponent} from './payment/top/payment-top';

import {ProfileLeftComponent} from './profile/left/profile-left';
import {ProfileTopComponent} from './profile/top/profile-top';

import {AboutLeftComponent} from './about/left/about-left';
import {AboutTopComponent} from './about/top/about-top';

import {SampleDataComponent} from './sampledata/sampledata.component';
import {ColorPickerModule} from 'angular2-color-picker';


/**/
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
        HttpModule,
        ColorPickerModule,
        RouterModule.forRoot([
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'profile', component: profileComponent},
            {path: 'paymenthistory', component: PaymenthistoryComponent},
            {path: 'quick', component: QuickpayComponent},
            {path: 'card', component: CardComponent},
            {path: 'check', component: CheckComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'contact', component: ContactComponent},
            {path: 'payment', component: MakePaymentComponent},
            {path: 'about', component: AboutComponent},
            {path: 'viewinvoice', component: InvoiceComponent},
            {path: 'createtroubleticket', component: TroubleticketsComponent},
            {path: 'home', component: HomeComponent},
            {path: 'billing', component: BillingComponent},
            {path: 'viewticket', component: ViewticketComponent},
            {path: 'login', component: LoginComponent},
            {path: 'sampledata', component: SampleDataComponent},
            {path: './billing', redirectTo: '/billing', pathMatch: 'full'}
        ])
    ],
    declarations: [
        AppComponent,
        QuickpayComponent,
        CardComponent,
        CheckComponent,
        NavBarComponent,
        DashboardComponent,
        AboutComponent,
        profileComponent,
        MakePaymentComponent,
        InvoiceComponent,
        DataFilterPipe,
        SampleDataFilterPipe,
        TroubleticketsComponent,
        ControlMessagesComponent,
        ContactComponent,
        PaymenthistoryComponent,
        HomeComponent,
        BillingComponent,
        ViewticketComponent,
        SampleDataComponent,
        LoginComponent,
        SideBarTopComponent, SideBarLeftComponent,
        DashboardTop, DashboardLeft,
        ContactLeftComponent, ContactTopComponent,
        BillingTopComponent, BillingLeftComponent,
        PaymentTopComponent, PaymentLeftComponent,
        ProfileLeftComponent, ProfileTopComponent,
        AboutLeftComponent, AboutTopComponent

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */