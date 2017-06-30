import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ViewType} from './toolbar/data/ViewType';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

    overview_display: ViewType;

    constructor() {
    }

    ngOnInit() {
    }

    toggleOverviewDisplay(event) {
        this.overview_display = event;
    }


}
