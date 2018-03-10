import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TaskMetadata} from './data/TaskMetadata';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {TaskOperation} from './data/TaskOperation';

@Injectable()
export class TaskService {

    private static TASKS_URL = 'api/v1/tasks';  // URL to web API

    public tasks$: BehaviorSubject<TaskMetadata[]> = new BehaviorSubject<TaskMetadata[]>([]);

    // Two subjects designed to be used by each task view which have been initialized with only task_id
    /**
     * Permits to store operations of a task retrieved from the server.
     * Stored by task_id.
     * @type {Map<string, ReplaySubject<TaskOperation[]>>}
     */
    private taskOperationsById$: Map<string, ReplaySubject<TaskOperation[]>> = new Map();
    /**
     * Permits to store metadata of a task retrieved from the server.
     * Stored by task_id.
     * @type {Map<string, BehaviorSubject<TaskMetadata>>}
     */
    private taskMetadataById$: Map<string, BehaviorSubject<TaskMetadata>> = new Map();
    /**
     * Permits to store current last operation index of a task. This is updated on each operations retrieval.
     * Stored by task_id.
     * @type {Map<string, number>}
     */
    private taskLastOperations: Map<string, number> = new Map();

    private static extractData(res: Response) {
        return res.json() || [];
    }

    public static handleError(error: Response | any) {
        console.log(error);
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    constructor(private http: Http) {
    }

    updateTasks() {
        const that = this;
        return this.http.get(TaskService.TASKS_URL)
            .map((data: Response) => data.json() || [])
            .map((data) => {
                const dataKeys = [];
                // Create Operations subject for each task if necessary, with its associated last operation
                for (const elem of data) {
                    const task = elem as TaskMetadata;
                    dataKeys.push(task.id);
                    if (!that.taskOperationsById$.has(task.id)) {
                        // Task operations is initially an empty list
                        that.taskOperationsById$.set(task.id, new ReplaySubject<TaskOperation[]>());
                    }

                    if (!that.taskMetadataById$.has(task.id)) {
                        // As we already have the task metadata, we put it in the subject initialization
                        const subject = new BehaviorSubject<TaskMetadata>(task);
                        // subject.subscribe();
                        that.taskMetadataById$.set(task.id, subject);
                    } else {
                        that.taskMetadataById$.get(task.id).next(task);
                    }

                    if (!that.taskLastOperations.has(task.id)) {
                        that.taskLastOperations.set(task.id, 0);
                    }
                }

                // Filter each task that have been removed previously
                Array.from(that.taskMetadataById$.entries()).filter(
                    (item) => dataKeys.includes(item[0]));
                Array.from(that.taskOperationsById$.entries()).filter(
                    (item) => dataKeys.includes(item[0]));

                return this.tasks$.next(data);
            })
            .catch(TaskService.handleError);
    }

    createTask(task: TaskMetadata): Observable<TaskMetadata> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(TaskService.TASKS_URL, JSON.stringify(task), options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    runTask(taskId: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = TaskService.TASKS_URL + '/' + taskId + '/' + 'run';
        return this.http.post(url, '', options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    flushTasks() {
        return this.http.delete(TaskService.TASKS_URL)
            .map(() => this.tasks$.next([]))
            .catch(TaskService.handleError);
    }

    fetchOperations(taskId: string) {
        const currentTaskOperationsById$ = this.taskOperationsById$;
        const currentTaskLastOperations = this.taskLastOperations;

        // Build the operation url
        const lastOperation = currentTaskLastOperations.get(taskId);
        const url = TaskService.TASKS_URL + '/' + taskId + '/' + 'operations' + '/' + lastOperation;

        // Do the GET
        return this.http.get(url)
            .map((data: Response) => data.json() || [])
            .do((data) => {
                // Update the new last operation index
                currentTaskLastOperations.set(taskId, data.lastOperationIndex as number);

                // Update the new operations subject
                return currentTaskOperationsById$.get(taskId).next(data.operations as TaskOperation[]);
            })
            .catch(TaskService.handleError);
    }

    getOperationsSubject(taskId: string) {
        return this.taskOperationsById$.get(taskId);
    }

    getTaskMetadataSubject(taskId: string) {
        return this.taskMetadataById$.get(taskId);
    }

    reinitializeOperations(taskId: string) {
        this.taskLastOperations.set(taskId, 0);
    }
}
