import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {Task} from '../api-firefly/data/Task';
import {Modal} from 'angular2-modal/plugins/bootstrap/modal';
import {Overlay} from 'angular2-modal';

@Component({
    selector: 'app-tasks-overview',
    providers: [TaskService],
    templateUrl: './tasks-overview.component.html',
    styleUrls: ['./tasks-overview.component.css']
})
export class TasksOverviewComponent implements OnInit {

    errorMessage: string;
    tasks: Task[];

    constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private taskService: TaskService) {
        overlay.defaultViewContainer = vcRef;
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
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('Modal title')
            .body(`
                <h4>Blabla </h4>
            `)
            .open();
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
