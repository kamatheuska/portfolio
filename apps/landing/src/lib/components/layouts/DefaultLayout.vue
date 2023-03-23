<template>
    <div>
        <slot name="menu">
            <div>
                <main-menu :hide-at-start="hideMainMenuAtStart" />
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
    hideMainMenuAtStart: {
        type: Boolean,
        default: true,
    },
});
</script>
