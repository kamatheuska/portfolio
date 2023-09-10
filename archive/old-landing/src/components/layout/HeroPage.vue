<template>
  <div class="container">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title is-1">
            {{ title }}
          </p>
        </div>
      </div>
    </section>
    <slot
      v-if="sections"
      name="content"
    >
      <section
        v-for="(section, i) in sections"
        :key="`hero-page-section-${i}`"
        class="section"
      >
        <div class="columns">
          <div class="column is-offset-3 is-6">
            <p
              v-for="(paragraph, j) in section"
              :key="`hero-page-paragraph-${i}-${j}`"
              class="block is-size-5 has-text-justified"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </section>
    </slot>
    <slot name="after-sections" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    /**
         * @description
         * should be an array of arrays
         * First array level is sections
         * Second array level is paragraphs
         */
    sections: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
