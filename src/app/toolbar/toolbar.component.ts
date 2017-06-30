import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ViewType} from './data/ViewType';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    fullTitleImagePath: string;
    currentViewIsList: boolean;

    @Output() toggle: EventEmitter<ViewType> = new EventEmitter();

    constructor() {
        this.fullTitleImagePath = 'assets/images/firefly_title.png';
        this.currentViewIsList = true;
    }

    ngOnInit() {
        this.emitToggleEvent();
    }

    onClick() {
        this.currentViewIsList = !this.currentViewIsList;
        this.emitToggleEvent();
    }

    private emitToggleEvent() {
        this.toggle.emit(this.currentViewIsList ? ViewType.LIST : ViewType.CARDS);
    }
}
