<template>
    <div id="app">
        <main class="container">
            <Navbar></Navbar>
            <router-view />
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

<style lang="scss"></style>
