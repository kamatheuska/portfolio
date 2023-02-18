<template>
  <div class="stories">
    <HeroPage
      :title="title"
      :sections="sections"
    >
      <template #after-sections>
        <div class="columns">
          <div class="column is-offset-3 is-6">
            <LevelSection :items="items" />
          </div>
        </div>
      </template>
    </HeroPage>
  </div>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';
import LevelSection from '@/components/layout/LevelSection.vue';
import screw from '@/assets/svg/screw.svg';

const microServicesItems = [
  {
    isInternalLink: true,
    heading: 'Geometric Concertos',
    imageSrc: screw,
    link: '/stories/concertos',
    hasSmallImage: true,
  },
];

const sections = [
  [
    'One well-told story is like a legend. It changes its listeners and its time. It changes itself, when time passes, and tends to change the author, as it asks for him to forfeit his nature and set foot in the abysm of the unknown',
  ],
];

export default {
  name: 'StoriesList',
  components: {
    HeroPage,
    LevelSection,
  },

  data() {
    return {
      title: 'Stories',
      sections,
      items: microServicesItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.stories {
    min-height: calc(100vh - $footer-height - $navbar-height);
}
</style>
