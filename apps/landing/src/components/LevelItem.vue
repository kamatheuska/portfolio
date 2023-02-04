<template>
  <div
    class="level-item has-text-centered"
    :class="{
      'level-item--is-animated-on-hover': animateOnHover,
    }"
  >
    <template v-if="link">
      <router-link
        :to="route"
        class="link"
        :target="isInternalLink ? '' : '_blank'"
        :download="downloadName"
      >
        <p class="heading">
          {{ heading }}
        </p>
        <img
          v-if="imageSrc"
          class="level-item__image"
          :class="{ 'level-item__image--is-small': hasSmallImage }"
          :src="imageSrc"
          :alt="heading"
        >
      </router-link>
    </template>
    <template v-else>
      <div>
        <p class="heading">
          {{ heading }}
        </p>

        <img
          v-if="imageSrc"
          class="level-item__image"
          :alt="heading"
          :class="{ 'level-item__image--is-small': hasSmallImage }"
          :src="imageSrc"
        >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LevelItem',

  props: {
    imageSrc: String,
    heading: {
      type: String,
      required: true,
    },
    link: String,
    isInternalLink: {
      type: Boolean,
      default: false,
    },
    downloadName: {
      type: String,
      default: null,
    },
    hasSmallImage: {
      type: Boolean,
      default: false,
    },
    animateOnHover: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    route() {
      const route = { path: this.link };

      if (!this.isInternalLink) {
        route.beforeEnter = this.navigateBeforeEnter;
      }

      return route;
    },
  },

  methods: {
    navigateBeforeEnter() {
      window.location.href = this.link;
    },
  },
};
</script>

<style lang="scss" scoped>
.level-item {
    &--is-animated-on-hover {
        transition: transform ease-out 100ms;
        &:hover {
            transform: scale(1.5);
        }
    }
    &__image {
        height: 100px;
        &--is-small {
            height: 60px;
        }
    }

    a {
        color: black;
    }
}
</style>
