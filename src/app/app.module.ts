import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TasksOverviewModule} from './tasks-overview/tasks-overview.module';
import {ToolbarModule} from 'app/toolbar/toolbar.module';
import {AppTaskViewModule} from './app-task-view/app-task-view.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TasksOverviewModule,
        ToolbarModule,
        AppTaskViewModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
