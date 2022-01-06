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
            <ProjectCard v-for="(project, i) in projects" class="mb-3" :key="`project-card-${i}`" v-bind="project" />
        </section>
        <PolygonRayAnimation :show="showUpperPolygon" />
        <PolygonBackground portal-selector="background" :show="showSubtitle" v-bind="polygonSpecs[0]" />
        <PolygonBackground portal-selector="background" :show="showSubtitle" v-bind="polygonSpecs[2]" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import * as cookies from '@/constants/cookies';
import getProjects from '@/config/projects';
import getPolygonSpecs from '@/config/polygons';

import HomeAnimation from '@/components/animations/HomeAnimation.vue';
import PolygonRayAnimation from '@/components/animations/PolygonRayAnimation.vue';
import PolygonBackground from '@/components/layout/PolygonBackground.vue';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
    name: 'Home',
    components: {
        HomeAnimation,
        PolygonRayAnimation,
        PolygonBackground,
        ProjectCard,
    },

    computed: {
        isNewVisitor() {
            return this.$route.query.new === 'false' || this.$getCookie(cookies.SAW_INTRO);
        },
        projects() {
            return getProjects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
        },
        polygonSpecs: getPolygonSpecs,
    },

    data: () => ({
        showSubtitle: false,
        showUpperPolygon: false,
        animateText: false,
    }),

    methods: {
        ...mapMutations('navigation', ['toggleNav', 'toggleLogo']),

        toggleHiddenElements(show = null) {
            this.showSubtitle = show === null ? !this.showSubtitle : show;
            this.showUpperPolygon = show === null ? !this.showUpperPolygon : show;

            this.toggleNav(show);
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
    min-height: $total-portal-background-height;
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
        min-height: 180vh;
        h1 {
            grid-column: 1 / span 3;
            margin-bottom: 5rem;
            @include tablet {
                margin-bottom: 0;
            }
        }
        @include tablet {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 14rem;
            grid-auto-rows: $project-card-height-fully-opened;
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
        }
        @include widescreen {
            grid-column-gap: 5rem;
        }
    }

    &__subtitle {
        height: 1em;
        max-width: 40ch;
    }
}
</style>
