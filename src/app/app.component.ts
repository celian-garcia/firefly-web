import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolbarButtonService} from './toolbar/toolbar-button.service';
import {TaskService} from './api-firefly/task.service';
import {ModuleService} from './api-firefly/module.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarButtonService, TaskService, ModuleService]
})
export class AppComponent implements OnInit {

  taskId: string;
  taskSelected: boolean;
  /**
   * View state :
   * - is -1 when we display only overview (by default)
   * - is 0 when we display overview and task view
   * - is 1 when we display only task view
   * @type {number}
   */
  viewState: number = -1;

  constructor() {
  }

  ngOnInit() {
    this.taskSelected = false;
  }

  updateTaskId(event) {
    this.taskSelected = !isNullOrUndefined(event);
    this.taskId = event;
    this.incrementView();
  }

  incrementView() {
    console.log('Increment view');
    this.viewState = this.taskSelected ? this.viewState + 1 : -1;
  }

  decrementView() {
    console.log('Decrement view');
    this.viewState -= 1;
  }
}
