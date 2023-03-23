<template>
    <div :class="[$style.root, hideMenu && $style.hidden]">
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

onMounted(() => {
    if (!props.hideAtStart) {
        hideMenu.value = false;
    }
});
</script>

<style module>
.root {
    position: relative;
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
.logo {
    font-size: 1.7rem;
}
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
