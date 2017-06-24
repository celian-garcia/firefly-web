import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Module} from './data/Module';


// TODO make an unique class for all firefly api
@Injectable()
export class ModuleService {

    private static MODULES_URL = 'api/v1/modules';  // URL to web API

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

    getModules(): Observable<Module[]> {
        return this.http.get(ModuleService.MODULES_URL)
            .map(ModuleService.extractData)
            .catch(ModuleService.handleError);
    }
}
