import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'app/api-firefly/data/Task';

@Component({
    selector: 'app-task-line',
    templateUrl: './task-line.component.html',
    styleUrls: ['./task-line.component.css']
})

export class TaskLineComponent implements OnInit {
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
        this.states = TaskLineComponent.STATES;
    }

    ngOnInit() {
    }

}
