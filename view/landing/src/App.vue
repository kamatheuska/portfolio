<template>
    <div id="app" class="root">
        <transition name="fade-in">
            <Navbar v-if="showNav" :isMobile="isMobile" />
        </transition>
        <main>
            <transition name="fade-in">
                <router-view @toggle-navigation="showNav = !showNav"></router-view>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar,
    },
    computed: {
        ...mapGetters('navigation', ['showNav']),
        ...mapGetters(['isMobile']),
    },
    methods: {
        ...mapMutations('navigation', ['toggleNav']),
        ...mapActions(['initApp']),
    },
    created() {
        this.initApp();

        if (this.$route.name !== 'Home') {
            this.toggleNav(true);
        }
    },
};
</script>
