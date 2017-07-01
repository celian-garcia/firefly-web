import {Component, OnInit, ViewContainerRef, Input} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {Task} from '../api-firefly/data/Task';
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

    static VIEWS_MAP: { [key: number]: string; } = {
        0: 'line',
        1: 'card'
    };

    error_message: string;
    tasks: Task[];
    view_name: string;

    constructor(vcRef: ViewContainerRef, public modal: Modal, private taskService: TaskService,
                private _toolbarButtonService: ToolbarButtonService) {
        this.modal.overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        this._toolbarButtonService.subscribeCreateTask(_ => this._openCreationModal());
        this._toolbarButtonService.subscribeToggleView(view_id => this._setView(view_id));
        this.refreshTasksList();
    }

    refreshTasksList() {
        this.taskService.getTasks()
            .subscribe(
                tasks => this.tasks = tasks,
                error => this.error_message = <any>error);
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

}
