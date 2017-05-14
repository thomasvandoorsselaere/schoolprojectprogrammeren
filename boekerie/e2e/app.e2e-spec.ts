import { BoekeriePage } from './app.po';

describe('boekerie App', () => {
  let page: BoekeriePage;

  beforeEach(() => {
    page = new BoekeriePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
