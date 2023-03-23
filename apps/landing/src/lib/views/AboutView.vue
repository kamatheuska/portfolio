<template>
    <default-layout>
        <template #content>
            <main :class="$style.main">
                <h1>About Me</h1>
                <p>
                    For the past five years, I have been working as a Fullstack Developer on an e-commerce company.
                    Although my main focus is in frontend development and its technologies, I was required to do a bit
                    of every rol and have learned a great deal about software development and working in a complex team.
                </p>
                <p>
                    I have an artistic background, studying music composition in Berlin in the Musikschule
                    Friedrichshain-Kreuzberg and the UdK Berlin. After a while, artistic endeavour wasn't enough, so I
                    decided to learn to code.
                </p>
                <p>
                    Almost five years after, I can see how the rigurosity of german music theory influence my love for
                    clean and expresive code.
                </p>
            </main>
        </template>
    </default-layout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../components/layouts/DefaultLayout.vue';
</script>

<style module>
.main {
    padding-top: 5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
}
</style>
