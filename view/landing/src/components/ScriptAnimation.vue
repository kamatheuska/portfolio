<template>
    <div class="script gray-scale-transition" :class="{ 'script--animated-gray': isScriptAnimatedGray }">
        <div class="script__vectors">
            <div class="script__rect script__slide--right slide" :class="slideAnimationClasses('slashMoreThan')">
                <Slash class="script__slash" />
                <MoreThan class="script__more-than" />
            </div>
            <div class="script__rect script__slide--left slide" :class="slideAnimationClasses('lessThan')">
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

export default {
    name: 'ScriptAnimation',

    components: {
        MoreThan,
        Slash,
        LessThan,
    },

    props: {
        text: String,
    },

    data() {
        return {
            isScriptAnimatedGray: false,
            lessThan: {
                moveLeft: false,
                initial: false,
            },
            slashMoreThan: {
                moveRight: false,
                initial: false,
            },
            logo: {
                textBlocks: {
                    name: {
                        text: 'nicolas ramirez',
                        show: true,
                    },
                    profesion: {
                        text: 'software developer',
                        show: false,
                    },
                },
            },
        };
    },
    methods: {
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
        },
        hideText() {
            this.lessThan.initial = true;
            this.slashMoreThan.initial = true;
            this.lessThan.moveLeft = false;
            this.slashMoreThan.moveRight = false;
        },
        animateText() {
            this.isScriptAnimatedGray = true;
        },
    },
};
</script>

<style lang="scss" scoped>
$script-initial-width: 200px;

.slide {
    transition: transform;
    transition-delay: 0.5s;
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
    &--animated-gray {
        fill: #ddd;
        stroke: #ddd;
        transform: scale(0.8, 1) rotate(3deg);
        color: #ddd;
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
        // border: solid 1px black;
        display: flex;
        position: absolute;
        height: 1.3em;
        width: 50%;
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
