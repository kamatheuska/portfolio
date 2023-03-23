<template>
    <div>
        <slot name="menu">
            <div>
                <main-menu :hide-at-start="hideMainMenuAtStart" />
            </div>
        </slot>
        <div :class="$style.content">
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

<style module>
.content {
    padding-top: var(--default-layout-padding-top);
    padding-left: var(--default-layout-padding-left);
    padding-right: var(--default-layout-padding-right);
}
</style>
