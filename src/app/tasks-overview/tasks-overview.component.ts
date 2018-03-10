import {Component, OnInit, ViewContainerRef, EventEmitter, Output} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {TaskMetadata} from '../api-firefly/data/TaskMetadata';
import {ToolbarButtonService} from 'app/toolbar/toolbar-button.service';

@Component({
    selector: 'app-tasks-overview',
    templateUrl: './tasks-overview.component.html',
    styleUrls: ['./tasks-overview.component.css']
})
export class TasksOverviewComponent implements OnInit {
    static REFRESH_TIME = 1000;
    static VIEWS_MAP: { [key: number]: string; } = {
        0: 'line',
        1: 'card'
    };

    @Output() clickTask: EventEmitter<string> = new EventEmitter();
    tasks: TaskMetadata[];
    view_name: string;

    constructor(vcRef: ViewContainerRef, private taskService: TaskService,
                private _toolbarButtonService: ToolbarButtonService ) {
    }

    ngOnInit() {
        console.log('tasks-overview -- NgOnInit');
        this._toolbarButtonService.subscribeCreateTask(_ => this._openCreationModal());
        this._toolbarButtonService.subscribeToggleView(view_id => this._setView(view_id));

        // Subscribe to tasks service and refresh the tasks list at the beginning and also regularly
        this.taskService.tasks$.subscribe(data => {
            this.tasks = data;
        });
        this.refreshTasksList();
        // setInterval(() => this.refreshTasksList(), TasksOverviewComponent.REFRESH_TIME);
        console.log('tasks-overview -- NgOnInit done');
    }

    refreshTasksList() {
        this.taskService.updateTasks().subscribe();
    }

    private _setView(view_id: number) {
        console.log('Received toggle view event');
        this.view_name = TasksOverviewComponent.VIEWS_MAP[view_id];
    }

    private _openCreationModal() {
        console.log('Received task creation event');
    }

    onClick(task: TaskMetadata) {
        this.clickTask.next(task.id);
    }

}
