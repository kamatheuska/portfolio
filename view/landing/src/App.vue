<template>
    <div id="app" class="root">
        <main class="container">
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
