<template>
    <li :class="$style.root">
        <a :class="$style.link" v-if="isExternal" :href="path"> {{ label }} </a>
        <router-link v-else :class="$style.link" :to="path">
            {{ label }}
        </router-link>
    </li>
</template>

<script lang="ts" setup>
defineProps({
    path: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    isExternal: {
        type: Boolean,
        default: false,
    },
});
</script>

<style module>
.root {
    font-size: 1rem;
}
</style>
