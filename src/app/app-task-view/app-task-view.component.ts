import {AfterViewChecked, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as BABYLON from 'babylonjs';
import {TaskService} from '../api-firefly/task.service';
import {TaskMetadata} from '../api-firefly/data/TaskMetadata';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TaskOperation} from '../api-firefly/data/TaskOperation';
import {isNullOrUndefined} from 'util';

// TODO: separate the BabylonJS part
@Component({
    selector: 'app-task-view',
    templateUrl: './app-task-view.component.html',
    styleUrls: ['./app-task-view.component.css']
})
export class AppTaskViewComponent implements AfterViewChecked, OnInit, OnDestroy {

    static REFRESH_TIME = 1000;

    // TODO : provide it as a service
    static STATES: { [key: string]: string; } = {
        '0': 'assets/images/CREATED.png',
        '1': 'assets/images/STARTED.png',
        '2': 'assets/images/PAUSED.png',
        '3': 'assets/images/FINISHED.png',
        '4': 'assets/images/ABORTED.png'
    };

    private _taskId: string;

    @Input()
    set taskId(taskId: string) {
        this._taskId = taskId;
        this.updateView();
    }

    task: TaskMetadata;
    private babylonIsRunning: boolean;

    private taskOperationsSubject: BehaviorSubject<TaskOperation[]> = null;
    private taskMetadataSubject: BehaviorSubject<TaskMetadata> = null;

    states: { [key: string]: string; };

    private static createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // Now create a basic Babylon Scene object
        const scene = new BABYLON.Scene(engine);

        // Change the scene background color to green.
        scene.clearColor = new BABYLON.Color4(0, 1, 0, 1);

        // This creates and positions a free camera
        const camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, false);

        // This creates a light, aiming 0,1,0 - to the sky.
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

        // Dim the light a small amount
        light.intensity = .5;

        // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
        const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
        const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

        // Leave this function
        return scene;
    }

    constructor(private taskService: TaskService) {
        this.states = AppTaskViewComponent.STATES;
        this.babylonIsRunning = false;
    }

    ngAfterViewChecked(): void {
        if (this.task !== undefined && this.task !== null && !this.babylonIsRunning) {
            const canvas = document.getElementById('babylon-canvas') as HTMLCanvasElement;
            if (canvas !== null) {
                this.babylonIsRunning = true;
                this.babylonInitialization(canvas);
            }
        }
    }

    ngOnInit() {
        console.log('app-task-view -- NgOnInit');
        setInterval(() => this.refreshData(), AppTaskViewComponent.REFRESH_TIME);
        console.log('app-task-view -- NgOnInit done');
    }

    ngOnDestroy() {
        console.log('app-task-view -- NgOnDestroy');
        console.log('app-task-view -- NgOnDestroy done');
    }

    updateView() {

        // Empty babylonjs canvas
        // TODO

        // Empty observers of subject, without unsubscribe
        if (!isNullOrUndefined(this.taskMetadataSubject)) {
            this.taskMetadataSubject.observers = [];
        }

        // Subscribe to new subjects
        // this.taskOperationsSubject = this.taskService.getOperationsSubject(this._taskId);
        // this.taskOperationsSubject.subscribe(data => console.log(data));
        this.taskMetadataSubject = this.taskService.getTaskMetadataSubject(this._taskId);
        this.taskMetadataSubject.subscribe(data => this.task = data);

        // Refresh the tasks data
        this.refreshData();
    }

    private babylonInitialization(canvas: HTMLCanvasElement) {
        const engine = new BABYLON.Engine(canvas, true);

        // create a basic BJS Scene object
        const scene = AppTaskViewComponent.createScene(engine, canvas);

        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    private refreshData() {
        if (this.task.state === 1) {
            this.taskService.fetchOperations(this._taskId).subscribe();
        }
    }

    private onClickRunTask() {
        this.taskService.runTask(this._taskId)
            .subscribe(
                resultOk => console.log(resultOk),
                error => console.log(error));
    }
}
