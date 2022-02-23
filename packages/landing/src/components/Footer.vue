<template>
  <footer class="footer is-size-5">
    <div class="columns container">
      <div class="column">
        <div class="content">
          <div class="footer__logo pl-5">
            <router-link to="/">
              <ScriptAnimation
                ref="logo-footer"
                :is-transparent="true"
                :is-opened="true"
                text="PORTFOLIO"
                :is-dark="true"
              />
            </router-link>
          </div>
          <p class="">
            © Nicolas Ramirez.
          </p>
          <p class="">
            Source code for this website can be found on
            <a
              href="https://github.com/kamatheuska/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </p>
          <p class="">
            Barcelona, 2022
          </p>
        </div>
      </div>
      <div class="column">
        <ContactCard :show-title="true" />
      </div>
    </div>
  </footer>
</template>

<script>
import ScriptAnimation from '@/components/animations/ScriptAnimation.vue';
import ContactCard from '@/components/ContactCard.vue';

export default {
  components: {
    ScriptAnimation,
    ContactCard,
  },
};
</script>

<style lang="scss" scoped>
.footer {
    @include has-title-font;

    &__logo {
        @include has-title-font;
        padding: 1rem 0;
    }
}
</style>
