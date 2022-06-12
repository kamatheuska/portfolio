<template>
  <div class="contact-card">
    <div class="content block">
      <h4
        v-if="showTitle"
        class="title is-5"
      >
        Contact
      </h4>
      <ul>
        <li>
          <a href="mailto:nicolas@matizlab.com">
            <div class="icon-text">
              <span class="icon has-text-info">
                <ion-icon name="mail" />
              </span>
              <span>nicolas@matizlab.com</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="content block">
      <h4 class="title is-5">
        Social
      </h4>
      <ul class="is-flex">
        <li
          v-for="(item, i) in social"
          :key="`${parent}-social-link-${i}`"
          class="mr-2"
        >
          <a
            :href="item.link"
            target="_blank"
            :aria-label="item.title"
          >
            <span
              aria-hidden="true"
              class="icon has-text-primary"
            >
              <ion-icon :name="item.iconName" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: 'root',
    },
    showTitle: Boolean,
  },
  data: () => ({
    social: [
      {
        link: 'https://www.linkedin.com/in/nicolasramirezdev',
        title: 'Link to LinkedIn Profile',
        iconName: 'logo-linkedin',
      },
      {
        link: 'http://www.instagram.com/nicoramirezdev',
        title: 'Link to Instagram Profile',
        iconName: 'logo-instagram',
      },
      {
        link: 'https://www.github.com/kamatheuska',
        title: 'Link to Github Profile',
        iconName: 'logo-github',
      },
      {
        link: 'https://stackoverflow.com/u/7868769',
        title: 'Link to Stackoverflow Profile',
        iconName: 'logo-stackoverflow',
      },
    ],
  }),
};
</script>
