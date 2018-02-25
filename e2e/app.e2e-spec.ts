import { FireflyFrontPage } from './app.po';
import {browser, by, element, protractor} from 'protractor';

describe('firefly-front App', () => {
  let page: FireflyFrontPage;
  browser.waitForAngularEnabled(false);

  // implicit and page load timeouts
  browser.manage().timeouts().pageLoadTimeout(5000);
  browser.manage().timeouts().implicitlyWait(5000);

  beforeEach(() => {
    page = new FireflyFrontPage();
  });

  it('should display app-root tag name', () => {
    page.navigateTo();
    browser.sleep(5000);
    expect(page.getAppRoot().getTagName()).toEqual('app-root');
  });
});
