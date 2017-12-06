import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TaskMetadata} from './data/TaskMetadata';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TaskOperation} from './data/TaskOperation';

@Injectable()
export class TaskService {

    private static TASKS_URL = 'api/v1/tasks';  // URL to web API

    public tasks$: BehaviorSubject<TaskMetadata[]> = new BehaviorSubject<TaskMetadata[]>([]);

    private taskOperationsSubjects$: Map<string, BehaviorSubject<TaskOperation[]>> = new Map();
    private taskLastOperations: Map<string, number> = new Map();

    private static extractData(res: Response) {
        return res.json() || {};
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
        const currentTaskOperationsSubjects$ = this.taskOperationsSubjects$;
        const currentTaskLastOperations = this.taskLastOperations;
        return this.http.get(TaskService.TASKS_URL)
            .map((data: Response) => data.json() || {})
            .do((data) => {
                // Create Operations subject for each task if necessary, with its associated last operation
                for (const elem of data) {
                    const task = elem as TaskMetadata;
                    if (!currentTaskOperationsSubjects$.has(task.id)) {
                        currentTaskOperationsSubjects$[task.id] = new BehaviorSubject<TaskOperation[]>([]);
                    }

                    if (!currentTaskLastOperations.has(task.id)) {
                        currentTaskLastOperations[task.id] = 0;
                    }
                }
                return this.tasks$.next(data);
            })
            .catch(TaskService.handleError);
    }

    createTask(task: TaskMetadata): Observable<TaskMetadata> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        // console.log(task);
        // console.log(JSON.stringify(task));
        return this.http.post(TaskService.TASKS_URL, JSON.stringify(task), options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    runTask(task: TaskMetadata) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = TaskService.TASKS_URL + '/' + task.id + '/' + 'run';
        return this.http.post(url, JSON.stringify(task), options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    fetchOperations(taskId: string) {
        const currentTaskOperationsSubjects$ = this.taskOperationsSubjects$;
        const currentTaskLastOperations = this.taskLastOperations;

        // Build the operation url
        const lastOperation = currentTaskLastOperations.get(taskId);
        const url = TaskService.TASKS_URL + '/' + taskId + '/' + 'operations' + '/' + lastOperation;

        // Do the GET
        return this.http.get(url)
            .map((data: Response) => data.json() || {})
            .do((data) => {
                // Update the new last operation index
                currentTaskLastOperations.set(taskId, data.lastOperationIndex as number);

                // Update the new operations subject
                return currentTaskOperationsSubjects$.get(taskId).next(data.operations as TaskOperation[]);
            })
            .catch(TaskService.handleError);
    }

    getOperationsSubject(taskId: string) {
        return this.taskOperationsSubjects$.get(taskId);
    }
}
