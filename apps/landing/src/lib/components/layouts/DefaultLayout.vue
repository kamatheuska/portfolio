<template>
    <div>
        <slot name="menu">
            <div :class="hideMenu && $style.hidden">
                <main-menu />
            </div>
        </slot>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import MainMenu from '../menus/MainMenu.vue';
const props = defineProps({
    hideMainMenuAtStart: {
        type: Boolean,
        default: true,
    },
});

const hideMenu = ref(true);

onMounted(() => {
    if (!props.hideMainMenuAtStart) {
        hideMenu.value = false;
    }
});
</script>

<style module>
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
