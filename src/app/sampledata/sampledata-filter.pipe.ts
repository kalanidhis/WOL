import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name : "sampledataFilter",
    pure: false
})
export class SampleDataFilterPipe implements PipeTransform {

    transform(items:any[], query:string[]):any[] {

          if (typeof items === 'object') {
            var resultArray = [];
            if (query.length === 0) {
                resultArray = items;
            }
 
            else {
                for (let item of items) {
                    if (item.id != null && item.id==query

                    || item.name != null && item.name.match(new RegExp(''+query, 'i'))

                    || item.services != null && item.services.match(new RegExp(''+query, 'i'))

                    || item.datePurchased != null && item.datePurchased.match(new RegExp(''+query, 'i'))) {
                        resultArray.push(item);
                    }
                }
            }
 
            return resultArray;
        }
        else {
            return null;
        }
    }
}