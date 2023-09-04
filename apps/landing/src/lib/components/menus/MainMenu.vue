<template>
    <div>
        <div v-if="!hideMenu" :class="[$style.container, hideMenu && $style.hidden]">
            <div :class="$style.modal">
                <div :class="$style.menu">
                    <stars-menu @selected="toggleLogo" />
                </div>
            </div>
        </div>
        <div :class="$style.bars">
            <transition name="fade" mode="out-in">
                <font-awesome-icon v-if="hideMenu" icon="fa-solid fa-bars" @click="toggleMenu" />
                <font-awesome-icon v-else icon="fa-solid fa-xmark" @click="toggleMenu" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import StarsMenu from './StarsMenu.vue';

const props = defineProps({
    hideAtStart: {
        type: Boolean,
        default: true,
    },
});
const hideMenu = ref(true);
const hideLogo = ref(false);

function toggleMenu() {
    hideMenu.value = !hideMenu.value;
}

function toggleLogo() {
    hideLogo.value = !hideLogo.value;
}

onMounted(() => {
    if (!props.hideAtStart) {
        toggleMenu();
    }
});
</script>

<style module>
.container {
    position: relative;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
}
.modal {
    height: 100%;
    width: 100vw;
    position: fixed;
    background-color: var(--darkBlue);
}

.logoWrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
}
.bars {
    top: var(--default-layout-padding-right);
    right: var(--default-layout-padding-right);
    position: fixed;
    font-size: 2rem;
    color: var(--pink);
}
.logo {
    font-size: 1.7rem;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
    z-index: 1000;
}
.menu {
    z-index: 100;
}
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
