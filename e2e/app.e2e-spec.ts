import {FireflyFrontPage} from './app.page';
import {FireflyApi} from './app.api';
import {browser, by, element} from 'protractor';
import {HttpClient} from 'protractor-http-client/dist/http-client';

describe('firefly-front App', () => {
  const page: FireflyFrontPage = new FireflyFrontPage();
  const httpClient = new HttpClient('http://localhost:8080/');
  httpClient.failOnHttpError = true;
  const api: FireflyApi = new FireflyApi(httpClient);
  browser.waitForAngularEnabled(false);

  // implicit and page load timeouts
  browser.manage().timeouts().pageLoadTimeout(40000);
  browser.manage().timeouts().implicitlyWait(5000);

  beforeEach(() => {
    api.flushTasks();
  });

  afterEach(() => {
    api.flushTasks();
  });

  it('should perform a task creation opening a dialog and validating', () => {
    page.navigateTo();

    element(by.xpath('//button[span[text()="create task"]]')).click();

    expect(element(by.css('mat-dialog-container')).isDisplayed()).toBeTruthy();

    element(by.css('mat-form-field input[placeholder="Nom de la tâche"]')).sendKeys('Tâche de test');
    element(by.css('mat-form-field input[placeholder="Description de la tâche"]')).sendKeys('Lorem ipsum');

    expect(element.all(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).count()).toBe(0);
    element(by.css('mat-form-field mat-select[placeholder="Sélection du module"]')).click();
    element(by.css('mat-option:first-child')).click();
    browser.sleep(500);

    expect(element.all(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).count()).toBe(1);
    element(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).click();
    element(by.css('mat-option:first-child')).click();
    browser.sleep(500);

    element(by.css('mat-form-field input[placeholder="Nom d\'utilisateur"]')).sendKeys('Utilisateur de test');

    element(by.css('mat-dialog-actions button:nth-child(2)')).click();
    expect(page.getAllTasksFromOverview().count()).toBe(1);

  });

  it('should come back to overview when task is deleted', () => {
    api.createTask(FireflyApi.DUMB_TASK);
    api.createTask(FireflyApi.DUMB_TASK);
    api.createTask(FireflyApi.DUMB_TASK);

    page.navigateTo();

    expect(page.getAllTasksFromOverview().count()).toBe(3);
    page.getTaskLineByPositionFromOverview(1).click();
    page.getFlushTaskButtonFromToolbar().click();
    browser.sleep(500);
    expect(page.getAllTasksFromOverview().count()).toBe(0);

    expect(page.getAppTaskView().isPresent()).toBe(false);
  });

  // it('should disable the run button when task is running', () => {
  //   api.createTask(FireflyApi.DUMB_TASK);
  //
  //   page.navigateTo();
  //
  //   expect(page.getAllTasksFromOverview().count()).toBe(3);
  //   page.getFlushTaskButtonFromToolbar().click();
  //   browser.sleep(500);
  //   expect(page.getAllTasksFromOverview().count()).toBe(0);
  //
  //   expect(element.all(by.tagName('app-task-view')).count()).toBe(0);
  // });
});
