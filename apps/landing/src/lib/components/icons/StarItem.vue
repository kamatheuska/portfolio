<template>
    <div @click="onItemClick" :style="rootStyles" :class="[$style.root, isHidden && $style.hidden]">
        <div :class="$style.container">
            <div :class="[$style.inner]" :style="innerCircleStyles" />
            <div :class="[$style.outer]" :style="outerCircleStyles" class="pulsar" />
            <div :class="[$style.tooltip__wrapper, isActive && $style.active]">
                <div :class="$style.tooltip">
                    <span ref="tooltipLabel"> {{ label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, withDefaults } from 'vue';
import { animate } from 'motion';

export interface StarItemProps {
    id: string;
    isActive: boolean;
    isHidden: boolean;
    top?: string;
    left?: string;
    radius?: number;
    label?: string;
    backgroundColor?: string;
}

const props = withDefaults(defineProps<StarItemProps>(), {
    top: '0',
    left: '0',
    radius: 10,
    label: '',
    backgroundColor: 'black',
});

const emits = defineEmits(['selected']);

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

function onItemClick() {
    emits('selected', props.id);
}

onMounted(() => {
    const padding = 20;
    if (tooltipLabel.value) {
        const rect = tooltipLabel.value.getBoundingClientRect();
        if (rect.right >= window.innerWidth) {
            tooltipLabel.value.style.left = `-${rect.right - window.innerWidth + padding}px`;
        }
    }

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
    font-size: 1.4rem;
}

.tooltip span {
    position: absolute;
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
