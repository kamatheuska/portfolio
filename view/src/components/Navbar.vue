<template>
    <nav
        class="navbar"
        role="navigation"
        aria-label="main navigation"
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
                <router-link to="/" class="navbar-item"> Home </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> Projects </a>

                    <div class="navbar-dropdown is-right">
                        <router-link
                            to="/concertos"
                            class="navbar-item"
                            :class="{
                                'is-active': $route.name === 'Concertos',
                            }"
                        >
                            Geometric Concertos
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
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
    }),

    computed: {
        showLogo() {
            return this.showLinks;
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    &__logo {
        height: 1.5rem;
    }
}
</style>
