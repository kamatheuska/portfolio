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
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                v-if="showLinks"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end" v-if="showLinks">
                <router-link to="/" class="navbar-item"> Home </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> Projects </a>

                    <div class="navbar-dropdown is-right">
                        <router-link to="/concertos" class="navbar-item">
                            Geometric Concertos
                        </router-link>
                        <a class="navbar-item"> Elements </a>
                        <a class="navbar-item"> Components </a>
                        <hr class="navbar-divider" />
                        <div class="navbar-item">Version 0.9.2</div>
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
