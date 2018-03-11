import {FireflyFrontPage} from './app.page';
import {FireflyApi} from './app.api';
import {browser, by, element, protractor} from 'protractor';

describe('firefly-front App', () => {
  let page: FireflyFrontPage;
  let api: FireflyApi;
  browser.waitForAngularEnabled(false);

  // implicit and page load timeouts
  browser.manage().timeouts().pageLoadTimeout(40000);
  browser.manage().timeouts().implicitlyWait(5000);

  beforeEach(() => {
    page = new FireflyFrontPage();
    api = new FireflyApi();
  });

  afterEach(done => {
    api.flushTasks(done);
  });

  it('should display app-root tag name', () => {
    page.navigateTo();
    browser.sleep(5000);
    expect(page.getAppRoot().getTagName()).toEqual('app-root');
  });

  it('should perform a task creation opening a dialog and validating', () => {
    page.navigateTo();
    browser.sleep(5000);
    expect(page.getAppRoot().getTagName()).toEqual('app-root');

    element(by.xpath('//button[span[text()="create task"]]')).click();

    expect(element(by.css('mat-dialog-container')).isDisplayed()).toBeTruthy();

    element(by.css('mat-form-field input[placeholder="Nom de la tâche"]')).sendKeys('Tâche de test');
    element(by.css('mat-form-field input[placeholder="Description de la tâche"]')).sendKeys('Lorem ipsum');

    expect(element.all(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).count()).toBe(0);
    element(by.css('mat-form-field mat-select[placeholder="Sélection du module"]')).click();
    element(by.css('mat-option:first-child')).click();

    expect(element.all(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).count()).toBe(1);
    element(by.css('mat-form-field mat-select[placeholder="Sélection du processus"]')).click();
    element(by.css('mat-option:first-child')).click();

    element(by.css('mat-form-field input[placeholder="Nom d\'utilisateur"]')).sendKeys('Utilisateur de test');

    element(by.css('mat-dialog-actions button:nth-child(2)')).click();
    expect(element.all(by.tagName('app-task-line')).count()).toBe(1);

  });
});
