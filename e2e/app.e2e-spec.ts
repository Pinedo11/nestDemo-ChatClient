import { NestClientPage } from './app.po';

describe('nest-client App', () => {
  let page:NestClientPage;

  beforeEach(() => {
    page = new NestClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
