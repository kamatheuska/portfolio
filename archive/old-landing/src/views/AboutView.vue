<template>
  <div
    v-if="isLoading"
    class="about container"
  />
  <div
    v-else
    class="about container"
  >
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title is-1">
            About Me
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns mb-5">
        <div class="column is-offset-1 is-4">
          <h2 class="title is-3">
            {{ about.carrer.title }}
          </h2>
          <p class="block is-size-5 about__paragraph has-text-justified">
            {{ about.carrer.texts[0] }}
          </p>
          <p class="block is-size-5 about__paragraph has-text-justified">
            {{ about.carrer.texts[1] }}
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-offset-6 is-4">
          <h2 class="title is-3">
            {{ about.passions.title }}
          </h2>
          <p class="block is-size-5 about__paragraph has-text-justified">
            {{ about.passions.texts[0] }}
          </p>
        </div>
      </div>
    </section>
    <section
      class="section is-medium"
    >
      <h2 class="title is-3 has-text-centered mb-6">
        {{ about.tech.title }}
      </h2>
      <HorizontalLevel>
        <LevelItem
          v-for="(tech, i) in about.tech.stack"
          :key="`tech-stack-${i}`"
          v-bind="tech"
        />
      </HorizontalLevel>
    </section>

    <Waves
      portal-selector="background"
      :colors="waveColors"
    />
    <Waves
      portal-selector="background"
      :colors="waveColors"
    />
  </div>
</template>

<script>
import HorizontalLevel from '@/components/layout/HorizontalLevel.vue';
import LevelItem from '@/components/LevelItem.vue';
import Waves from '@/components/svg/WavesSvg.vue';
import aboutContentFactory from '@/content/aboutFactory';
import { sleep } from '@/utils';

const waveColors = {
  '$p-blue': '#95BCCC',
  '$p-pink': '#FCDCDC',
  '$p-brown': '#988080',
  '$p-gray': '#BECEDA',
  '$p-light-brown': '#DDD4D4',
};

export default {
  name: 'AboutView',

  components: {
    HorizontalLevel,
    LevelItem,
    Waves,
  },

  data: () => ({
    about: {},
    waveColors,
    isLoading: true,
  }),

  async created() {
    this.about = aboutContentFactory({
      portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET,
    });

    await sleep(600);
    this.isLoading = false;
  },
};
</script>
<style lang="scss">
#background {
    top: 10rem;
    & > * {
        margin-bottom: 30rem;
    }
}
</style>
<style lang="scss" scoped>
.about {
    min-height: 300vh;
    .column {
        padding: 1rem;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0) 80%);
        @include tablet {
            font-size: $size-1;
        }
    }

    &__paragraph {
        @include tablet {
            font-size: $size-1;
        }
    }
}
</style>
