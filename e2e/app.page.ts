import {browser, element, by, ProtractorBy} from 'protractor';

export class FireflyFrontPage {
  navigateTo() {
    const browser_promise = browser.get('/');
    browser.sleep(5000);
    expect(this.getAppRoot().getTagName()).toEqual('app-root');
    return browser_promise;
  }

  getAppRoot() {
    return element(by.css('app-root'));
  }

  getAppTaskView() {
    return element(by.tagName('app-task-view'));
  }

  getAllTasksFromOverview() {
    return element.all(by.tagName('app-task-line'));
  }

  getFlushTaskButtonFromToolbar() {
    return element(by.xpath('//button[span[text()="flush tasks"]]'));
  }

  getCreateTaskButtonFromToolbar() {
    return element(by.xpath('//button[span[text()="flush tasks"]]'));
  }

  getTaskLineByPositionFromOverview(number: number) {
    return element(by.css('#task-overview-list li:nth-child(' + number + ')'));
  }
}
