<template>
    <default-layout>
        <template #content>
            <backdrop-box title="About">
                <main>
                    <p>
                        For the past years, I have been working as a developer on an
                        <a href="https://www.lidl.de" target="_blank"> e-commerce company</a>, a
                        <a href="https://www.cloudblue.com/" target="_blank">startup project</a> on a large corporation,
                        a <a href="https://www.affluent.io/">marketing focused startup</a> and a
                        <a href="https://en.c-981.com/">zero code SaaS startup</a>.
                    </p>
                    <p>
                        Although my main focus is in frontend development and its technologies, I was required to do a
                        bit of every rol and have learned a great deal about software development and working in a
                        complex team.
                    </p>
                    <p>The last few years I worked in Fullstack Development roles.</p>
                    <p>
                        I have an artistic background, studying music composition in Berlin in the Musikschule
                        Friedrichshain-Kreuzberg and the UdK Berlin. After a while, artistic endeavour wasn't enough, so
                        I decided to learn to code.
                    </p>
                    <p>
                        After all this time, I can see how the rigurosity of german music theory influence my love for
                        clean and expresive code.
                    </p>
                </main>
            </backdrop-box>
        </template>
    </default-layout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../components/layouts/DefaultLayout.vue';
import BackdropBox from '../components/BackdropBox.vue';
</script>
