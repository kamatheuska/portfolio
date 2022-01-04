<template>
    <div class="home container">
        <section class="hero is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="home__animation is-flex is-justify-content-center">
                    <HomeAnimation @done:final="toggleHiddenElements" :animate:text="animateText" />
                    <div class="home__subtitle mt-5">
                        <transition name="fade-in">
                            <p v-show="showSubtitle" class="has-text-centered">
                                Software developer with a focus on Frontend development and music composition
                            </p>
                        </transition>
                    </div>
                </div>
            </div>
        </section>
        <section class="home__projects section block">
            <h1 class="title is-1 has-text-centered is-uppercase">Projects</h1>
            <ProjectCard v-for="(project, i) in projects" class="mb-3" :key="`project-card-${i}`" v-bind="project" />
        </section>
        <PolygonRayAnimation :show="showUpperPolygon" />
        <PolygonBackground portal-selector="background" :show="showSubtitle" v-bind="polygonSpecs[0]" />
        <PolygonBackground portal-selector="background" :show="showSubtitle" v-bind="polygonSpecs[2]" />
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import * as cookies from '@/constants/cookies';

import HomeAnimation from '@/components/animations/HomeAnimation.vue';
import PolygonRayAnimation from '@/components/animations/PolygonRayAnimation.vue';
import PolygonBackground from '@/components/layout/PolygonBackground.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const projects = ({ portfolioBucketUrl }) => [
    {
        highlights: [
            'Development of a DEMO environment for the recommendations vertical that would allow E2E processes and Data Scientist Analitics test to be done within the product.',
        ],
        imageSrc: `${portfolioBucketUrl}/images/projects/lidl-reco-square.jpg`,
        imageAlt: 'Lidl Reco Slider',
        title: 'Recommendations Team',
        company: 'LIDL Digital',
        tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot'],
        links: [
            {
                text: 'Project URL',
                url: 'https://www.lidl.de',
            },
            {
                text: 'Team Feedback',
                url: 'https://www.linkedin.com/in/nicolasramirezdev',
            },
        ],
        loading: 'lazy',
    },
    {
        highlights: [
            'Development and maintenance of a CMS, home page and content pages, with high performance and internationalization, scalable for different countries.',
        ],
        imageSrc: `${portfolioBucketUrl}/images/projects/lidl-content-square.jpg`,
        imageAlt: 'Lidl Reco Slider',
        title: 'Content Team',
        company: 'LIDL Digital',
        tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot', 'Docker', 'Kubernetes', 'GoogleCloud'],
        links: [
            {
                text: 'Project URL',
                url: 'https://www.lidl.de',
            },
            {
                text: 'Team Feedback',
                url: 'https://www.linkedin.com/in/nicolasramirezdev',
            },
        ],
        loading: 'lazy',
    },
    {
        highlights: [
            'Development and maintenance of a CMS, home page and content pages, with high performance and internationalization, scalable for different countries.',
        ],
        imageSrc: `${portfolioBucketUrl}/images/projects/lidl-content-square.jpg`,
        imageAlt: 'Lidl Reco Slider',
        title: 'Content Team',
        company: 'LIDL Digital',
        tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot', 'Docker', 'Kubernetes', 'GoogleCloud'],
        links: [
            {
                text: 'Project URL',
                url: 'https://www.lidl.de',
            },
            {
                text: 'Team Feedback',
                url: 'https://www.linkedin.com/in/nicolasramirezdev',
            },
        ],
        loading: 'lazy',
        isTransparent: true,
    },
];

const polygonSpecs = () => [
    {
        gradientSpecs: {
            colors: ['#95BCCC', '#DDD4D4'],
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '0'],
                ['100%', '90%'],
                ['0', '100%'],
            ],
        },
    },
    {
        gradientSpecs: {
            colors: ['#FCDCDC', '#988080'],
            angle: 'to right top',
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '30%'],
                ['100%', '80%'],
                ['0', '100%'],
            ],
        },
        marginTop: '15rem',
    },
    {
        gradientSpecs: {
            colors: ['#95BCCC', '#DDD4D4'],
            angle: 'to left top',
        },
        polygon: {
            points: [
                ['0', '10%'],
                ['100%', '15%'],
                ['100%', '80%'],
                ['0', '100%'],
            ],
        },
        height: '130vh',
        marginTop: '15rem',
    },
];
export default {
    name: 'Home',
    components: {
        HomeAnimation,
        PolygonRayAnimation,
        PolygonBackground,
        ProjectCard,
    },

    computed: {
        ...mapGetters(['isMobile']),

        isNewVisitor() {
            return this.$route.query.new === 'false' || this.$getCookie(cookies.SAW_INTRO);
        },
        projects() {
            return projects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
        },
        polygonSpecs,
    },

    data: () => ({
        showSubtitle: false,
        showUpperPolygon: false,
        animateText: false,
    }),

    methods: {
        ...mapMutations(['toggleNavigation']),

        toggleHiddenElements(show = null) {
            this.showSubtitle = show === null ? !this.showSubtitle : show;
            this.showUpperPolygon = show === null ? !this.showUpperPolygon : show;

            this.toggleNavigation(show);
        },

        checkAnimationQuery() {
            if (this.isNewVisitor) return;
            this.animateText = true;
        },
    },

    mounted() {
        this.checkAnimationQuery();

        this.$setCookie(cookies.SAW_INTRO, true);
    },
};
</script>

<style lang="scss" scoped>
$total-portal-background-height: 250vh;
.home {
    min-height: $total-portal-background-height + 100vh;
    /*
    * Bulma Overrides
    */
    .hero .hero-body {
        padding-bottom: 6rem;
    }

    &__navigation {
        min-height: 3.25rem;
    }

    &__animation {
        width: 100%;
        flex-wrap: wrap;
        & > div {
            flex-basis: 100%;
        }
    }
    &__projects {
        min-height: 200vh;
        h1 {
            grid-column: 1 / span 2;
            margin-bottom: 5rem;
            @include tablet {
                margin-bottom: 0;
            }
        }
        @include tablet {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 14rem;
            grid-auto-rows: $project-card-height-fully-opened;
            grid-column-gap: 15rem;
            grid-row-gap: 1rem;
        }
    }

    &__subtitle {
        height: 1em;
        max-width: 40ch;
    }
}
</style>
