<template>
    <div id="app" class="root">
        <header>
            <transition name="fade-in">
                <Navbar v-if="showNavigation" />
            </transition>
        </header>
        <main class="container">
            <transition name="fade-slide-route">
                <router-view @toggle-navigation="showNavigation = !showNavigation"></router-view>
            </transition>
        </main>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    Portfolio by Nicolas Ramirez. Source code for this website can be found on
                    <a href="https://github.com/kamatheuska/portfolio" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                </p>
                <p>
                    <strong>Barcelona, 2022 </strong>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar,
    },
    computed: {
        ...mapGetters(['showNavigation']),
    },
    methods: {
        ...mapMutations(['toggleNavigation']),
    },
    created() {
        if (this.$route.name !== 'Home') {
            this.toggleNavigation(true);
        }
    },
};
</script>
