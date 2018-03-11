import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiFireflyModule} from 'app/api-firefly/api-firefly.module';
import {TasksOverviewComponent} from './tasks-overview.component';
import {TaskLineComponent} from './task-line.component';
import {UtilsModule} from '../utils/utils.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ApiFireflyModule,
        UtilsModule,
        FormsModule
    ],
    declarations: [TasksOverviewComponent, TaskLineComponent],
    exports: [TasksOverviewComponent]
})
export class TasksOverviewModule {
}
