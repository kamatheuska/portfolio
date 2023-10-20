<template>
    <div :class="$style.root">
        <fullscreen-layout @toggle-backdrop="showBackdrop = !showBackdrop" :show-backdrop="showBackdrop" show-menu-icon>
            <h1>Challenges</h1>
            <p>
                On this section, you will find different FreeCodeCamp Challenges. Source code for this challenges is
                available on Github
            </p>

            <ul :class="$style.list">
                <li v-for="(item, i) in challenges" :key="`challenges-link-${i}`">
                    <router-link :to="item.link">
                        <span :class="$style.link">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </fullscreen-layout>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FullscreenLayout from '../components/layouts/FullscreenLayout.vue';

const challenges = [
    {
        label: 'Url Shortener',
        link: '/challenges/shorturl',
    },
    {
        label: 'Timestamp',
        link: '/challenges/timestamp',
    },
    {
        label: 'File Metadata',
        link: '/challenges/file-metadata',
    },
];
const showBackdrop = ref(true);
</script>

<style module>
.root {
    text-align: right;
}
.root p {
    max-width: 350px;
    text-align: justify;
}

.list {
    margin-top: 0;
}
.list li a {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    justify-content: center;
}
.link {
    font-family: var(--font-family-mono);
    color: var(--lightGreen);
}
.icon {
    font-size: 2rem;
}
</style>
