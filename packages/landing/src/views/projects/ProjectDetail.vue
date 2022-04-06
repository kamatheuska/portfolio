<template>
  <div class="project-detail container">
    <PageHeader
      :title="project.title"
      :is-centered="true"
    />
    <div class="columns mb-5">
      <div class="column is-6 has-text-centered is-flex is-justify-content-end">
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
      <div class="column is-6">
        test
      </div>
    </div>
  </div>
</template>

<script>
import getProjects from '@/config/projects';

import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'ProjectDetailView',
  components: {
    PageHeader,
  },

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
