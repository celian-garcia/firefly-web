import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    fullTitleImagePath: string;

    constructor() {
        this.fullTitleImagePath = 'assets/images/firefly_title.png';
    }

    ngOnInit() {
    }
}
