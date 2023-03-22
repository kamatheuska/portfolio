<template>
    <div :style="rootStyles" :class="$style.root">
        <div :class="$style.container">
            <div :class="[$style.inner]" :style="innerCircleStyles" />
            <div :class="[$style.outer]" :style="outerCircleStyles" @click="onCircleClick" class="pulsar" />
            <div :class="[$style.tooltip, isActive && $style.active]">
                <tooltip-item :text="label" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, withDefaults } from 'vue';
import { animate, stagger } from 'motion';
import TooltipItem from '../tooltips/TooltipItem.vue';

export interface StarItemProps {
    id: string;
    isActive: boolean;
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

const emits = defineEmits(['activated']);

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

function onCircleClick() {
    emits('activated', props.id);
}

onMounted(() => {
    animate(
        '.pulsar',
        { scale: '1.9' },
        {
            delay: stagger(0.8),
            duration: 2,
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
}

.active {
    color: #6d6d6d;
    transform: scale(1.5);
}
</style>
