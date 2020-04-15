import { newE2EPage } from '@stencil/core/testing';

describe('app-fly-to', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-fly-to></app-fly-to>');

    const element = await page.find('app-fly-to');
    expect(element).toHaveClass('hydrated');
  });
});
