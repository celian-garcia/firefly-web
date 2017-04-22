import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from 'app/toolbar/toolbar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent]
})
export class ToolbarModule {
}
