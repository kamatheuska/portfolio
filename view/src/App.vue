<template>
    <div id="app" class="root">
        <main class="container root__main">
            <Navbar />
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar,
    },

    data: () => ({
        transitionName: 'fade-slide-route',
    }),
};
</script>

<style lang="scss">
.root {
    &__main {
        @include fade-slide-route-animation;
    }
}
</style>
