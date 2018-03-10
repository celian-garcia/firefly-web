import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ToolbarModule} from 'app/toolbar/toolbar.module';
import {AppTaskViewModule} from './app-task-view/app-task-view.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {TasksOverviewModule} from './tasks-overview/tasks-overview.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

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

platformBrowserDynamic().bootstrapModule(AppModule);
