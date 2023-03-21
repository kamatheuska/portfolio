import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PortfolioView from '../PortfolioView.vue';

describe('PortfolioView', () => {
    it('renders the MainMenu', () => {
        const wrapper = shallowMount(PortfolioView, {
            global: {
                stubs: {
                    DefaultLayout: true,
                },
            },
        });

        expect(wrapper.find('default-layouts-stub')).toBeTruthy();
    });
});
