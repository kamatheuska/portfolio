<template>
    <div :class="$style.root">
        <fullscreen-layout>
            <h1>Challenges</h1>
            <p>
                On this section, you will find different FreeCodeCamp Challenges. Source code for this challenges is
                available on Github
            </p>
        </fullscreen-layout>
    </div>
</template>

<script lang="ts" setup>
import FullscreenLayout from '../components/layouts/FullscreenLayout.vue';
</script>

<style module>
.root {
    text-align: right;
}
.root p {
    max-width: 350px;
    text-align: justify;
}
</style>
