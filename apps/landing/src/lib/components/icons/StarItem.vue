<template>
    <div @click="onItemClick" :style="rootStyles" :class="[$style.root, isHidden && $style.hidden]">
        <div :class="$style.container">
            <div :class="[$style.inner]" :style="innerCircleStyles" />
            <div :class="[$style.outer]" :style="outerCircleStyles" class="pulsar" />
            <div :class="[$style.tooltip, isActive && $style.active]">
                <tooltip-item :text="label" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, withDefaults } from 'vue';
import { animate } from 'motion';
import TooltipItem from '../tooltips/TooltipItem.vue';

export interface StarItemProps {
    id: string;
    isActive: boolean;
    isHidden: boolean;
    top?: number;
    left?: number;
    radius?: number;
    label?: string;
}

const props = withDefaults(defineProps<StarItemProps>(), {
    top: 0,
    left: 0,
    radius: 10,
    label: '',
});

const emits = defineEmits(['selected']);

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

function onItemClick() {
    emits('selected', props.id);
}

onMounted(() => {
    animate(
        '.pulsar',
        { transform: ['scale(1.9)', 'scale(1)'] },
        {
            duration: 2,
            easing: 'ease-in',
            repeat: Infinity,
            offset: [0.5, 1],
        }
    );
});
</script>

<style module>
.root {
    top: 0;
    left: 0;
    position: absolute;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
}
.container {
    position: relative;
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
.tooltip {
    position: absolute;
    top: 30px;
    color: #ccc;
    transition: transform 0.2s ease-in;
    font-size: 1.4rem;
}

.active {
    color: #6d6d6d;
    transform: scale(1.5);
}
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
