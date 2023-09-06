<template>
    <div>
        <div>
            <main-menu />
        </div>
        <transition name="fade">
            <div :class="$style.backdrop" v-if="showMain">
                <main :class="$style.main">
                    <h3>Hi! My name is</h3>
                    <h1>Nicolas Ramirez</h1>
                    <p>I am Software Developer specilized on web apps, APIs and great quality code</p>
                    <transition name="fade" mode="out-in">
                        <button v-if="showStartButton" class="button" @click="showMain = !showMain">Start</button>
                        <div v-else :class="$style.placeholder"></div>
                    </transition>
                </main>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import MainMenu from '../components/menus/MainMenu.vue';
import { delay } from '../utils';

const showMain = ref(true);
const showStartButton = ref(false);

onMounted(async () => {
    await delay(1000);
    showStartButton.value = true;
});
</script>

<style module>
.backdrop {
    backdrop-filter: blur(5px);
    width: 100%;
}
.main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 1rem;
    flex-direction: column;
    position: relative;
}
.main h1 {
    text-transform: initial;
    font-size: 3rem;
    margin-top: 0;
}
.main h3 {
    font-size: 1.1rem;
    margin: 0;
    font-family: var(--font-family-mono);
    color: var(--lightGreen);
}
.main p {
    margin-bottom: 3rem;
    max-width: 300px;
    text-align: right;
}
.main button {
    max-width: 10rem;
}
.placeholder {
    height: 3rem;
}
@media (min-width: 768px) {
    .main {
        max-width: 50%;
    }
}
</style>
