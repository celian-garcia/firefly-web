import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolbarButtonService} from './toolbar/toolbar-button.service';
import {Task} from 'app/api-firefly/data/Task';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarButtonService]
})
export class AppComponent implements OnInit {

    task: Task;
    taskSelected: boolean;

    constructor() {
    }

    ngOnInit() {
        this.taskSelected = false;
    }

    updateTask(event) {
        this.taskSelected = true;
        this.task = event;
    }
}
