import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTaskViewComponent} from './app-task-view.component';
import {UtilsModule} from '../utils/utils.module';
import {ApiFireflyModule} from '../api-firefly/api-firefly.module';

@NgModule({
    imports: [
        CommonModule,
        ApiFireflyModule,
        UtilsModule
    ],
    declarations: [AppTaskViewComponent],
    exports: [AppTaskViewComponent]
})
export class AppTaskViewModule {
}
