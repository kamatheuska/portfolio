<template>
  <header class="page-header">
    <h1
      class="title is-3 my-5"
      :class="{
        'has-text-centered': isCentered
      }"
    >
      {{ title }}
    </h1>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      default: '',
    },
    isCentered: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.page-header {
    padding-left: 1rem;
    @include tablet {
        padding-left: 0;
    }
}
</style>
