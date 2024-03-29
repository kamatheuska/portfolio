<template>
  <div class="home container">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="home__animation is-flex is-justify-content-center">
          <HomeAnimation
            :has-animated-text="animateText"
            @done:final="toggleHiddenElements"
          />
          <div class="home__subtitle mt-5">
            <transition name="fade-in">
              <p
                v-show="showSubtitle"
                class="has-text-centered"
              >
                Software developer with a focus on Frontend development and music composition
              </p>
            </transition>
          </div>
        </div>
      </div>
    </section>
    <section class="home__projects section block">
      <h1 class="title is-1 has-text-centered">
        Projects
      </h1>
      <ProjectCard
        v-for="(project, i) in projects"
        :key="`project-card-${i}`"
        class="mb-3"
        v-bind="project"
      />
    </section>
    <PolygonRayAnimation :show="showUpperPolygon" />
    <PolygonBackground
      portal-selector="background"
      :show="showSubtitle"
      v-bind="polygonSpecs[0]"
    />
    <PolygonBackground
      portal-selector="background"
      :show="showSubtitle"
      v-bind="polygonSpecs[2]"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import * as cookies from '@/constants/cookies';
import getProjects from '@/config/projects';
import getPolygonSpecs from '@/config/polygons';

import HomeAnimation from '@/components/animations/HomeAnimation.vue';
import PolygonRayAnimation from '@/components/animations/PolygonRayAnimation.vue';
import PolygonBackground from '@/components/layout/PolygonBackground.vue';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'HomeView',
  components: {
    HomeAnimation,
    PolygonRayAnimation,
    PolygonBackground,
    ProjectCard,
  },

  data: () => ({
    showSubtitle: false,
    showUpperPolygon: false,
    animateText: false,
  }),

  computed: {
    isNewVisitor() {
      return this.$route.query.new === 'false' || this.$getCookie(cookies.SAW_INTRO);
    },
    projects() {
      return getProjects({ portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET });
    },
    polygonSpecs: getPolygonSpecs,
  },

  mounted() {
    this.checkAnimationQuery();

    this.$setCookie(cookies.SAW_INTRO, true);
  },

  methods: {
    ...mapMutations('navigation', ['toggleNav', 'toggleLogo']),

    toggleHiddenElements(show = null) {
      this.showSubtitle = show === null ? !this.showSubtitle : show;
      this.showUpperPolygon = show === null ? !this.showUpperPolygon : show;

      this.toggleNav(show);
    },

    checkAnimationQuery() {
      if (this.isNewVisitor) return;
      this.animateText = true;
    },
  },
};
</script>

<style lang="scss">
body {
  position: relative;
  overflow-y: hidden;
}

#background[data-teleport="background"] {
  top: 80vh;
}
</style>

<style lang="scss" scoped>
$total-portal-background-height: 250vh;

.home {
    min-height: $total-portal-background-height;
    /*
    * Bulma Overrides
    */
    .hero .hero-body {
        padding-bottom: 6rem;
    }

    &__navigation {
        min-height: 3.25rem;
    }

    &__animation {
        width: 100%;
        flex-wrap: wrap;
        & > div {
            flex-basis: 100%;
        }
    }
    &__projects {
        min-height: 180vh;
        h1 {
            grid-column: 1 / span 3;
            margin-bottom: 5rem;
        }
        @include tablet {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
        }
        @include widescreen {
            grid-column-gap: 5rem;
        }
    }

    &__subtitle {
        height: 1em;
        max-width: 40ch;
    }
}
</style>
