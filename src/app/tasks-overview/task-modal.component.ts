import {Component} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Task} from 'app/api-firefly/data/Task';
import {Module} from '../api-firefly/data/Module';
import {TaskService} from '../api-firefly/task.service';

export class TaskModalContext extends BSModalContext {
}

@Component({
    selector: 'app-task-modal',
    providers: [TaskService],
    styleUrls: ['./task-modal.component.css'],
    templateUrl: './task-modal.component.html'
})
export class TaskModalComponent implements CloseGuard, ModalComponent<TaskModalContext> {
    context: TaskModalContext;
    task: Task;
    selected_task_type: string;
    errorMessage: string;

    modules: Module[];

    private static controlTaskBeforeCreate(task: Task): boolean {
        return true;
    }

    constructor(public dialog: DialogRef<TaskModalContext>, private taskService: TaskService) {
        this.context = dialog.context;
        this.task = new Task();
        this.task.name = 'Default title';
        this.task.description = 'Default description';
        this.modules = [
            {
                'name': 'Fly Library',
                'types': [
                    {name: 'Reconstuction 3D', code: 'r3d'},
                    {name: 'Population 3D', code: 'p3d'}
                ]
            },
            {
                'name': 'OpenCV Library',
                'types': [
                    {name: 'Action 1', code: 'action1'},
                    {name: 'Action 2', code: 'action2'}
                ]
            }];
        this.selected_task_type = 'r3d';
        dialog.setCloseGuard(this);
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
                error =>  this.errorMessage = <any>error);
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }

}
