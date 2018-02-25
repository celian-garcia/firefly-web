import {Component, OnInit} from '@angular/core';

import {TaskMetadata} from 'app/api-firefly/data/TaskMetadata';
import {Module} from '../api-firefly/data/Module';
import {Type} from '../api-firefly/data/Type';
import {TaskService} from '../api-firefly/task.service';
import {ModuleService} from 'app/api-firefly/module.service';

@Component({
    selector: 'app-task-modal',
    providers: [TaskService, ModuleService],
    styleUrls: ['./task-modal.component.css'],
    templateUrl: './task-modal.component.html'
})
export class TaskModalComponent implements OnInit {
    task: TaskMetadata;
    errorMessage: string;
    modules_list: Module[];

    private static controlTaskBeforeCreate(task: TaskMetadata): boolean {
        return true;
    }

    constructor(private taskService: TaskService, private moduleService: ModuleService) {
        this.task = new TaskMetadata();
        this.task.name = 'Default title';
        this.task.description = 'Default description';
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

    }

    onCreateTask() {
        if (!TaskModalComponent.controlTaskBeforeCreate(this.task)) {
            return;
        }
        this.taskService.createTask(this.task).subscribe(
            task => {
                this.task = task;

            },
            error => {
                this.errorMessage = <any>error;
            }
        );
    }

    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }

}
