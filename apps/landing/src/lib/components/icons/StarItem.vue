<template>
    <div :style="rootStyles" :class="$style.root">
        <div :class="$style.container">
            <div :class="[$style.inner]" :style="innerCircleStyles" />
            <div :class="[$style.outer]" :style="outerCircleStyles" class="pulsar" />
        </div>
        <!-- <svg :width="itemWidth" :height="itemWidth" xmlns="http://www.w3.org/2000/svg">
            <circle @click="onCircleClick" :class="$style.circle" :cx="itemXPosition" :cy="itemXPosition" :r="radius" />
        </svg> -->
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { animate, stagger } from 'motion';

const props = defineProps({
    top: {
        type: Number,
        default: 0,
    },
    left: {
        type: Number,
        default: 0,
    },
    radius: {
        type: Number,
        default: 10,
    },
});

const rootStyles = computed(() => ({
    top: `${props.top}px`,
    left: `${props.left}px`,
}));

const innerCircleStyles = computed(() => ({
    width: `${props.radius}px`,
    height: `${props.radius}px`,
}));
const outerCircleStyles = computed(() => ({
    width: `${props.radius + 5}px`,
    height: `${props.radius + 5}px`,
}));

// const outerCircleRadius = ref(0);

// function onCircleClick() {
//     console.log('test');
//     outerCircleRadius.value = props.radius * 3;
// }

onMounted(() => {
    animate(
        '.pulsar',
        { scale: '1.6' },
        {
            delay: stagger(0.4),
            duration: 1,
            repeat: Infinity,
        }
    );
});
</script>

<style module>
.root {
    top: 0;
    left: 0;
    position: absolute;
}
.container {
    position: relative;
    height: 50px;
    width: 50px;
}
.inner {
    position: absolute;
    background-color: #000000;
    border-radius: 50%;
    opacity: 0.6;
}
.outer {
    position: absolute;
    background-color: #9a9a9a;
    opacity: 0.3;
    border-radius: 50%;
}
</style>
