<template>
    <div id="app" class="root">
        <main class="container">
            <transition name="fade-in">
                <Navbar v-if="showNavigation" />
            </transition>
            <transition name="fade-slide-route">
                <router-view @toggle-navigation="showNavigation = !showNavigation"></router-view>
            </transition>
        </main>
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
            this.toggleNavigation();
        }
    },
};
</script>
