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
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
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
