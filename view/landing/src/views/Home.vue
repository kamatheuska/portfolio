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

export default {
    name: 'Home',
    components: {
        HomeAnimation,
        Portal,
        PolygonRayAnimation,
    },

    computed: {
        isNewVisitor() {
            return this.$route.query.new === 'false' || this.$getCookie(cookies.SAW_INTRO);
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
        -webkit-clip-path: polygon(var(--path));
        clip-path: polygon(var(--path));
        background: linear-gradient($p-blue, lighten($p-brown, 30%));

        @include tablet {
            --path__first-point: 20%;
        }
    }
}
</style>
