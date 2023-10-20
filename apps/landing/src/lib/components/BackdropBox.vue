<template>
    <transition name="fade" mode="out-in">
        <div :class="[$style.root, backdrop && $style.backdrop, padding && $style.padding]" v-if="show">
            <div :class="$style.close">
                <font-awesome-icon @click="show = !show" :icon="['fa', 'bars']" />
            </div>

            <h1>
                {{ title }}
            </h1>
            <slot></slot>
        </div>
        <back-button v-else @click="show = !show" />
    </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BackButton from './BackButton.vue';

defineProps({
    title: String,
    backdrop: {
        type: Boolean,
        default: false,
    },
    padding: {
        type: Boolean,
        default: false,
    },
});

const show = ref(true);
</script>
<style module>
.root {
    position: relative;
    padding: 1rem 0;
}
.root h1 {
    backdrop-filter: blur(10px);
    max-width: max-content;
}
.backdrop {
    backdrop-filter: blur(10px);
    background-color: rgba(71, 71, 71, 0.3);
}
.padding {
    padding: 1rem;
}
.title {
    display: flex;
    align-items: center;
    padding: 1rem;
    width: max-content;
    position: fixed;
    top: 0;
}
.close {
    position: sticky;
    font-size: 20px;
    top: 10px;
    right: -10px;
    top: -1px;
    z-index: 30;
    color: var(--pink);
}
.close svg {
    position: absolute;
    right: 10px;
    top: 20px;
    font-size: 2rem;
}
.open {
    font-size: 2rem;
    margin-right: 1rem;
}
</style>
