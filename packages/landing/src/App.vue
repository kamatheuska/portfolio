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
        <Footer />
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
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
