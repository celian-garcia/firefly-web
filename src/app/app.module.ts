import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {ModalModule} from 'angular2-modal';

import {AppComponent} from './app.component';
import {TasksOverviewModule} from './tasks-overview/tasks-overview.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TasksOverviewModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
