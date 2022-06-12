<template>
  <nav
    v-click-outside="onClickOutside"
    class="navbar is-fixed-top is-spaced is-transparent"
    role="navigation"
    aria-label="main navigation"
    :class="{
      'is-primary': color === 'primary',
      'is-info': color === 'info',
      'navbar--is-active': activeNavbar,
    }"
  >
    <div class="navbar-brand">
      <router-link
        v-if="showLogo"
        to="/"
        class="navbar-item"
      >
        <ScriptAnimation
          ref="logo"
          text="PORTFOLIO"
          :is-dark="true"
          :transition="[{ name: 'transition-duration', value: '0.3s' }]"
        />
      </router-link>
      <button
        v-if="showLinks"
        class="navbar-burger"
        :class="{
          'is-active': activeNavbar,
        }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        @click="activeNavbar = !activeNavbar"
        @keypress.enter="activeNavbar = !activeNavbar"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>
    <transition name="fade-in-fast">
      <div
        v-if="activeNavbar"
        class="navbar-menu"
        :class="{
          'is-active': activeNavbar,
        }"
      >
        <div
          v-if="showLinks"
          class="navbar-end"
        >
          <template v-for="(route, i) in routes">
            <router-link
              v-if="!route.children"
              :key="`route-navbar-item${i}`"
              class="navbar-item"
              :to="route.path"
            >
              {{ route.text }}
            </router-link>

            <div
              v-else
              :key="`route-navbar-item${i}`"
              class="navbar-item has-dropdown is-hoverable"
            >
              <router-link
                v-if="route.path"
                class="navbar-link is-arrowless"
                :to="route.path"
              >
                {{ route.text }}
              </router-link>
              <a
                v-else
                class="navbar-link is-arrowless"
              > {{ route.text }} </a>

              <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
              <div
                class="navbar-dropdown is-right"
                @click="unfocusNavbarDropdown"
              >
                <template v-for="(childRoute, j) in route.children">
                  <a
                    v-if="childRoute.isExternalLink"
                    :key="`child-route-navbar-item${i}${j}`"
                    :class="{
                      'is-active': $route.name === childRoute.name,
                    }"
                    class="navbar-item"
                    :href="childRoute.path"
                  >
                    {{ childRoute.text }}
                  </a>
                  <router-link
                    v-else
                    :key="`child-route-navbar-item${i}${j}`"
                    :to="childRoute.path"
                    :class="{
                      'is-active': $route.name === childRoute.name,
                    }"
                    class="navbar-item"
                  >
                    {{ childRoute.text }}
                  </router-link>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import vClickOutside from 'v-click-outside';
import { mapGetters, mapMutations } from 'vuex';
import ScriptAnimation from '@/components/animations/ScriptAnimation.vue';
import { isProd, sleep } from '@/utils';

const routes = [
  {
    path: '/home?new=false',
    text: 'Home',
  },
  {
    path: '/about',
    text: 'About',
  },
  {
    text: 'Stories',
    path: '/stories',
    name: 'Stories',
  },
  {
    text: 'Services',
    path: '/miniservices',
    name: 'Miniservices',
  },
  {
    text: 'Projects',
    path: '/projects',
    name: 'Projects',
    children: [
      {
        path: '/projects/react',
        text: 'React Projects',
        isExternalLink: true,
      },
      {
        path: '/projects/react/drum-machine',
        text: 'Drum Machine',
        isExternalLink: true,
      },
      {
        path: '/projects/react/markdown-previewer',
        text: 'Markdown Previewer',
        isExternalLink: true,
      },
      {
        path: '/projects/react/calculator',
        text: 'JS Calculator',
        isExternalLink: true,
      },
      {
        path: '/projects/react/drum-machine',
        text: 'Drum Machine',
        isExternalLink: true,
      },
      {
        path: '/miniservices/urlshortener',
        text: 'URL Shortener',
        name: 'UrlShortener',
      },
      {
        path: '/miniservices/timestamp',
        text: 'Timestamp Generator',
        name: 'Timestamp',
      },
      {
        path: '/miniservices/Whoami',
        text: 'Who Am I',
        name: 'Whoami',
      },
      {
        path: '/stories/concertos',
        text: 'Geometric Concertos',
        name: 'Concertos',
      },
    ],
  },
];

const logoBgColor = {
  TEST: '#b9f6ff',
  PROD: '#fff',
};

export default {
  name: 'NavBar',

  components: {
    ScriptAnimation,
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: {
    showLinks: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '',
    },
    isMobile: Boolean,
  },

  data: () => ({
    activeNavbar: false,
    routes,
  }),

  computed: {
    ...mapGetters('navigation', ['showLogo']),
    logoBgColor() {
      return isProd() ? logoBgColor.PROD : logoBgColor.TEST;
    },
  },

  watch: {
    '$route.path': 'hideNavbarBurgerMenu',
    '$route.name': function onRouteNameChange() {
      this.toggleLogoOnHome();
      this.animateLogo();
    },
  },

  async mounted() {
    this.showNavbarMenuOnMdDevices();
    await sleep(500);
    this.toggleLogoOnHome();
    this.animateLogo();
  },

  methods: {
    ...mapMutations('navigation', ['toggleNav', 'toggleLogo']),

    unfocusNavbarDropdown(event) {
      event.target.blur();
    },

    showNavbarMenuOnMdDevices() {
      if (this.isMobile) return;
      this.activeNavbar = true;
    },

    toggleLogoOnHome() {
      if (this.$route.name === 'Home') this.toggleLogo(false);
      else this.toggleLogo(true);
    },

    async animateLogo() {
      if (!this.showLogo) return;
      await this.$nextTick();

      await sleep(300);

      this.$refs.logo.showText();
    },

    onClickOutside() {
      this.hideNavbarBurgerMenu();
    },

    hideNavbarBurgerMenu() {
      this.$nextTick(() => {
        if (this.isMobile) {
          this.activeNavbar = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
    width: 100vw;

    &.navbar--is-active {
        z-index: 10000;

        @include tablet {
            z-index: 20;
        }
    }

    &-brand {
        fill: $p-gray;
        stroke: $p-gray;
        .navbar-item {
            &.is-active {
                background-color: inherit;
            }
            .script {
                transform: scale(0.7);
            }
        }
    }
    &-menu {
        // text-align: center;
        height: 100vh;

        @include tablet {
            height: auto;
        }
    }

    &-item {
        @include has-title-font;
        font-size: 1.2rem;
    }

    &-link {
        line-height: 2.5;
    }
    &-dropdown.is-right {
        @include tablet {
            height: auto;
        }
        top: -1rem;
    }
}
</style>
