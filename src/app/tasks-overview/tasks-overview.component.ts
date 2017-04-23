import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {Task} from '../api-firefly/data/Task';
import {Modal} from 'angular2-modal/plugins/bootstrap/modal';
import {overlayConfigFactory} from 'angular2-modal';
import {TaskModalContext, TaskModalComponent} from './task-modal.component';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'app-tasks-overview',
    providers: [TaskService],
    templateUrl: './tasks-overview.component.html',
    styleUrls: ['./tasks-overview.component.css']
})
export class TasksOverviewComponent implements OnInit {

    errorMessage: string;
    tasks: Task[];

    constructor(vcRef: ViewContainerRef, public modal: Modal, private taskService: TaskService) {
        this.modal.overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        this.getTasks();
    }

    getTasks() {
        this.taskService.getTasks()
            .subscribe(
                tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
    }

    onClick() {
        return this.modal.open(TaskModalComponent, overlayConfigFactory({num1: 2, num2: 3}, BSModalContext));
    }

    // addTask(name: string) {
    //     if (!name) {
    //         return;
    //     }
    //     // this.taskService.create(name)
    //     //     .subscribe(
    //     //         task  => this.tasks.push(task),
    //     //         error =>  this.errorMessage = <any>error);
    // }

}
