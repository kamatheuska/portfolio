import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AboutView from '../AboutView.vue';

describe('AboutView', () => {
    it('renders the MainMenu', () => {
        const wrapper = shallowMount(AboutView, {
            global: {
                stubs: {
                    DefaultLayout: true,
                },
            },
        });

        expect(wrapper.find('default-layouts-stub')).toBeTruthy();
    });
});
