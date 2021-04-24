<template>
    <div class="intro container">
        <Navbar
            color="info"
            :showLinks="showNavbarLinks"
            :logoFill="logo.fill"
            v-if="body.show"
        ></Navbar>
        <div
            class="intro__hero-container"
            :class="{
                'intro__hero-container--no-header': !body.show,
            }"
        >
            <transition name="fade-in-out">
                <section
                    class="intro__hero hero is-large"
                    :class="{
                        'intro__hero--dark': isHeroDark,
                        'is-info': isHeroDark,
                        'intro__hero--light': !isHeroDark,
                        'has-text-info': !isHeroDark,
                    }"
                    v-if="hero.show"
                >
                    <div class="hero-body">
                        <div
                            class="intro__text"
                            :class="{
                                'intro__text--no-flex': !hero.conclusion.show,
                            }"
                        >
                            <transition name="fade-slide">
                                <h1 class="title is-1" v-if="hero.title.show">
                                    {{ hero.title.text }}
                                </h1>
                            </transition>
                            <transition name="fade-slide">
                                <p class="subtitle" v-if="hero.subtitle.show">
                                    The story of human

                                    <transition name="fade-slide">
                                        <span v-if="hero.currentAdjective.show">
                                            {{ hero.currentAdjective.text }}
                                        </span>
                                    </transition>
                                </p>
                            </transition>
                            <transition name="fade-slide">
                                <h2 class="title is-4" v-if="hero.conclusion.show">
                                    Let me tell your story
                                </h2>
                            </transition>
                        </div>
                    </div>
                    <button v-if="!body.show" class="button is-light">
                        <router-link to="/home"> skip </router-link>
                    </button>
                </section>
            </transition>
        </div>
        <!-- <transition name=" fade-in-out">
            <section class="intro__body section" v-if="body.show">
                <nav class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Tweets</p>
                            <p class="title">3,456</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Following</p>
                            <p class="title">123</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Followers</p>
                            <p class="title">456K</p>
                        </div>
                    </div>
                </nav>
            </section>
        </transition> -->
    </div>
</template>

<script>
import { sleep } from '@/utils';

import Navbar from '@/components/Navbar.vue';

// const DARK_BLUE = '#186090';
const WHITE = '#fff';

export default {
    name: 'Intro',

    components: {
        Navbar,
    },

    computed: {
        showNavbarLinks() {
            return this.body.show;
        },
        skipAnimation() {
            return this.$route.query.skipAnimation === 'true';
        },
        isHeroDark() {
            return this.hero.background === 'dark';
        },
    },

    data: () => ({
        hero: {
            show: false,
            background: 'dark',
            title: {
                text: 'software developing is telling a story.',
                show: false,
            },
            currentAdjective: {
                text: '',
                show: false,
            },
            subtitle: {
                show: false,
            },
            conclusion: {
                show: false,
            },
        },
        body: {
            show: false,
        },
        logo: {
            fill: WHITE,
        },
    }),

    async mounted() {
        if (this.skipAnimation) {
            await this.initIntro();
            return;
        }
        await this.startHeroAnimation();
    },

    methods: {
        async startHeroAnimation() {
            this.hero.show = true;
            await sleep(2000);
            this.toggleHeroElements('title');
            await sleep(2000);
            this.toggleHeroElements('subtitle');
            await this.animatedAdjectiveFadeInOut('ingenuity');
            await this.animatedAdjectiveFadeInOut('curiosity');
            await this.animatedAdjectiveFadeInOut('solidarity');
            await this.animatedAdjectiveFadeIn('development', 1000);
            await sleep(1000);
            this.toggleHeroElements(['title', 'subtitle'], false);
            this.hero.background = 'light';
            this.hero.show = false;
            await sleep(2000);
            this.hero.show = true;
            this.toggleHeroElements(['title'], false);
            this.toggleHeroElements(['conclusion']);

            await sleep(3000);
            this.body.show = true;
        },

        async animatedAdjectiveFadeInOut(word, delay = 800) {
            await sleep(delay);
            this.replaceAndShowAdjective(word);
            await sleep(delay);
            this.toggleHeroElements('currentAdjective', false);
        },

        async animatedTitleFadeInOut(word, delay = 1200) {
            await sleep(delay);
            this.replaceAndShowTitle(word);
            await sleep(delay);
            this.toggleHeroElements('currentAdjective', false);
        },

        async animatedAdjectiveFadeIn(word, delay = 500) {
            await sleep(delay);
            this.replaceAndShowAdjective(word);
        },

        replaceAndShowAdjective(adjective) {
            this.hero.currentAdjective.text = adjective;
            this.toggleHeroElements('currentAdjective');
        },

        replaceAndShowTitle(adjective) {
            this.hero.title.text = adjective;
            this.toggleHeroElements('title');
        },

        /**
         * @param {Array<string> | string} heroElements
         * @param {Boolean} toggle
         */
        toggleHeroElements(heroElements, toggle = true) {
            if (typeof heroElements === 'string') {
                this.hero[heroElements].show = toggle;
            } else {
                heroElements.forEach((heroElement) => {
                    this.hero[heroElement].show = toggle;
                });
            }
        },

        async initIntro() {
            this.body.show = true;
            this.hero.show = true;
            this.hero.background = 'light';
            this.toggleHeroElements(['conclusion']);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/animations';
@import '~@/assets/styles/abstracts/mixins';
@import '~bulma/sass/utilities/derived-variables';
.intro {
    @include fade-in-out-animation;
    @include fade-slide-animation;
    .hero {
        @media screen and (min-width: $tablet) {
            border-radius: 5px;
        }
    }
    &__hero {
        @include is-fullheight-with-navbar;

        @media screen and (min-width: $tablet) {
            min-height: 750px;
        }

        .hero-body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 0;
        }

        &-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &--no-header {
                height: 100vh;
            }
            @media screen and (min-width: $tablet) {
                @include is-fullheight-with-navbar;
            }
        }
        &--dark {
            background: linear-gradient(90deg, darken($info, 40%), darken($info, 30%));
        }
        &--light {
            background: white;
            p,
            h1,
            h2 {
                color: darken($info, 20%);
            }
        }
    }
    &__text {
        min-height: 20rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &--no-flex {
            display: block;
        }

        @media screen and (min-width: $tablet) {
            min-height: inherit;
        }
    }
    &__button {
        position: absolute;
        bottom: 2rem;
        z-index: 1;
    }
}
</style>
