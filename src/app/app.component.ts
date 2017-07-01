import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolbarButtonService} from './toolbar/toolbar-button.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarButtonService]
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
