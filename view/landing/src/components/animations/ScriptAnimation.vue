<template>
    <div
        class="script gray-scale-transition"
        :class="{
            'script--is-gray': isGray,
            'script--has-small-text': isSmall,
            'script--is-animated': isAnimated,
        }"
    >
        <div class="script__vectors">
            <div
                class="script__rect script__slide--right slide"
                :style="transitionOverrides"
                :class="rectClasses('slashMoreThan')"
            >
                <Slash class="script__slash" />
                <MoreThan class="script__more-than" />
            </div>
            <div
                class="script__rect script__slide--left slide"
                :style="transitionOverrides"
                :class="rectClasses('lessThan')"
            >
                <LessThan class="script__less-than" />
            </div>
        </div>

        <span class="script__text">{{ text }}</span>
    </div>
</template>

<script>
import MoreThan from '@/components/svg/MoreThan.vue';
import LessThan from '@/components/svg/LessThan.vue';
import Slash from '@/components/svg/Slash.vue';

/**
 * @typedef {Object} TransitionRule
 * @property {string} name
 * @property {string} value
 */

export default {
    name: 'ScriptAnimation',

    components: {
        MoreThan,
        Slash,
        LessThan,
    },

    props: {
        text: String,
        fill: String,
        isOpened: Boolean,
        isTransparent: Boolean,
        isSmall: Boolean,
        /**
         * @type {TransitionRule[]}
         *
         */
        transition: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        isAnimated: false,
        isGray: false,
        lessThan: {
            moveLeft: false,
            initial: false,
        },
        slashMoreThan: {
            moveRight: false,
            initial: false,
        },
    }),

    computed: {
        transitionOverrides() {
            if (this.transition.length === 0) return '';

            return this.transition.reduce((acc, rule) => `${acc} ${rule.name}: ${rule.value}; `, '').trim();
        },
    },

    mounted() {
        if (this.isOpened) {
            this.showText();
        }
    },

    methods: {
        rectClasses(svgName) {
            return {
                ...this.slideAnimationClasses(svgName),
                'script__rect--is-transparent': this.isTransparent,
            };
        },
        slideAnimationClasses(svgName) {
            return {
                'slide--initial': this[svgName].initial,
                'slide--translate-left': this[svgName].moveLeft,
                'slide--translate-right': this[svgName].moveRight,
            };
        },
        showText() {
            this.lessThan.initial = false;
            this.slashMoreThan.initial = false;
            this.lessThan.moveLeft = true;
            this.slashMoreThan.moveRight = true;
            this.$emit('text:showed');
        },
        hideText() {
            this.lessThan.initial = true;
            this.slashMoreThan.initial = true;
            this.lessThan.moveLeft = false;
            this.slashMoreThan.moveRight = false;
            this.$emit('text:hidden');
        },
        animateText() {
            this.isGray = true;
            this.isAnimated = true;
            this.$emit('text:animated');
        },
    },
};
</script>

<style lang="scss" scoped>
$script-initial-width: 200px;

.slide {
    transition: transform;
    // transition-delay: 0.5s;
    transition-timing-function: ease-in-out;
    transition-duration: 0.5s;

    &--initial {
        transform: translateX(0);
    }
    &--translate-left {
        transform: translateX(-104%);
    }
    &--translate-right {
        transform: translateX(104%);
    }
}

.script {
    position: relative;
    display: inline-block;
    font-size: 30px;
    fill: $text;
    color: $text;
    stroke: $text;
    z-index: 2;
    &--is-animated {
        transform: scale(0.8, 1) rotate(3deg);
    }
    &--has-small-text {
        font-size: 1.1rem;
    }
    &--is-gray {
        fill: $p-gray;
        stroke: $p-gray;
        color: $p-gray;
    }

    &__vectors {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 1;
    }
    &__text {
        line-height: 1;
    }
    &__rect {
        padding-top: 0.5em;
        background-color: white;
        display: flex;
        position: absolute;
        height: 1.5em;
        width: 50%;
        &--is-transparent {
            background-color: inherit;
        }
    }
    &__slide {
        &--right {
            justify-content: left;
            left: 50%;
            z-index: 2;
        }
        &--left {
            justify-content: right;
            right: 50%;
            z-index: 1;
        }
    }
    &__less-than {
        height: 0.7em;
    }
    &__slash {
        height: 1.5em;
        top: calc((1em - (1em / 2)) * -1);
        position: relative;
        right: 0.1em;
    }
    &__more-than {
        height: 0.7em;
        right: 0.4em;
        position: relative;
    }
}
</style>
