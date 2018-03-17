import {HttpClient} from 'protractor-http-client';
import {TaskMetadata} from '../src/app/api-firefly/data/TaskMetadata';

export class FireflyApi {

  static DUMB_TASK: TaskMetadata = <TaskMetadata>({
    name: 'Task test',
    description: 'Lorem ipsum',
    type: 0,
    module: 0,
    user_name: 'user_test'
  });

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  flushTasks() {
    return this.http.delete('/api/v1/tasks');
  }

  createTask(task: any) {
    return this.http.post('/api/v1/tasks', task);
  }
}
