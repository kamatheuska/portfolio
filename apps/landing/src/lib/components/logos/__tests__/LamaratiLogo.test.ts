import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Logo from '../LamaratiLogo.vue';

describe('LamaratiLogo', () => {
    it('renders an svg element', () => {
        const wrapper = shallowMount(Logo);

        expect(wrapper.get('div')).toBeTruthy();
    });
});
