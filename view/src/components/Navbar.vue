<template>
    <nav
        class="navbar is-white"
        role="navigation"
        aria-label="main navigation"
        v-click-outside="onClickOutside"
        :class="{
            'is-primary': color === 'primary',
            'is-info': color === 'info',
        }"
    >
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/" v-if="showLogo">
                <div class="navbar__logo">
                    <Logo :fill="logoFill" />
                </div>
            </router-link>
            <a
                role="button"
                class="navbar-burger"
                :class="{
                    'is-active': activeNavbar,
                }"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar"
                v-if="showLinks"
                @click="activeNavbar = !activeNavbar"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div
            id="navbar"
            class="navbar-menu"
            :class="{
                'is-active': activeNavbar,
            }"
        >
            <div class="navbar-end" v-if="showLinks">
                <template v-for="(route, i) in routes">
                    <router-link
                        v-if="!route.children"
                        class="navbar-item"
                        :to="route.path"
                        :key="`route-navbar-item${i}`"
                    >
                        {{ route.text }}
                    </router-link>

                    <div
                        class="navbar-item has-dropdown is-hoverable"
                        :key="`route-navbar-item${i}`"
                        v-else
                    >
                        <a class="navbar-link is-arrowless"> {{ route.text }} </a>

                        <div class="navbar-dropdown is-right" @click="unfocusNavbarDropdown">
                            <router-link
                                v-for="(childRoute, j) in route.children"
                                :key="`child-route-navbar-item${i}${j}`"
                                :to="childRoute.path"
                                :class="{
                                    'is-active': $route.name === childRoute.name,
                                }"
                                class="navbar-item"
                            >
                                {{ childRoute.text }}
                            </router-link>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import vClickOutside from 'v-click-outside';
import Logo from '@/components/Logo.vue';

export default {
    name: 'Navbar',
    props: {
        logoFill: {
            type: String,
        },
        showLinks: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: '',
        },
    },

    components: {
        Logo,
    },
    data: () => ({
        activeNavbar: false,
        routes: [
            {
                path: '/home',
                text: 'Home',
            },
            {
                path: '/about',
                text: 'About',
            },
            {
                text: 'Stories',
                children: [
                    {
                        path: '/stories/concertos',
                        text: 'Geometric Concertos',
                        name: 'Concertos',
                    },
                ],
            },
            {
                text: 'Services',
                children: [
                    {
                        path: '/miniservices/urlshortener',
                        text: 'URL Shortener',
                        name: 'UrlShortener',
                    },
                ],
            },
        ],
    }),

    computed: {
        showLogo() {
            return this.showLinks;
        },
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },

    methods: {
        unfocusNavbarDropdown(event) {
            event.target.blur();
        },

        onClickOutside() {
            this.hideNavbarBurgerMenu();
        },

        hideNavbarBurgerMenu() {
            this.$nextTick(() => {
                this.activeNavbar = false;
            });
        },
    },

    watch: {
        '$route.path': 'hideNavbarBurgerMenu',
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    top: 0;
    position: sticky;
    top: 0;

    &__logo {
        height: 1.5rem;
    }
}
</style>
