import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css']
  
})
export class DashboardComponent implements OnInit {

  	public data;
    public filterQuery = "";
    public rowsOnPage = 2;
    public sortBy = "name";
    public sortOrder = "desc";

    constructor(private http: Http) {
    }

    ngOnInit(): void {
    }


}
