import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'protractor/built/taskScheduler';

@Component({
    selector: 'app-task-view',
    templateUrl: './app-task-view.component.html',
    styleUrls: ['./app-task-view.component.css']
})
export class AppTaskViewComponent implements OnInit {

    // TODO : provide it as a service
    static STATES: { [key: string]: string; } = {
        '0': 'assets/images/CREATED.png',
        '1': 'assets/images/STARTED.png',
        '2': 'assets/images/PAUSED.png',
        '3': 'assets/images/FINISHED.png',
        '4': 'assets/images/ABORTED.png'
    };

    @Input() task: Task;
    states: { [key: string]: string; };

    constructor() {
        this.states = AppTaskViewComponent.STATES;
    }

    ngOnInit() {
    }

}
