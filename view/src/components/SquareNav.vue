<template>
    <div class="square-nav">
        <router-link
            class="square-nav__link"
            :to="link"
            :style="linkStyles"
            :class="{
                'square-nav__link--is-right': isRight,
                'square-nav__link--is-left': !isRight,
            }"
        >
            <div
                class="square-nav__box"
                :style="boxStyles"
                :class="{
                    'square-nav__box--is-darker': isRight,
                }"
            >
                <slot></slot>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SquareNav',
    props: {
        link: {
            type: String,
            default: '',
        },
        isRight: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number,
            default: 0,
        },
        index: {
            type: Number,
            default: null,
        },
        top: {
            type: Number,
            default: 20,
        },
        left: {
            type: Number,
            default: 20,
        },
        color: {
            type: String,
            required: true,
        },
        isFirst: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        boxStyles() {
            return `
                min-height: ${this.height}px;
                background-color: ${this.color};
                opacity: 0.5;

            `;
        },
        linkStyles() {
            return `
                top: ${this.top}px;
                left: ${this.left}px;
            `;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/derived-variables';
.square-nav {
    border: 1px dashed #ccc;
    &__link {
        position: relative;
        transition: top 0.3s ease-in, left 1s ease-in;
        top: 0;
        &--is-left {
            left: 2rem;
        }
        &--is-right {
            right: 2rem;
        }
    }

    &__box {
        -webkit-box-shadow: 4px 7px 7px -2px rgba(0, 0, 0, 0.8);
        box-shadow: 4px 7px 7px -2px rgba(0, 0, 0, 0.8);

        border-radius: 10px;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 0;
        color: white;

        &--is-darker {
        }
        &:hover {
        }
    }
}
</style>
