<template>
    <div>
        <main-menu />
        <div :class="$style.container">
            <div :class="$style.content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainMenu from '../MainMenu.vue';
</script>

<style module>
.content {
    padding-top: var(--default-layout-padding-top);
    padding-left: var(--default-layout-padding-left);
    padding-right: var(--default-layout-padding-right);
}

@media (min-width: 768px) {
    .content {
        max-width: 700px;
        height: 100%;
    }
    .container {
        display: flex;
        justify-content: center;
        height: 100%;
    }
}
</style>
