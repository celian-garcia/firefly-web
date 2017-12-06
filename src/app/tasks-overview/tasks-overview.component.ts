import {Component, OnInit, ViewContainerRef, Input, EventEmitter, Output} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {TaskMetadata} from '../api-firefly/data/TaskMetadata';
import {Modal} from 'angular2-modal/plugins/bootstrap/modal';
import {overlayConfigFactory} from 'angular2-modal';
import {TaskModalComponent} from './task-modal.component';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {ModuleService} from '../api-firefly/module.service';
import {ToolbarButtonService} from 'app/toolbar/toolbar-button.service';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-tasks-overview',
    providers: [TaskService, ModuleService],
    templateUrl: './tasks-overview.component.html',
    styleUrls: ['./tasks-overview.component.css']
})
export class TasksOverviewComponent implements OnInit {
    static REFRESH_TIME = 1000;
    static VIEWS_MAP: { [key: number]: string; } = {
        0: 'line',
        1: 'card'
    };

    @Output() clickTask: EventEmitter<TaskMetadata> = new EventEmitter();
    tasks: TaskMetadata[];
    view_name: string;

    constructor(vcRef: ViewContainerRef, public modal: Modal, private taskService: TaskService,
                private _toolbarButtonService: ToolbarButtonService ) {
        this.modal.overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        this._toolbarButtonService.subscribeCreateTask(_ => this._openCreationModal());
        this._toolbarButtonService.subscribeToggleView(view_id => this._setView(view_id));

        // Subscribe to tasks service and refresh the tasks list at the beginning and also regularly
        this.taskService.tasks$.subscribe(data => this.tasks = data);
        this.refreshTasksList();
        setInterval(() => this.refreshTasksList(), TasksOverviewComponent.REFRESH_TIME);
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
        this.modal.open(TaskModalComponent, overlayConfigFactory({num1: 2, num2: 3}, BSModalContext))
            .then((dialog) => {
                    dialog.result.then(result => {
                        if (!isNullOrUndefined(result)) {
                            this.tasks.push(result);
                        }
                    }).catch((err) => {
                        alert(err);
                    });
                }
            );
    }

    onClick(task: TaskMetadata) {
        this.clickTask.next(task);
    }

}
