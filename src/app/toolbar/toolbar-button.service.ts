import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ToolbarButtonService {

    public view$: BehaviorSubject<number>;
    private _currentView = 0;

    constructor() {
        this.view$ = new BehaviorSubject<number>(this._currentView);
    }

    toggleView() {
        console.log('Emit toggle view event');
        this._currentView++;
        this.view$.next(this._currentView % 2);
    }
}
