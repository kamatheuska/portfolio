<template>
  <div class="url-shortener container">
    <PageHeader :title="title" />
    <BoxForm
      v-if="!resultUrl"
      :description="explanation"
      submit-button-text="Do it"
      @submit="onSubmit"
    >
      <div class="field">
        <label
          class="label"
          for="url"
        >
          URL
          <div class="control mt-2">
            <input
              id="url"
              v-model="form.url"
              class="input"
              type="url"
              required
            >
          </div>
        </label>
      </div>
    </BoxForm>
    <section v-else>
      <div class="has-text-centered">
        <p class="block">
          Now you can access
        </p>
        <div class="url-shortener__original block p-3">
          <div class="field">
            <div class="control">
              <input
                :value="shortendOriginalUrl"
                class="input"
                disabled
              >
            </div>
          </div>
        </div>
        <p class="block">
          going to
        </p>
        <a
          :href="response.href"
          target="_blank"
        >
          <div class="url-shortener__short box has-background-primary has-text-white m-4">
            <p class="block">
              <strong> {{ resultUrl }} </strong>
            </p>
          </div>
        </a>
        <div
          class="mt-5"
          style="width: 14rem; margin: 0 auto"
        >
          <figure class="image is-square">
            <img
              alt=""
              :src="resultGifSrcImage"
            >
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { createShortUrl } from '@/services/urlShortener';
import { MAX_LENGTH_URL } from '@/constants';

import BoxForm from '@/components/BoxForm.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'UrlShortener',
  components: {
    BoxForm,
    PageHeader,
  },

  data: () => ({
    form: {
      url: '',
    },
    explanation: `
            Tired of typing long urls that you do not want to remember? Just use
            this mini service to make that long and infinite procession of characters
            into a small and well behaved one.
        `,
    resultUrl: '',
    response: {},
    title: 'Give me a shorter one',
  }),

  computed: {
    shortendOriginalUrl() {
      const url = this.response.originalUrl;
      if (url) {
        return url.length > MAX_LENGTH_URL ? url.slice(0, MAX_LENGTH_URL) : url;
      }
      return '';
    },
    resultGifSrcImage() {
      return `${this.$env.PORTFOLIO_BUCKET}/images/cartman.gif`;
    },
  },

  methods: {
    createShortUrl,

    async onSubmit() {
      try {
        const { origin } = window.location;
        this.response = await this.createShortUrl(this.form.url);
        this.resultUrl = `${origin}${this.response.href}`;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.url-shortener {
    @include tablet {
        padding-left: 0;
    }
    section {
        padding-top: 3rem;
        @include tablet {
            display: flex;
            justify-content: center;
        }
    }

    &__original {
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__short {
        transition: transform 300ms ease;
        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>
