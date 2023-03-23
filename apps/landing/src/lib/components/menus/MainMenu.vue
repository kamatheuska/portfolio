<template>
    <div>
        <div :class="[$style.menu, hideMenu && $style.hidden]">
            <div :class="$style.modal">
                <div :class="$style.container">
                    <div :class="$style.logo">
                        <personal-logo />
                    </div>
                </div>
            </div>
            <div>
                <stars-menu />
            </div>
        </div>
        <div :class="$style.bars">
            <font-awesome-icon icon="fa-solid fa-bars" @click="toggleMenu" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import PersonalLogo from '../logos/PersonalLogo.vue';
import StarsMenu from './StarsMenu.vue';

const props = defineProps({
    hideAtStart: {
        type: Boolean,
        default: true,
    },
});

const hideMenu = ref(true);

function toggleMenu() {
    hideMenu.value = !hideMenu.value;
}

onMounted(() => {
    if (!props.hideAtStart) {
        toggleMenu();
    }
});
</script>

<style module>
.menu {
    position: relative;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
}
.modal {
    height: 100%;
    width: 100vw;
    position: fixed;
    background-color: white;
}

.container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.bars {
    top: var(--default-layout-padding-right);
    right: var(--default-layout-padding-right);
    position: fixed;
    font-size: 2rem;
}
.logo {
    font-size: 1.7rem;
}
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
