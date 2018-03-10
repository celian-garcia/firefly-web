import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskMetadata} from '../../api-firefly/data/TaskMetadata';
import {Module} from '../../api-firefly/data/Module';
import {TaskService} from '../../api-firefly/task.service';
import {ModuleService} from '../../api-firefly/module.service';
import {Type} from '../../api-firefly/data/Type';

@Component({
  selector: 'app-create-task-dialog',
  providers: [TaskService, ModuleService],
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  modules_list: Module[];

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskMetadata,
              public moduleService: ModuleService,
              public taskService: TaskService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTypesFromModule(id: number): Type[] {
    return this.modules_list.find(elt => elt.id === id).processing_types;
  }

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(value => {
      this.modules_list = value;
    });
  }
}