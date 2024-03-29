<template>
    <default-layout>
        <template #content>
            <backdrop-box title="Experience" :has-backdrop="false">
                <main>
                    <ul>
                        <li :class="$style.card" v-for="(experience, i) in experiences" :key="`experience-${i}`">
                            <experience-card v-bind="experience" />
                        </li>
                    </ul>
                </main>
            </backdrop-box>
        </template>
    </default-layout>
</template>

<script lang="ts" setup>
import BackdropBox from '../components/BackdropBox.vue';
import ExperienceCard, { ExperienceCardProps } from '../components/ExperienceCard.vue';
import DefaultLayout from '../components/layouts/DefaultLayout.vue';

const experiences: ExperienceCardProps[] = [
    {
        workTitle: 'Software Developer',
        company: 'C-981',
        date: 'Jan 2023 — Jul 2023',
        description:
            'Responsible of full-stack software development, from requirements analysis to coding, testing, and deployment of a No-Code application with React, MongoDB and NodeJS with Fastify.',
        tags: ['Typescript', 'Fastify', 'React', 'Azure', 'Node.js', 'MongoDB'],
        link: 'https://c-981.com',
    },
    {
        workTitle: 'Freelance Fullstack Developer',
        company: 'Revands',
        date: 'Oct 2022 — Jan 2023',
        description:
            'Develop of a fullstack in house application for a state office that mantains pets, owners and veterinarian agencies on a city in the US. I worked on the concept of the app, setup of a server on AWS with EC2, where we installed MariaDB, Docker and a stack of NGINX and NodeJS + Express for the api, with standards of security and following a DDD pattern with controllers, services and repositories.',
        tags: ['Docker', 'MariaDB', 'Typescript'],
    },
    {
        workTitle: 'Freelance Fullstack Developer',
        company: 'MatizBCN',
        date: 'Sept 2022 — Dic 2022',
        description:
            'Develop of a new frontend for the matizbcn.com website that levers Shopify Storefront API as a backend to serve data to a Nuxt generated ecommerce platform, very performant and extensible, and using Netlify as deployment tool as well as CDN for the website.',
        tags: ['Shopify', 'Nuxt.js', 'Netlify'],
        link: 'https://matizbcn.com',
    },
    {
        workTitle: 'Fullstack Developer',
        company: 'Affluent',
        date: 'May 2022 — Oct 2022',
        description:
            'Responsible for maintaining and extending the code base of an app that delivered customisable graphs and reports from different data sources, to affiliate marketing agencies.',
        tags: ['TypeScript', 'VueJS', 'NodeJS', 'JavaScript', 'SQL'],
        link: 'https://www.affluent.io',
    },
    {
        workTitle: 'Software Developer',
        company: 'Cloudblue',
        date: 'Jul 2021 — Abr 2022',
        description:
            'Work as a Frontend Developer on company product, on a SPA based on Vuetify and Ramda Libraries. Maintainer of E2E scenarios with Cypress, focusing on Functional Programming Paradigms and building a BDD wrapper of cypress to allow fast development of e2e scenarios on a complex SPA without a high knowledge of cypress.',
        tags: ['Javascript', 'VueJS', 'Webpack', 'Node', 'Cypress', 'Vuex', 'Vuetify', 'Ramda', 'SASS'],
        link: 'https://www.cloudblue.com',
    },
    {
        workTitle: 'Fullstack Developer - Search Team',
        company: 'LIDL Digital',
        date: 'Jan 2019 — Jul 2021',
        description:
            'Product Team responsible of Search and UI for product searches. Maintenance of lerna packages that delivered components and core Typescript functionalities on a Nexus artifactory. Internationalization and accesibility as main focus, vital for conversion on an ecommerce site.',
        tags: ['VueJS', 'Nuxt', 'Typescript', 'SpringBoot'],
        link: 'https://lidl.de',
    },
    {
        workTitle: 'Frontend Developer - Recommendations Team',
        company: 'LIDL Digital',
        date: 'Jan 2019 — Jul 2021',
        description:
            'Product Team responsible for the recommendations vertical, including Data Science and development of ML algorithms and a microfrontend component for display. Development of a DEMO environment for the recommendations vertical that allowed E2E processes and Data Scientist Analitics test to be done within the product.',
        tags: ['Nuxt', 'VueJS', 'Express', 'Node', 'Typescript'],
        link: 'https://lidl.de',
    },
    {
        workTitle: 'Frontend Developer - Internal Apps',
        company: 'LIDL Digital',
        date: 'Jan 2019 — Jul 2021',
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
