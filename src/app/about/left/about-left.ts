 import {Component, NgModule, trigger, transition, style, animate, state,OnInit} from "@angular/core";


@Component({
  selector: 'about-left',
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
 templateUrl: 'about-left.html',
    styleUrls: ['about-left.css']
    
})
export class AboutLeftComponent {

  show:boolean = true;
}