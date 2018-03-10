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

    @Output() updateTaskId: EventEmitter<string> = new EventEmitter();
    tasks: TaskMetadata[] = [];
    view_name: string;
    currentTaskId: string;

    constructor(vcRef: ViewContainerRef, private taskService: TaskService,
                private _toolbarButtonService: ToolbarButtonService ) {
    }

    /**
     * Initialization of tasks-overview's data and specific behaviors.
     * - We subscribe to toolbars buttons
     * - subscribe to tasks metadata update from TaskService
     * - Initialize a refresh loop, each seconds, to send an update request to TaskService
     */
    ngOnInit() {
        console.log('tasks-overview -- NgOnInit');
        // Subscribe to overview buttons (we do not need to subscribe to flush button because the effect will be
        // received by TaskService.tasks$ subscription).
        this._toolbarButtonService.subscribeCreateTask(_ => this._openCreationModal());
        this._toolbarButtonService.subscribeToggleView(view_id => this._setView(view_id));

        // Subscribe to tasks service
        this.taskService.tasks$.subscribe(data => {
            // Check if the current task has been removed since the last tasks update
            const currentTask: TaskMetadata = this.tasks.find(tm => tm.id === this.currentTaskId);
            if (currentTask === undefined) {
                this.updateTaskId.next(undefined);
            }
            // Then update tasks
            this.tasks = data;
        });

        // Refresh the tasks list at the beginning and also regularly
        this.refreshTasksList();
        // setInterval(() => this.refreshTasksList(), TasksOverviewComponent.REFRESH_TIME);
        console.log('tasks-overview -- NgOnInit done');
    }

    /**
     * Ask to the TaskService a task update
     */
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
        this.currentTaskId = task.id;
        this.updateTaskId.next(task.id);
    }

}
