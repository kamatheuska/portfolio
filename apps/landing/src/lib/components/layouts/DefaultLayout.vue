<template>
    <div>
        <slot name="menu">
            <main-menu />
        </slot>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainMenu from '../menus/MainMenu.vue';
</script>
