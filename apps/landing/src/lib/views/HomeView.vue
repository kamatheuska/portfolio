<template>
    <default-layout>
        <template #content>
            <main :class="$style.main">
                <h1>Hi! I am Nicolas</h1>
            </main>
        </template>
    </default-layout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../components/layouts/DefaultLayout.vue';
</script>

<style module>
.main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main h1 {
    text-transform: initial;
}
</style>
