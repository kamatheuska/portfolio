<template>
    <div>
        <slot name="menu">
            <div v-if="showMainMenu">
                <main-menu />
            </div>
        </slot>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainMenu from '../menus/MainMenu.vue';
defineProps({
    showMainMenu: {
        type: Boolean,
        default: false,
    },
});
</script>
