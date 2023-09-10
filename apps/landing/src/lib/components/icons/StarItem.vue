<template>
    <div :style="rootStyles" :class="[$style.root, isHidden && $style.hidden]">
        <div :class="$style.container">
            <div :class="[$style.inner]" :style="innerCircleStyles" />
            <div :class="[$style.outer]" :style="outerCircleStyles" class="pulsar" :id="pulsarId" />
            <div v-if="label" :class="[$style.tooltip__wrapper, isActive && $style.active]">
                <div :class="$style.tooltip">
                    <router-link :to="{ name: label }">
                        <span ref="tooltipLabel"> {{ label }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { animate } from 'motion';
import { getRandomNumber } from '../../utils';

export interface StarItemProps {
    id: string;
    isActive?: boolean;
    isHidden?: boolean;
    top?: string;
    left?: string;
    radius?: number;
    label?: string;
    backgroundColor?: string;
}

const props = withDefaults(defineProps<StarItemProps>(), {
    isActive: false,
    isHidden: true,
    top: '0',
    left: '0',
    radius: 10,
    label: '',
    backgroundColor: 'black',
});

const rootStyles = computed(() => ({
    top: props.top,
    left: props.left,
    color: props.backgroundColor,
}));

const innerCircleStyles = computed(() => ({
    width: `${props.radius}px`,
    height: `${props.radius}px`,
    backgroundColor: props.backgroundColor,
}));

const outerCircleStyles = computed(() => ({
    width: `${props.radius + 5}px`,
    height: `${props.radius + 5}px`,
    backgroundColor: props.backgroundColor,
}));

const tooltipLabel = ref<InstanceType<typeof HTMLElement> | null>(null);
const pulsarId = `outer-pulsar-${props.id}`;

onMounted(() => {
    const PADDING = 20;
    if (tooltipLabel.value) {
        const rect = tooltipLabel.value.getBoundingClientRect();
        if (rect.right >= window.innerWidth) {
            tooltipLabel.value.style.left = `-${rect.right - window.innerWidth + PADDING}px`;
        }
    }
    const delay = getRandomNumber(10, 100) / 100;

    animate(
        `#${pulsarId}`,
        { transform: [null, 'scale(1.9)'], opacity: [null, 0] },
        {
            delay,
            duration: 2,
            easing: 'ease-out',
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
}
.outer {
    position: absolute;
    background-color: #9a9a9a;
    opacity: 0.3;
    border-radius: 50%;
}
.tooltip__wrapper {
    position: absolute;
    top: 30px;
    color: inherit;
    transition: transform 0.2s ease-in;
}

.tooltip span {
    position: absolute;
    color: var(--pink);
    text-transform: uppercase;
    font-weight: 900;
    font-family: var(--font-family-mono);
    letter-spacing: 3px;
}
.active {
    color: white;
    transform: scale(1.5);
}
.hidden {
    visibility: hidden;
    opacity: 0;
}
</style>
