<template>
  <div class="project-detail container is-flex is-align-items-center">
    <div class="columns my-5">
      <div class="column is-offset-2 is-4 is-flex is-align-items-center">
        <div class="is-flex-grow-1 has-text-right has-text-centered-mobile">
          <h1 class="title is-size-3-mobile is-size-1-tablet my-5">
            {{ project.title }}
          </h1>
          <p
            v-for="(highlight, i) in project.highlights"
            :key="`highlight-${i}`"
            class="block "
          >
            {{ highlight }}
          </p>
          <div
            v-if="project.links"
            class="content block"
          >
            <h3 class="title is-4 is-size-6-mobile">
              Links
            </h3>
            <ul>
              <li
                v-for="(link, i) in project.links"
                :key="`link-${i}`"
                class="mb-2"
              >
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="project.tags"
            class="content block"
          >
            <h3 class="title is-4 is-size-6-mobile">
              Tech Stack
            </h3>
            <ul class="is-flex is-flex-wrap-wrap is-justify-content-end">
              <li
                v-for="(tag, i) in project.tags"
                :key="`tag-${i}`"
                class="mb-2"
              >
                <span class="tag is-size-7">
                  {{ tag }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="column is-6 is-flex is-align-items-center">
        <div
          class="project-detail__image"
          :class="{
            'project-detail__image--has-soft-shadow': project.styles.softShadow
          }"
        >
          <figure class="image is-square is-fullwidth">
            <img
              :src="project.imageSrc"
              :alt="project.imageAlt"
              :loading="project.loading"
            >
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getProjects from '@/config/projects';

export default {
  name: 'ProjectDetailView',

  data() {
    return {
      title: 'Details',
    };
  },

  computed: {
    projects() {
      return getProjects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
    },
    project() {
      const id = this.$route.params?.id;
      return this.projects.find((project) => project.id === id);
    },
  },
};
</script>

<style lang="scss" scoped>
.project-detail {
  min-height: calc(100vh - $footer-height - $navbar-height);
  > div {
    flex: 1
  }

  &__image {
    width: 100%;
    max-width: 500px;
    box-shadow: 4px 5px 1em -0.125em rgb(10 10 10 / 60%);

    &--has-soft-shadow {
      box-shadow: 4px 6px 1em -0.125em rgb(10 10 10 / 10%);
    }
  }
}
</style>
