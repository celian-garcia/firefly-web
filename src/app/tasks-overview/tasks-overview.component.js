"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../api-firefly/task.service");
var TasksOverviewComponent = (function () {
    function TasksOverviewComponent(overlay, vcRef, modal, taskService) {
        this.modal = modal;
        this.taskService = taskService;
        overlay.defaultViewContainer = vcRef;
    }
    TasksOverviewComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    TasksOverviewComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService.getTasks()
            .subscribe(function (tasks) { return _this.tasks = tasks; }, function (error) { return _this.errorMessage = error; });
    };
    TasksOverviewComponent.prototype.onClick = function () {
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('Modal title')
            .body("\n                <h4>Blabla </h4>\n            ")
            .open();
    };
    return TasksOverviewComponent;
}());
TasksOverviewComponent = __decorate([
    core_1.Component({
        selector: 'app-tasks-overview',
        providers: [task_service_1.TaskService],
        templateUrl: './tasks-overview.component.html',
        styleUrls: ['./tasks-overview.component.css']
    })
], TasksOverviewComponent);
exports.TasksOverviewComponent = TasksOverviewComponent;
