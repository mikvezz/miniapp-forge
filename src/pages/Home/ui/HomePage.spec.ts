import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import HomePage from './HomePage.vue';

describe('HomePage', () => {
  it('renders title', async () => {
    const wrapper = await mountSuspended(HomePage);
    expect(wrapper.text()).toContain('MiniApp Forge');
  });
});
