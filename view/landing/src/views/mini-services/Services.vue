<template>
    <div class="services">
        <HeroPage :title="title" :sections="sections">
            <template v-slot:after-sections>
                <LevelSection :items="items" />
            </template>
        </HeroPage>
    </div>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';
import LevelSection from '@/components/layout/LevelSection.vue';
import screw from '@/assets/svg/screw.svg';

const microServicesItems = [
    {
        isInternalLink: true,
        heading: 'Url Shortener',
        imageSrc: screw,
        link: '/miniservices/urlshortener',
        hasSmallImage: true,
    },
    {
        isInternalLink: true,
        heading: 'Timestamp',
        link: '/miniservices/timestamp',
        imageSrc: screw,
        hasSmallImage: true,
    },
];

const sections = [
    [
        `On this section, you will find different microservices from FreeCodeCamp
        challenges, that are mostly done as exercises to increase NodeJS backend knowledge`,

        `Microservices architecture concept is loosely used in here for practical purposes,
        since these challenges/exercises are fairly small ion the most part. It can be encompased
        en deployed along side my main project. I will provide here as well the source code for
        it, which is all open source on my github.`,
    ],
];

export default {
    name: 'ServicesView',
    components: {
        HeroPage,
        LevelSection,
    },

    data() {
        return {
            items: microServicesItems,
            title: 'Microservices',
            sections,
        };
    },
};
</script>

<style lang="scss">
.services {
    .level-item {
        margin-bottom: 3rem;
    }

    .level-item:last-child {
        margin-bottom: 0;
    }
}
</style>
