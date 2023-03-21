import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StoriesView from '../StoriesView.vue';

describe('StoriesView', () => {
    it('renders the MainMenu', () => {
        const wrapper = shallowMount(StoriesView, {
            global: {
                stubs: {
                    DefaultLayout: true,
                },
            },
        });

        expect(wrapper.find('default-layouts-stub')).toBeTruthy();
    });
});
