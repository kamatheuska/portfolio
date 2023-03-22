import { shallowMount } from '@vue/test-utils';

import { describe, it, expect } from 'vitest';
import MainMenu from '../MainMenu.vue';

describe('MainMenu', () => {
    it('renders the Lamarati logo', () => {
        const wrapper = shallowMount(MainMenu, {
            global: {
                stubs: {
                    LamaratiLogo: true,
                },
            },
        });

        expect(wrapper.get('lamarati-logo-stub')).toBeTruthy();
    });
});
