import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NavItem from '../NavItem.vue';

describe('NavItem', () => {
    it('renders a label', () => {
        const wrapper = mount(NavItem, {
            props: {
                label: 'Foo',
            },
        });

        expect(wrapper.text()).toContain('Foo');
    });

    describe('when is internal', () => {
        it('passes a path to router link', async () => {
            const wrapper = shallowMount(NavItem, {
                props: {
                    label: 'Home',
                    path: '/about',
                },

                global: {
                    stubs: ['router-link', 'router-view'],
                },
            });

            await wrapper.trigger('click');

            expect(wrapper.html()).toContain('to="/about"');
        });
    });

    describe('when is external', () => {
        it('renders an anchor with a href value', () => {
            const wrapper = shallowMount(NavItem, {
                props: {
                    label: 'Home',
                    path: '/about',
                    isExternal: true,
                },
            });

            expect(wrapper.find('a').attributes().href).toBe('/about');
        });
    });
});
