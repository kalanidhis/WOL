import {Component , OnInit} from "@angular/core";
import {Http} from "@angular/http";

@Component({
    selector: 'my-app',
    templateUrl: '../html/invoice.component.html',
    styleUrls: ['../css/invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    public data;
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "getMonthVal(month)";
    public sortOrder = "desc";

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.http.get("http://localhost:8080/invoice/all")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 1000);
            });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.month.length;
    }

     public getMonthVal = (a: any) => {
        return new Date(a.month+'-1-01').getMonth()+1;
    }


}
