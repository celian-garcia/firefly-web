import * as request from 'request';

const FLUSH_OPTIONS = {
  method: 'DELETE',
  url: 'http://localhost:8080/api/v1/tasks'
};

export class FireflyApi {

  flushTasks(done) {
    request(FLUSH_OPTIONS, (error, response, body) => {
      console.log('=> error:', error); // Print the error if one occurred
      console.log('=> statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('=> body:', body); // Print the HTML for the Google homepage.
      done();
    });
  }
}