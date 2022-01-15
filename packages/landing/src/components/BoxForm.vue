<template>
    <section class="box-form p-5">
        <form class="box-form__form box p-5 m-4" @submit.prevent="$emit('submit')">
            <slot name="description">
                <p class="block" v-if="description">
                    {{ description }}
                </p>
            </slot>
            <slot></slot>

            <button class="button is-primary" type="submit" :disabled="disableSubmit">
                {{ submitButtonText }}
            </button>
        </form>
        <slot name="preview"></slot>
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
