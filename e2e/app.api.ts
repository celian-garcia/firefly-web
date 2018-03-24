import {HttpClient} from 'protractor-http-client';
import {TaskMetadata} from '../src/app/api-firefly/data/TaskMetadata';

export class FireflyApi {

  static DUMB_TASK: TaskMetadata = <TaskMetadata>({
    name: 'Task test',
    description: 'Lorem ipsum',
    type: 1,  // Type 'P3D': this number is not safe because the order of types could change see FS-149
    module: 0,  // Module 'Fly': this number is not safe because the order of modules could change see FS-149
    user_name: 'user_test'
  });

  static RUNNING_TASK: TaskMetadata = <TaskMetadata>({
    name: 'Task running',
    description: 'Lorem ipsum',
    type: 0,
    module: 0,
    user_name: 'user_test',
    state: 1
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
