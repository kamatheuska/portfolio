<template>
    <nav
        class="horizontal-level level py-5"
        :class="{
            'horizontal-level--is-fixed-three': numberOfItems && numberOfItems === 3,
            'horizontal-level--is-fixed-four': numberOfItems && numberOfItems === 4,
        }"
    >
        <slot></slot>
    </nav>
</template>

<script>
/**
 * Used in conjuction of a LevelItem as slots
 */
export default {
    name: 'HorizontalLevel',

    props: {
        numberOfItems: Number,
    },
};
</script>

<style lang="scss" scoped>
.horizontal-level {
    &--is-fixed-three,
    &--is-fixed-four {
        .level-item:not(:last-child) {
            margin-bottom: 1.8rem;
        }
    }
    @include tablet {
        &--is-fixed-three,
        &--is-fixed-four {
            .level-item:not(:last-child) {
                margin-bottom: auto;
            }
        }
        &--is-fixed-four {
            & > * {
                flex-basis: 25%;
            }
        }
        &--is-fixed-three {
            & > * {
                flex-basis: 33%;
            }
        }
    }
}
</style>
