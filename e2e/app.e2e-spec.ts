import { ElectrosnapPage } from './app.po';

describe('electrosnap App', () => {
  let page: ElectrosnapPage;

  beforeEach(() => {
    page = new ElectrosnapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
