<template>
    <default-layout>
        <template #content>
            <main>
                <experience-card
                    :class="$style.card"
                    v-for="(experience, i) in experiences"
                    v-bind="experience"
                    :key="`experience-${i}`"
                />
            </main>
        </template>
    </default-layout>
</template>

<script lang="ts" setup>
import ExperienceCard, { ExperienceCardProps } from '../components/ExperienceCard.vue';
import DefaultLayout from '../components/layouts/DefaultLayout.vue';

const experiences: ExperienceCardProps[] = [
    {
        workTitle: 'Fullstack Developer - Search Team',
        company: 'LIDL Digital',
        date: '2019 — 2021',
        description:
            'Product Team responsible of Search and UI for product searches. Maintenance of lerna packages that delivered components and core Typescript functionalities on a Nexus artifactory. Internationalization and accesibility as main focus, vital for conversion on an ecommerce site.',
        tags: ['Vuejs', 'Nuxt', 'Typescript'],
        link: 'https://lidl.de',
    },
    {
        workTitle: 'Frontend Developer - Recommendations Team',
        company: 'LIDL Digital',
        date: '2019 — 2021',
        description:
            'Product Team responsible for the recommendations vertical, including Data Science and development of ML algorithms and a microfrontend component for display. Development of a DEMO environment for the recommendations vertical that allowed E2E processes and Data Scientist Analitics test to be done within the product.',
        tags: ['Express', 'Node', 'Nuxt', 'VueJS', 'SpringBoot', 'Typescript'],
        link: 'https://lidl.de',
    },
    {
        workTitle: 'Software Developer - Internal Apps',
        company: 'LIDL Digital',
        date: '2019 — 2021',
        description:
            'Maintenance of an Angular internal ecommerce tool. with DevExtreme library for Data visualization and E2E test with TestCafe',
        tags: ['Angular', 'Typescript', 'DevExtreme', 'TestCafe'],
        link: 'https://lidl.de',
    },
];
</script>
<style module>
.card:not(:last-child) {
    margin-bottom: 2.5rem;
}
</style>
