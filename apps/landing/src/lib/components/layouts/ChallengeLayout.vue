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
.root {
    max-width: 350px;
}
.root p {
    text-align: justify;
}
</style>
