import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from 'app/toolbar/toolbar.component';
import {MaterialsModule} from '../materials/materials.module';
import {FormsModule} from '@angular/forms';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialsModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [ToolbarComponent, CreateTaskDialogComponent],
  declarations: [ToolbarComponent, CreateTaskDialogComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
