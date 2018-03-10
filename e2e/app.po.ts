import { browser, element, by } from 'protractor';

export class FireflyFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppRoot() {
    return element(by.css('app-root'));
  }
}
