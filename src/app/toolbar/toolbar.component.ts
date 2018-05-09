import {Component, Inject} from '@angular/core';
import {ToolbarButtonService} from './toolbar-button.service';
import {TaskService} from 'app/api-firefly/task.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TaskMetadata} from '../api-firefly/data/TaskMetadata';
import {CreateTaskDialogComponent} from './create-task-dialog/create-task-dialog.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  fullTitleImagePath = 'assets/images/firefly_title.png';

  constructor(public _dialog: MatDialog, private _buttonService: ToolbarButtonService, private _taskService: TaskService) {
  }

  onClickToggleView() {
      this._buttonService.toggleView();
  }

  onClickFlushTasks() {
      this._taskService.flushTasks().subscribe();
  }

  openCreateTaskDialog(): void {
    const dialogRef = this._dialog.open(CreateTaskDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with data: ' + result);
      this._taskService.createTask(result).subscribe();
    });
  }
}
