import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'protractor/built/taskScheduler';

@Component({
    selector: 'app-task-view',
    templateUrl: './app-task-view.component.html',
    styleUrls: ['./app-task-view.component.css']
})
export class AppTaskViewComponent implements OnInit {

    @Input() task: Task;

    constructor() {
    }

    ngOnInit() {
    }

}
