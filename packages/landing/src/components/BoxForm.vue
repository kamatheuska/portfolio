<template>
  <section class="box-form p-5">
    <form
      class="box-form__form box p-5 m-4"
      @submit.prevent="$emit('submit')"
    >
      <slot name="description">
        <p
          v-if="description"
          class="block"
        >
          {{ description }}
        </p>
      </slot>
      <slot />

      <button
        class="button is-primary"
        type="submit"
        :disabled="disableSubmit"
      >
        {{ submitButtonText }}
      </button>
    </form>
    <slot name="preview" />
  </section>
</template>

<script>
export default {
  name: 'BoxForm',

  props: {
    description: String,
    submitButtonText: {
      type: String,
      default: 'Send',
    },
    disableSubmit: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit'],
};
</script>

<style lang="scss" scoped>
.box-form {
    @include tablet {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    &__form {
        @include tablet {
            width: 40rem;
        }
    }
}
</style>
