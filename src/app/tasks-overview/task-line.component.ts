import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'app/api-firefly/data/Task';
import {ViewType} from '../toolbar/data/ViewType';

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
    @Input() view: ViewType;

    view_type_name: string;
    states: { [key: string]: string; };

    constructor() {
        this.states = TaskLineComponent.STATES;
    }

    ngOnInit() {
        this.view_type_name = ViewType[this.view];
    }

    viewTypeName(view: ViewType): string {
        return view === ViewType.LIST ? 'line' : 'card';
    }

}
