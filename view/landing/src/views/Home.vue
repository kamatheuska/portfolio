<template>
    <div class="home container">
        <section class="hero is-fullheight-with-navbar is-white">
            <div class="hero-body">
                <div class="home__animation is-flex is-justify-content-center">
                    <HomeAnimation @done="showSubtitle = true" />
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
    </div>
</template>

<script>
import HomeAnimation from '@/components/HomeAnimation.vue';

export default {
    name: 'Home',
    components: {
        HomeAnimation,
    },

    data: () => ({
        showSubtitle: false,
    }),
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
}
</style>
