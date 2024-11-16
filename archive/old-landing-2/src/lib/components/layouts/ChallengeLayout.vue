<template>
    <fullscreen-layout @toggle-backdrop="showBackdrop = !showBackdrop" :show-backdrop="showBackdrop" show-menu-icon>
        <div :class="$style.root">
            <slot />
        </div>
    </fullscreen-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FullscreenLayout from '../../components/layouts/FullscreenLayout.vue';

const showBackdrop = ref(true);
</script>

<style module>
pre {
    display: flex;
    align-items: center;
    min-height: 7rem;
    background-color: var(--darkerBlue);
    border-radius: 10px;
    font-size: 0.875em;
    overflow-x: auto;
    padding: 1.25rem 1.5rem;
    white-space: pre;
    word-wrap: normal;
}
.root {
    max-width: 350px;
}
.root p {
    text-align: justify;
}
</style>
