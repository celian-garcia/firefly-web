import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'app/api-firefly/data/Task';

@Component({
    selector: 'app-task-line',
    templateUrl: './task-line.component.html',
    styleUrls: ['./task-line.component.css']
})

export class TaskLineComponent implements OnInit {
    @Input() task: Task;

    constructor() {
    }

    ngOnInit() {
    }
}
