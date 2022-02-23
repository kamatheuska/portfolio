<template>
  <div class="intro container">
    <div
      class="intro__hero-container"
      :class="{
        'intro__hero-container--no-header': !body.show,
      }"
    >
      <transition name="fade-in-out">
        <section
          v-if="hero.show"
          class="intro__hero hero is-large"
          :class="{
            'intro__hero--dark': isHeroDark,
            'is-dark': isHeroDark,
            'intro__hero--light': !isHeroDark,
            'has-text-info': !isHeroDark,
          }"
        >
          <div class="hero-body">
            <div
              class="intro__text"
              :class="{
                'intro__text--no-flex': !hero.conclusion.show,
              }"
            >
              <transition name="fade-slide">
                <h1
                  v-if="hero.title.show"
                  class="title is-1"
                >
                  {{ hero.title.text }}
                </h1>
              </transition>
              <transition name="fade-slide">
                <p
                  v-if="hero.subtitle.show"
                  class="subtitle"
                >
                  The story of human

                  <transition name="fade-slide">
                    <span v-if="hero.currentAdjective.show">
                      {{ hero.currentAdjective.text }}
                    </span>
                  </transition>
                </p>
              </transition>
              <transition name="fade-slide">
                <h2
                  v-if="hero.conclusion.show"
                  class="title is-4"
                >
                  Let me tell your story
                </h2>
              </transition>
            </div>
          </div>
          <a
            v-if="!body.show"
            href="/"
            class="button intro__button is-light"
          > skip </a>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import { sleep } from '@/utils';
import * as cookies from '@/constants/cookies';

// const DARK_BLUE = '#186090';
const WHITE = '#fff';

export default {
  name: 'Intro',

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

  computed: {
    showNavbarLinks() {
      return this.body.show;
    },
    skipAnimation() {
      return this.$route.query.skipAnimation === 'true' || this.$getCookie(cookies.SAW_INTRO);
    },
    isHeroDark() {
      return this.hero.background === 'dark';
    },
  },

  async mounted() {
    if (this.skipAnimation) {
      await this.initIntro();
      return;
    }
    this.$setCookie(cookies.SAW_INTRO, true);
    await this.startHeroAnimation();
  },

  methods: {
    async startHeroAnimation() {
      this.$toggleBodyTheme({ isDark: true });
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
      this.$toggleBodyTheme();
      this.hero.show = false;
      await sleep(2000);
      this.hero.show = true;
      this.toggleHeroElements(['title'], false);
      this.toggleHeroElements(['conclusion']);

      await sleep(3000);
      if (!this.skipAnimation) {
        this.goHome();
      }
    },

    goHome() {
      this.$router.push('/home');
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
      await sleep(3000);
      this.goHome();
    },
  },
};
</script>

<style lang="scss" scoped>
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
        &--dark.hero {
            background-color: rgba(0, 0, 0, 0);
        }
        &--light {
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
        align-self: center;
    }
}
</style>
