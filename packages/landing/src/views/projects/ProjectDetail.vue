<template>
  <div class="project-detail container">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="columns my-5">
          <div class="column is-6 is-flex is-align-items-center">
            <div class="is-flex-grow-1 has-text-right has-text-centered-mobile">
              <h1 class="title is-size-3-mobile is-size-1-tablet my-5">
                {{ project.title }}
              </h1>
            </div>
          </div>
          <div class="column is-6 is-flex-mobile is-justify-content-center">
            <div
              class="project-detail__image"
              :class="{
                'project-detail__image--has-soft-shadow': project.styles.softShadow
              }"
            >
              <figure class="image is-square">
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
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-offset-3 is-6">
          <h2 class="title is-size-4-mobile is-size-2-tablet">
            Summary
          </h2>
          <p
            v-for="(highlight, i) in project.highlights"
            :key="`highlight-${i}`"
            class="block "
          >
            {{ highlight }}
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-offset-3 is-6">
          <h3 class="title is-4 is-size-6-mobile">
            Links
          </h3>
          <ul>
            <li
              v-for="(link, i) in project.links"
              :key="`link-${i}`"
              class="mr-3 mb-2"
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
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-offset-3 is-6">
          <div
            v-if="project.tags"
            class="content block"
          >
            <h3 class="title is-4 is-size-6-mobile">
              Tech Stack
            </h3>
            <ul class="is-flex is-flex-wrap-wrap">
              <li
                v-for="(tag, i) in project.tags"
                :key="`tag-${i}`"
                class="mr-3 mb-2"
              >
                <span class="tag is-size-7">
                  {{ tag }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
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
  // margin-top:  $navbar-height;

  &__image {
    width: 300px;
    box-shadow: 4px 5px 1em -0.125em rgb(10 10 10 / 60%);

    &--has-soft-shadow {
      box-shadow: 4px 6px 1em -0.125em rgb(10 10 10 / 10%);
    }
  }
}
</style>
