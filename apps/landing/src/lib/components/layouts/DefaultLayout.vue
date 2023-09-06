<template>
    <div>
        <div>
            <main-menu :hide-at-start="hideMainMenuAtStart" />
        </div>
        <div :class="$style.container">
            <div :class="$style.content">
                <slot name="content"></slot>
            </div>
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

<style module>
.content {
    padding-top: var(--default-layout-padding-top);
    padding-left: var(--default-layout-padding-left);
    padding-right: var(--default-layout-padding-right);
}

@media (min-width: 768px) {
    .content {
        max-width: 600px;
        height: 100%;
    }
    .container {
        display: flex;
        justify-content: center;
        height: 100%;
    }
}
</style>
