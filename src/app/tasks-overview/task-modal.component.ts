import {Component, OnInit} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Task} from 'app/api-firefly/data/Task';
import {Module} from '../api-firefly/data/Module';
import {Type} from '../api-firefly/data/Type';
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
    errorMessage: string;
    modules_list: Module[];

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
                this.modules_list = data;
                this.task.module = this.modules_list[0].id;
                this.task.type = this.modules_list[0].processing_types[0].id;
            },
            error => this.errorMessage = <any>error
        );
    }

    getTypesFromModule(id: number): Type[] {
        return this.modules_list.find(elt => elt.id === id).processing_types;
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
                task => this.task = task,
                error => {
                    this.errorMessage = <any>error;
                });
        this.dialog.close(this.task);
    }

    beforeDismiss(): boolean {
        alert(this.errorMessage);
        return false;
    }

    beforeClose(): boolean {
        return false;
    }

}
