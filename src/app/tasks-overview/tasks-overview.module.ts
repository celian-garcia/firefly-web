import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiFireflyModule} from 'app/api-firefly/api-firefly.module';
import {TasksOverviewComponent} from './tasks-overview.component';
import {TaskLineComponent} from './task-line.component';
import {UtilsModule} from '../utils/utils.module';
import {TaskModalComponent} from './task-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ApiFireflyModule,
        UtilsModule,
        FormsModule
    ],
    declarations: [TasksOverviewComponent, TaskLineComponent, TaskModalComponent],
    exports: [TasksOverviewComponent],
    entryComponents: [TaskModalComponent]
})
export class TasksOverviewModule {
}
