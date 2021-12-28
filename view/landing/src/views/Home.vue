<template>
    <div class="home container">
        <section class="hero is-fullheight-with-navbar is-white">
            <div class="hero-body">
                <div class="home__animation is-flex is-justify-content-center">
                    <HomeAnimation @done="toggleHiddenElements" />
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
            <div>
                <transition name="fade-in">
                    <BackgroundPolygon v-if="showSubtitle" class="home__background-polygon" />
                </transition>
            </div>
        </Portal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Portal } from '@linusborg/vue-simple-portal';
import HomeAnimation from '@/components/HomeAnimation.vue';
import BackgroundPolygon from '@/components/svg/BackgroundPolygon.vue';

export default {
    name: 'Home',
    components: {
        BackgroundPolygon,
        HomeAnimation,
        Portal,
    },

    data: () => ({
        showSubtitle: false,
    }),

    methods: {
        ...mapMutations(['toggleNavigation']),

        toggleHiddenElements() {
            this.showSubtitle = !this.showSubtitle;
            this.toggleNavigation();
        },
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

    &__background-polygon {
        position: absolute;
        top: 60vh;
        fill: red;
        width: 100%;
        transform: scale(1.3, 1.5);

        @include widescreen {
            transform: scaleX(1.7);
        }
    }
}
</style>
