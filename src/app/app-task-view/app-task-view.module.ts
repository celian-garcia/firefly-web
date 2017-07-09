import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTaskViewComponent} from './app-task-view.component';
import {UtilsModule} from '../utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
    ],
    declarations: [AppTaskViewComponent],
    exports: [AppTaskViewComponent]
})
export class AppTaskViewModule {
}
