<template>
  <div class="root">
    <div data-teleport="overlay" />
    <transition name="fade-in">
      <Navbar
        v-if="showNav"
        :is-mobile="isMobile"
      />
    </transition>
    <main>
      <router-view
        v-slot="{ Component }"
        @toggle-navigation="showNav = !showNav"
      >
        <transition name="fade-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    TheFooter,
  },

  computed: {
    ...mapGetters('navigation', ['showNav']),
    ...mapGetters(['isMobile']),
  },

  created() {
    this.initApp();

    if (this.$route.name !== 'Home') {
      this.toggleNav(true);
    }
  },

  methods: {
    ...mapMutations('navigation', ['toggleNav']),
    ...mapActions(['initApp']),
  },
};
</script>
