<template>
    <transition name="fade" mode="out-in">
        <div :class="$style.root" v-if="show">
            <div :class="$style.close">
                <font-awesome-icon @click="show = !show" :icon="['far', 'circle-xmark']" />
            </div>

            <h1>{{ title }}</h1>
            <slot></slot>
        </div>
        <h1 v-else @click="show = !show" :class="$style.title">
            {{ title }}
            <span :class="$style.open">
                <font-awesome-icon :icon="['fa', 'up-right-from-square']" />
            </span>
        </h1>
    </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
    title: String,
});

const show = ref(true);
</script>
<style module>
.root {
    padding: 1rem;
    backdrop-filter: blur(10px);
    background-color: rgba(71, 71, 71, 0.3);
}
.title {
    display: flex;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
    backdrop-filter: blur(10px);
    width: max-content;
}
.close {
    position: absolute;
    font-size: 20px;
    top: -10px;
    right: -10px;
}
.open {
    font-size: 15px;
    margin-left: 1rem;
}
</style>
