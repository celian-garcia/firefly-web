import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToolbarButtonService {
    private _createTaskItemSource: Subject<number>;
    private _toggleViewItemSource: Subject<number>;
    private _createTaskItem: Observable<number>;
    private _toggleViewItem: Observable<number>;

    private _currentView = 0;

    constructor() {
        this._createTaskItemSource = new Subject<number>();
        this._toggleViewItemSource = new Subject<number>();
        this._createTaskItem = this._createTaskItemSource.asObservable();
        this._toggleViewItem = this._toggleViewItemSource.asObservable();
    }

    createTask() {
        console.log('Emit task creation event');
        this._createTaskItemSource.next(0);
    }

    toggleView() {
        console.log('Emit toggle view event');
        this._currentView++;
        this._toggleViewItemSource.next(this._currentView % 2);
    }

    subscribeCreateTask(next?: (value: number) => void, error?: (error: any) => void, complete?: () => void) {
        console.log('Subscribe to task creation event');
        return this._createTaskItem.subscribe(next, error, complete);
    }

    subscribeToggleView(next?: (value: number) => void, error?: (error: any) => void, complete?: () => void) {
        console.log('Subscribe to toggle view event');
        this._toggleViewItem.subscribe(next, error, complete);
        this._toggleViewItemSource.next(this._currentView);
    }
}
