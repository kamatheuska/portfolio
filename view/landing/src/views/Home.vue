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
            <h1 class="title is-1 has-text-centered">Projects</h1>
            <ProjectCard v-for="(project, i) in projects" :key="`project-card-${i}`" v-bind="project"> </ProjectCard>
        </section>
        <PolygonRayAnimation :show="showUpperPolygon" />
        <Portal>
            <transition name="fade-in">
                <div v-if="showSubtitle" class="home__bg-polygon"></div>
            </transition>
        </Portal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Portal } from '@linusborg/vue-simple-portal';
import * as cookies from '@/constants/cookies';

import HomeAnimation from '@/components/animations/HomeAnimation.vue';
import PolygonRayAnimation from '@/components/animations/PolygonRayAnimation.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const projects = ({ portfolioBucketUrl }) => [
    {
        description:
            'Development of a DEMO environment for the recommendations vertical that would allow E2E processes and Data Scientist Analitics test to be done within the product.',
        imageSrc: `${portfolioBucketUrl}/images/projects/lidl-reco-square.jpg`,
        imageAlt: 'Lidl Reco Slider',
        title: 'Lidl Recommendations Team',
        tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot'],
        links: [
            {
                text: 'Project URL',
                url: 'https://www.lidl.de',
            },
        ],
    },
    {
        description:
            'Development and maintenance of a CMS, home page and content pages, with high performance and internationalization, scalable for different countries.',
        imageSrc: `${portfolioBucketUrl}/images/projects/lidl-content-square.jpg`,
        imageAlt: 'Lidl Reco Slider',
        title: 'Lidl Content Team',
        tags: ['VueJS', 'TypeScript', 'Express', 'Nuxt', 'SpringBoot', 'Docker', 'Kubernetes', 'GoogleCloud'],
        links: [
            {
                text: 'Project URL',
                url: 'https://www.lidl.de',
            },
        ],
    },
];

export default {
    name: 'Home',
    components: {
        HomeAnimation,
        Portal,
        PolygonRayAnimation,
        ProjectCard,
    },

    computed: {
        isNewVisitor() {
            return this.$route.query.new === 'false' || this.$getCookie(cookies.SAW_INTRO);
        },
        projects() {
            return projects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
        },
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
.home {
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
            grid-gap: 15rem;
        }
    }

    &__subtitle {
        height: 1em;
        max-width: 40ch;
    }
    &__bg-polygon {
        --path__first-point: 10%;
        --path: 0% var(--path__first-point), 100% 0, 100% 90%, 0% 100%;

        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 80vh;
        z-index: -10;
        -webkit-clip-path: polygon(var(--path));
        clip-path: polygon(var(--path));
        background: linear-gradient($p-blue, lighten($p-brown, 30%));

        @include tablet {
            --path__first-point: 20%;
        }
    }
}
</style>
