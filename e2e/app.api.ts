import {protractor} from 'protractor';
const http = require('http');

const FLUSH_OPTIONS = {
  host: 'localhost',
  port: 8080,
  path: '/api/v1/tasks',
  method: 'DELETE'
};

const CREATE_OPTIONS = {
  host: 'localhost',
  port: 8080,
  path: '/api/v1/tasks',
  method: 'POST'
};

export class FireflyApi {

  static DUMB_TASK: {
    name: 'Task test';
    description: 'Lorem ipsum';
    type: 0;
    module: 0;
    user_name: 'user_test';
  };

  makeRequest(options: any) {
    const deferred = protractor.promise.defer();
    const req = http.request(options, () => {
      deferred.fulfill();
    });
    req.end();
    return deferred.promise;
  }

  flushTasks() {
    return this.makeRequest(FLUSH_OPTIONS);
  }

  createTask(task) {
    const options = CREATE_OPTIONS;
    options['body'] = task;
    return this.makeRequest(options);
  }
}
