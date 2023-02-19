<template>
    <div :class="$style.root">
        <LamaratiLogo />
        <NavBar :items="navigationConfig" />
    </div>
</template>

<script lang="ts" setup>
import { navigationConfig } from '../../config/menus/navigation.menu';
import NavBar from '../navbar/NavBar.vue';
</script>

<style module>
.root {
}
</style>
