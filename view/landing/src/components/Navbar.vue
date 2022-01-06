<template>
    <nav
        class="navbar is-fixed-top is-spaced is-transparent"
        role="navigation"
        aria-label="main navigation"
        v-click-outside="onClickOutside"
        :class="{
            'is-primary': color === 'primary',
            'is-info': color === 'info',
            'navbar--is-active': activeNavbar,
        }"
    >
        <div class="navbar-brand">
            <router-link v-if="showLogo" to="/" class="navbar-item">
                <ScriptAnimation
                    ref="logo"
                    text="PORTFOLIO"
                    :isDark="true"
                    :transition="[{ name: 'transition-duration', value: '0.3s' }]"
                />
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
        <transition name="fade-in-fast">
            <div
                class="navbar-menu"
                :class="{
                    'is-active': activeNavbar,
                }"
                v-if="activeNavbar"
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

                        <div class="navbar-item has-dropdown is-hoverable" :key="`route-navbar-item${i}`" v-else>
                            <router-link v-if="route.path" class="navbar-link is-arrowless" :to="route.path">
                                {{ route.text }}
                            </router-link>
                            <a class="navbar-link is-arrowless" v-else> {{ route.text }} </a>

                            <div class="navbar-dropdown is-right" @click="unfocusNavbarDropdown">
                                <template v-for="(childRoute, j) in route.children">
                                    <a
                                        :key="`child-route-navbar-item${i}${j}`"
                                        :class="{
                                            'is-active': $route.name === childRoute.name,
                                        }"
                                        class="navbar-item"
                                        :href="childRoute.path"
                                        v-if="childRoute.isExternalLink"
                                    >
                                        {{ childRoute.text }}
                                    </a>
                                    <router-link
                                        :key="`child-route-navbar-item${i}${j}`"
                                        :to="childRoute.path"
                                        :class="{
                                            'is-active': $route.name === childRoute.name,
                                        }"
                                        class="navbar-item"
                                        v-else
                                    >
                                        {{ childRoute.text }}
                                    </router-link>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script>
import vClickOutside from 'v-click-outside';
import { mapGetters, mapMutations } from 'vuex';
import ScriptAnimation from '@/components/ScriptAnimation.vue';
import { isProd, sleep } from '@/utils';

const routes = [
    {
        path: '/home?new=false',
        text: 'Home',
    },
    {
        path: '/about',
        text: 'About',
    },
    {
        text: 'Stories',
        path: '/stories',
        name: 'Stories',
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
        path: '/miniservices',
        name: 'Miniservices',
        children: [
            {
                path: '/miniservices/urlshortener',
                text: 'URL Shortener',
                name: 'UrlShortener',
            },
            {
                path: '/miniservices/timestamp',
                text: 'Timestamp Generator',
                name: 'Timestamp',
            },
        ],
    },
    {
        text: 'Projects',
        children: [
            {
                path: '/projects/react',
                text: 'React Based Projects',
                isExternalLink: true,
            },
        ],
    },
];

const logoBgColor = {
    TEST: '#b9f6ff',
    PROD: '#fff',
};

export default {
    name: 'Navbar',
    components: {
        ScriptAnimation,
    },
    props: {
        showLinks: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: '',
        },
        isMobile: Boolean,
    },

    async mounted() {
        this.showNavbarMenuOnMdDevices();
        await sleep(500);
        this.toggleLogoOnHome();
        this.animateLogo();
    },

    data: () => ({
        activeNavbar: false,
        routes,
    }),

    computed: {
        ...mapGetters('navigation', ['showLogo']),
        logoBgColor() {
            return isProd() ? logoBgColor.PROD : logoBgColor.TEST;
        },
    },

    directives: {
        clickOutside: vClickOutside.directive,
    },

    methods: {
        ...mapMutations('navigation', ['toggleNav', 'toggleLogo']),

        unfocusNavbarDropdown(event) {
            event.target.blur();
        },

        showNavbarMenuOnMdDevices() {
            if (this.isMobile) return;
            this.activeNavbar = true;
        },

        toggleLogoOnHome() {
            if (this.$route.name === 'Home') this.toggleLogo(false);
            else this.toggleLogo(true);
        },

        async animateLogo() {
            if (!this.showLogo) return;
            await this.$nextTick();

            await sleep(300);

            this.$refs.logo.showText();
        },

        onClickOutside() {
            this.hideNavbarBurgerMenu();
        },

        hideNavbarBurgerMenu() {
            this.$nextTick(() => {
                if (this.isMobile) {
                    this.activeNavbar = false;
                }
            });
        },
    },

    watch: {
        '$route.path': 'hideNavbarBurgerMenu',
        '$route.name': function onRouteNameChange() {
            this.toggleLogoOnHome();
            this.animateLogo();
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    width: 100vw;

    &.navbar--is-active {
        z-index: 10000;

        @include tablet {
            z-index: 20;
        }
    }

    &-brand {
        fill: $p-gray;
        stroke: $p-gray;
        .navbar-item {
            &.is-active {
                background-color: inherit;
            }
            .script {
                transform: scale(0.7);
            }
        }
    }
    &-menu {
        // text-align: center;
        height: 100vh;

        @include tablet {
            height: auto;
        }
    }

    &-item {
        @include has-title-font;
        font-size: 1.2rem;
    }

    &-link {
        line-height: 2.5;
    }
    &-dropdown.is-right {
        @include tablet {
            height: auto;
        }
        top: -1rem;
    }
}
</style>
