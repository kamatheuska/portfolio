import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HomeView from '../HomeView.vue';

describe('HomeView', () => {
    it('renders the MainMenu', () => {
        const wrapper = shallowMount(HomeView, {
            global: {
                stubs: {
                    DefaultLayout: true,
                },
            },
        });

        expect(wrapper.find('default-layouts-stub')).toBeTruthy();
    });
});
