import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Task} from './data/Task';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

    private tasksUrl = 'api/v1/tasks';  // URL to web API
    private namesUrl = 'api/v1/names';  // URL to web API
    private categoriesUrl = 'api/v1/categories';  // URL to web API

    private static extractData(res: Response) {
        return res.json() || {};
    }

    public static handleError(error: Response | any) {
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

    getTasks(): Observable<Task[]> {
        return this.http.get(this.tasksUrl)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    getNames(): Observable<string[]> {
        return this.http.get(this.namesUrl)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

    getCategories(): Observable<string[]> {
        return this.http.get(this.categoriesUrl)
            .map(TaskService.extractData)
            .catch(TaskService.handleError);
    }

}
