import {Component, OnInit} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Task} from 'app/api-firefly/data/Task';
import {Module} from '../api-firefly/data/Module';
import {TaskService} from '../api-firefly/task.service';
import {ModuleService} from 'app/api-firefly/module.service';

export class TaskModalContext extends BSModalContext {
}

@Component({
    selector: 'app-task-modal',
    providers: [TaskService, ModuleService],
    styleUrls: ['./task-modal.component.css'],
    templateUrl: './task-modal.component.html'
})
export class TaskModalComponent implements OnInit, CloseGuard, ModalComponent<TaskModalContext> {
    context: TaskModalContext;
    task: Task;
    selected_task_type: string;
    errorMessage: string;

    modules: Module[];

    private static controlTaskBeforeCreate(task: Task): boolean {
        return true;
    }

    constructor(public dialog: DialogRef<TaskModalContext>, private taskService: TaskService, private moduleService: ModuleService) {
        this.context = dialog.context;
        this.task = new Task();
        this.task.name = 'Default title';
        this.task.description = 'Default description';
        dialog.setCloseGuard(this);
    }

    ngOnInit() {
        this.moduleService.getModules().subscribe(
            data => {
                console.log(data);
                this.modules = data;
            },
            error => this.errorMessage = <any>error
            );
    }

    onCancel() {
        this.dialog.close();
    }

    onCreateTask() {
        if (!TaskModalComponent.controlTaskBeforeCreate(this.task)) {
            return;
        }
        this.taskService.createTask(this.task)
            .subscribe(
                task => console.log(task),
                error => {
                    this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }

}
