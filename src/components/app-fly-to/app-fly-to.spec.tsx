import { newSpecPage } from '@stencil/core/testing';
import { AppFlyTo } from './app-fly-to';

describe('app-fly-to', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppFlyTo],
      html: `<app-fly-to></app-fly-to>`,
    });
    expect(page.root).toEqualHtml(`
      <app-fly-to>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-fly-to>
    `);
  });
});
