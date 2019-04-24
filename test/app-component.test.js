/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing';

import '../src/app-component';

describe('Default', () => {
  it('renders the app correctly', async () => {
    const el = await fixture(`
      <app-component></app-component>
    `);

    expect(el).dom.to.equal('<app-component></app-component>');
    expect(el).shadowDom.to.equal(`
    <chart-component>
      </chart-component>
      <a
        class="open-button"
        id="openFormLink"
      >
        Add
      </a>
      <team-strengths-form>
      </team-strengths-form>
      <a
        class="reset-button"
        id="resetLink"
      >
        Reset
      </a>
    `);
  });
});
