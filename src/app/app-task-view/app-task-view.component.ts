import {AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as BABYLON from 'babylonjs';
import {TaskService} from '../api-firefly/task.service';
import {TaskMetadata} from '../api-firefly/data/TaskMetadata';
import {Element, TaskOperation} from '../api-firefly/data/TaskOperation';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {isNullOrUndefined} from 'util';
import {} from '';

// TODO: separate the BabylonJS part
@Component({
    selector: 'app-task-view',
    templateUrl: './app-task-view.component.html',
    styleUrls: ['./app-task-view.component.css']
})
export class AppTaskViewComponent implements AfterViewInit, OnInit, OnDestroy {

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
    private _refreshOperations = false;
    private _scene: BABYLON.Scene;
    private _engine: BABYLON.Engine;
    private _babylonIsRunning = false;

    @Input()
    set taskId(taskId: string) {
        console.log('app-task-view -- @Input taskId');
        this._taskId = taskId;
        this.updateView();
        console.log('app-task-view -- @Input taskId done');
    }

    task: TaskMetadata;

    private taskOperationsSubject: ReplaySubject<TaskOperation[]> = null;
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


        // Leave this function
        return scene;
    }

    constructor(private taskService: TaskService) {
        this.states = AppTaskViewComponent.STATES;
    }

    ngAfterViewInit(): void {
        console.log('app-task-view -- NgAfterViewInit');
        this.babylonInitializationWrapper();
        console.log('app-task-view -- NgAfterViewInit done');
    }

    babylonInitializationWrapper() {
        const canvas = document.getElementById('babylon-canvas') as HTMLCanvasElement;
        if (!isNullOrUndefined(canvas) && !this._babylonIsRunning) {
            this.babylonInitialization(canvas);
            this.taskOperationsSubject.subscribe(data => this.fillPoints(data));
            this._babylonIsRunning = true;
        }
    }

    ngOnInit() {
        // console.log('app-task-view -- NgOnInit');
        this.refreshData();

        setInterval(() => this.refreshData(), AppTaskViewComponent.REFRESH_TIME);
        // console.log('app-task-view -- NgOnInit done');
    }

    ngOnDestroy() {
        // console.log('app-task-view -- NgOnDestroy');
        // console.log('app-task-view -- NgOnDestroy done');
    }

    updateView() {
        // Empty observers of subject, without unsubscribe
        if (!isNullOrUndefined(this.taskOperationsSubject)) {
            this.taskOperationsSubject.observers = [];
        }
        if (!isNullOrUndefined(this.taskMetadataSubject)) {
            this.taskMetadataSubject.observers = [];
        }

        // Reinitialize subjects
        this.taskService.reinitializeOperations(this._taskId);
        console.log(this._taskId);
        this.taskMetadataSubject = this.taskService.getTaskMetadataSubject(this._taskId);
        this.taskOperationsSubject = this.taskService.getOperationsSubject(this._taskId);

        // Subscribe to metadata update
        this.taskMetadataSubject.subscribe(data => this.task = data);

        // We want to make an init refresh if state is not init (0)
        this._refreshOperations = this.task.state !== 0;

        // Trigger the babylon scene reinitialization
        if (this._babylonIsRunning) {
            this._babylonIsRunning = false;
            this.babylonInitializationWrapper();
        }
    }

    private fillPoints(operations: TaskOperation[]) {
        for (const operation of operations) {
            const sphereId = 'sphere' + operation.element.id;
            let sphere = this._scene.getMeshByID(sphereId);
            switch (operation.type) {
                case 'add':
                    if (sphere === null) {
                        sphere = BABYLON.Mesh.CreateSphere(sphereId, 16, 2, this._scene);
                    }
                    sphere.position.x = operation.element.value.x;
                    sphere.position.y = operation.element.value.y;
                    sphere.position.z = operation.element.value.z;
                    break;
                case 'delete':
                    if (sphere !== null) {
                        sphere.dispose();
                    }
                    break;
                default:
                    console.error('Unmanaged operation type : ' + operation.type);
            }
        }
    }

    private babylonInitialization(canvas: HTMLCanvasElement) {
        // Clean current babylon objects
        if (!isNullOrUndefined(this._scene)) {
            this._scene.dispose();
        }
        if (!isNullOrUndefined(this._engine)) {
            this._engine.dispose();
        }

        // Create new babylons objects
        const engine = new BABYLON.Engine(canvas, true);
        const scene = AppTaskViewComponent.createScene(engine, canvas);
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Assign new babylon objects to current ones
        this._scene = scene;
        this._engine = engine;
    }

    /**
     * In the task view, we only ask for the service to refresh the operations data.
     * The tasks metadata are refreshed by overview.
     */
    private refreshData() {

        if (this._refreshOperations) {
            this.taskService.fetchOperations(this._taskId).subscribe();
        }

        // We refresh operations again only if state is running (1)
        this._refreshOperations = this.task.state === 1;
    }

    private onClickRunTask() {
        this.taskService.runTask(this._taskId)
            .subscribe(
                resultOk => console.log(resultOk),
                error => console.log(error));
    }
}
