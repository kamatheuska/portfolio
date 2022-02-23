<template>
  <div class="project-detail">
    <HeroPage :title="title">
      <template #after-sections>
        <div class="columns mb-5">
          <div class="column is-offset-3 is-6 has-text-centered">
            <p>...under construction...</p>
          </div>
        </div>
      </template>
    </HeroPage>
  </div>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';

export default {
  name: 'ProjectDetailView',
  components: {
    HeroPage,
  },

  data() {
    return {
      title: 'Details',
    };
  },

  mounted() {},
};
</script>

<style lang="scss">
.services {
    .level-item {
        margin-bottom: 3rem;
    }

    .level-item:last-child {
        margin-bottom: 0;
    }
}
</style>
