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
        <Portal>
            <transition name="fade-in">
                <div class="home__polygon-ray--container" v-if="showUpperPolygon">
                    <svg
                        class="responsive-svg home__polygon-ray home__polygon-ray--link"
                        version="1.1"
                        viewBox="0 0 1872.2 649.84"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m25.329 1178 1844.9 242.71-248.57-2191.3-1620 532.17z" />
                    </svg>
                    <svg
                        class="responsive-svg home__polygon-ray home__polygon-ray--warning"
                        version="1.1"
                        viewBox="0 0 1872.2 649.84"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m25.329 1178 1844.9 242.71-248.57-2191.3-1620 532.17z" />
                    </svg>
                    <svg
                        class="responsive-svg home__polygon-ray"
                        version="1.1"
                        viewBox="0 0 1872.2 649.84"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m25.329 1178 1844.9 242.71-248.57-2191.3-1620 532.17z" />
                    </svg>
                </div>
            </transition>
        </Portal>
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
import HomeAnimation from '@/components/HomeAnimation.vue';
// import BackgroundPolygon from '@/components/svg/BackgroundPolygon.vue';

export default {
    name: 'Home',
    components: {
        // BackgroundPolygon,
        HomeAnimation,
        Portal,
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
            if (this.$route.query.new === 'false') return;
            this.animateText = true;
        },
    },

    mounted() {
        this.checkAnimationQuery();
    },
};
</script>

<style lang="scss" scoped>
$skew-duration: 15s;
$shrink-duration: 10s;

@keyframes shrink {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0.5);
    }
}
@keyframes skew {
    0% {
        transform: skew(0deg);
    }
    10% {
        transform: skew(15deg);
    }
    50% {
        transform: scale(-0.8);
    }
    80% {
        transform: skew(0, 15deg);
    }
}
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
    &__polygon-ray {
        width: 100%;
        height: 100%;
        fill: lighten($p-pink, 4%);
        stroke-width: 10px;
        animation: skew infinite;
        animation-duration: calc($skew-duration);
        animation-timing-function: ease-out;
        position: absolute;
        opacity: 0.7;

        @include tablet {
            stroke-width: 5px;
        }
        &--link {
            fill: lighten($link, 10%);
            animation: skew infinite;
            animation-duration: calc($skew-duration * 2);
            position: absolute;
        }

        &--warning {
            fill: lighten($warning, 35%);
            animation: skew infinite;
            animation-duration: calc($skew-duration * 3);
            position: absolute;
        }

        &--container {
            top: -5rem;
            right: 15rem;

            position: absolute;
            width: 15rem;
            height: 18rem;
            z-index: 1000;
            animation: shrink $shrink-duration;
            animation-iteration-count: infinite;
            animation-direction: alternate;

            @include tablet {
                top: -2rem;
                left: 4rem;
                width: 25rem;
                height: 36rem;
            }
        }
    }
}
</style>
