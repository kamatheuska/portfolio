import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DefaultLayout from '../DefaultLayout.vue';

describe('DefaultLayout', () => {
    it('renders the MainMenu', () => {
        const wrapper = shallowMount(DefaultLayout, {
            global: {
                stubs: {
                    MainMenu: true,
                },
            },
        });

        expect(wrapper.find('main-menu-stub')).toBeTruthy();
    });

    describe('when passing a menu as slot', () => {
        it('renders the passed menu', () => {
            const wrapper = shallowMount(DefaultLayout, {
                slots: {
                    menu: '<header>Another Menu</header>',
                },
                global: {
                    stubs: {
                        MainMenu: true,
                    },
                },
            });

            expect(wrapper.find('header').text()).toContain('Another Menu');
        });
    });

    describe('when passing content as slot', () => {
        it('renders the passed content', () => {
            const wrapper = shallowMount(DefaultLayout, {
                slots: {
                    content: '<main>Some content</main>',
                },
                global: {
                    stubs: {
                        MainMenu: true,
                    },
                },
            });

            expect(wrapper.find('main').text()).toContain('Some content');
        });
    });
});
