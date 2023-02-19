import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NavigationRoute } from '../../../config/menus/menu.types';
import NavItem from '../NavBar.vue';

describe('NavBar', () => {
    it('renders nav items', () => {
        const navItems: NavigationRoute[] = [
            {
                href: '/foo',
                label: 'foo',
            },
            {
                href: '/feh',
                label: 'feh',
            },
        ];
        const wrapper = shallowMount(NavItem, {
            props: {
                items: navItems,
            },
            global: {
                stubs: {
                    NavItem: true,
                },
            },
        });

        expect(wrapper.findAllComponents('nav-item-stub')).toHaveLength(2);
    });
});
