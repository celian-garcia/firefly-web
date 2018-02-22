import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolbarButtonService} from './toolbar/toolbar-button.service';
import {TaskMetadata} from 'app/api-firefly/data/TaskMetadata';
import {TaskService} from "./api-firefly/task.service";
import {ModuleService} from "./api-firefly/module.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarButtonService, TaskService, ModuleService]
})
export class AppComponent implements OnInit {

    taskId: string;
    taskSelected: boolean;

    constructor() {
    }

    ngOnInit() {
        this.taskSelected = false;
    }

    updateTaskId(event) {
        this.taskSelected = !isNullOrUndefined(event);
        this.taskId = event;
    }
}
