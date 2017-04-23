import {Component} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

export class TaskModalContext extends BSModalContext {
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'app-task-modal',
    styleUrls: ['./task-modal.component.css'],
    templateUrl: './task-modal.component.html'
})
export class TaskModalComponent implements CloseGuard, ModalComponent<TaskModalContext> {
    context: TaskModalContext;

    constructor(public dialog: DialogRef<TaskModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    onCancel() {
        this.dialog.close();
    }

    onCreateTask() {
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }
}
