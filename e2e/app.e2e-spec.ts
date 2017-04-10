import { FireflyFrontPage } from './app.po';

describe('firefly-front App', () => {
  let page: FireflyFrontPage;

  beforeEach(() => {
    page = new FireflyFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
