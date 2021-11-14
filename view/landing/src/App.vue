<template>
    <div id="app" class="root">
        <main class="container root__main">
            <Navbar />
            <transition name="fade-slide-route">
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
};
</script>

<style lang="scss">
.root {
    &__main {
        @include fade-slide-route-animation;
    }
}
</style>
