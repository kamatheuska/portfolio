<template>
  <div class="projects mb-5 pb-5">
    <HeroPage
      title="Projects"
      :sections="sections"
    >
      <template #after-sections>
        <section class="section">
          <div class="columns">
            <div class="column content is-offset-3 is-6">
              <ul class="pl-5">
                <li
                  v-for="(project, i) in projects"
                  :key="`projects-${i}`"
                  class="ml-3 has-text-link"
                >
                  <router-link :to="getDetailsPage(project)">
                    {{ project.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </template>
    </HeroPage>
  </div>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';
import getProjects from '@/config/projects';

const sections = [
  [
    'Several projects are listed here. You will find references to projects done part of a product team, personal small projects based in different tech stacks and some freelance work that I have done during the years ',
  ],
];

export default {
  name: 'ProjectsList',
  components: {
    HeroPage,
  },

  data() {
    return {
      sections,
    };
  },

  computed: {
    projects() {
      return getProjects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
    },
  },
  methods: {
    getDetailsPage(project) {
      return `/projects/${project.meta.title}/${project.id}`;
    },
  },
};
</script>

<style lang="scss">
.projects {
    ul {
        li {
            list-style-type: disclosure-closed;
        }
    }
}
</style>
