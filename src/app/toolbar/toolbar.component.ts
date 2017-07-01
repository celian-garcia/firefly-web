import {Component} from '@angular/core';
import {ToolbarButtonService} from './toolbar-button.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
    fullTitleImagePath: string;

    constructor(private _buttonService: ToolbarButtonService) {
        this.fullTitleImagePath = 'assets/images/firefly_title.png';
    }

    onClickCreateTask() {
        this._buttonService.createTask();
    }

    onClickToggleView() {
        this._buttonService.toggleView();
    }
}
