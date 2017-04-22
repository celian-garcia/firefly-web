import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiFireflyModule} from 'app/api-firefly/api-firefly.module';
import {TasksOverviewComponent} from './tasks-overview.component';
import {ModalModule} from 'angular2-modal/esm';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {TaskLineComponent} from './task-line.component';
import {UtilsModule} from '../utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        ApiFireflyModule,
        ModalModule,
        BootstrapModalModule,
        UtilsModule
    ],
    declarations: [TasksOverviewComponent, TaskLineComponent],
    exports: [TasksOverviewComponent]
})
export class TasksOverviewModule {
}
