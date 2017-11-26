import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Task} from './data/Task';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TaskService {

    private static TASKS_URL = 'api/v1/tasks';  // URL to web API

    public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

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
        return this.http.get(TaskService.TASKS_URL)
            .map((data: Response) => data.json() || {})
            .do((data) => this.tasks$.next(data))
            .catch(TaskService.handleError);
    }

    createTask(task: Task): Observable<Task> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        // console.log(task);
        // console.log(JSON.stringify(task));
        return this.http.post(TaskService.TASKS_URL, JSON.stringify(task), options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    runTask(task: Task) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = TaskService.TASKS_URL + '/' + task.id + '/' + 'run';
        return this.http.post(url, JSON.stringify(task), options)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }


}
