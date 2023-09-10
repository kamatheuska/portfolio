<template>
    <div :class="$style.root">
        <fullscreen-layout :show-backdrop="showBackdrop">
            <h3>Hi! My name is</h3>
            <h1>Nicolas Ramirez</h1>
            <p>I am Software Developer specilized on creating great products for the web</p>
            <ul :class="$style.list">
                <li v-for="(item, i) in social" :key="`social-link-${i}`" class="mr-2">
                    <a :href="item.link" target="_blank" :aria-label="item.title">
                        <font-awesome-icon :icon="item.iconList" />
                    </a>
                </li>
            </ul>
            <transition name="fade" mode="out-in">
                <div v-if="showStartButton">
                    <button class="button" @click="showBackdrop = !showBackdrop">Start</button>
                </div>
                <div v-else :class="$style.placeholder"></div>
            </transition>
        </fullscreen-layout>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { delay } from '../utils';
import FullscreenLayout from '../components/layouts/FullscreenLayout.vue';

const showBackdrop = ref(true);
const showStartButton = ref(false);
const social = [
    {
        link: 'mailto:nicolas@matizlab.com',
        title: 'Get in touch',
        iconList: ['fa', 'envelope'],
    },
    {
        link: 'https://www.linkedin.com/in/nicolasramirezdev',
        title: 'Link to LinkedIn Profile',
        iconList: ['fab', 'linkedin'],
    },
    {
        link: 'http://www.instagram.com/nicoramirezdev',
        title: 'Link to Instagram Profile',
        iconList: ['fab', 'instagram'],
    },
    {
        link: 'https://www.github.com/kamatheuska',
        title: 'Link to Github Profile',
        iconList: ['fab', 'github'],
    },
    {
        link: 'https://stackoverflow.com/u/7868769',
        title: 'Link to Stackoverflow Profile',
        iconList: ['fab', 'stack-overflow'],
    },
];

onMounted(async () => {
    await delay(600);
    showStartButton.value = true;
});
</script>

<style module>
.root {
    text-align: right;
}
.root h1 {
    font-size: 12vw;
    margin: 0;
}
.root h3 {
    font-size: 1.1rem;
    margin: 0;
    font-family: var(--font-family-mono);
    color: var(--lightGreen);
}
.root p {
    max-width: 300px;
}
.list {
    margin-top: 0;
    font-size: 2rem;
    display: flex;
}
.list li:not(:last-child) {
    margin-right: 1rem;
}
.root button {
    max-width: 10rem;
}
.placeholder {
    height: 3rem;
}
@media (min-width: 768px) {
    .root h1 {
        font-size: 6vw;
    }
}
</style>
