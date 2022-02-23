<template>
  <div class="whoami container">
    <PageHeader :title="title" />
    <BoxForm
      v-if="!result"
      submit-button-text="Ask who are you"
      @submit="fetchWhoami"
    >
      <template #description>
        <div class="block">
          <h4 class="title is-size-3">
            Description
          </h4>
          <p class="block">
            This service will tell who you - deeply inside - really are
          </p>
          <h5 class="title is-size-5">
            Endpoint:
          </h5>
          <code> /api/whoami </code>
        </div>
      </template>

      <template #preview>
        <div
          v-if="response"
          class="timestamp__preview"
        >
          <h6 class="title is-6 block">
            This is who you are. Surprise!
          </h6>
          <pre class="block">{{ response }}</pre>
          <h6 class="title is-6 block">
            How did I know? Check it out in this
            <a
              href="https://github.com/kamatheuska/portfolio/blob/master/controllers/whoami.js"
              title="Source code on Github"
              target="_blank"
            >
              link
            </a>
          </h6>
        </div>
      </template>
    </BoxForm>
  </div>
</template>

<script>
import BoxForm from '@/components/BoxForm.vue';
import PageHeader from '@/components/PageHeader.vue';
import { getWhoami } from '@/services/whoami';

// const getTimestampByDate = () => {};
export default {
  name: 'Whoami',
  components: {
    BoxForm,
    PageHeader,
  },

  data() {
    return {
      result: '',
      form: {
        date: '',
      },
      title: 'Whoami Microservice',
      response: null,
    };
  },

  methods: {
    getWhoami,
    async fetchWhoami() {
      try {
        this.response = await this.getWhoami();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
.timestamp {
    &__preview {
        @include tablet {
            width: 40rem;
        }

        pre {
            display: flex;
            align-items: center;
            min-height: 10rem;
        }
    }
}
</style>
