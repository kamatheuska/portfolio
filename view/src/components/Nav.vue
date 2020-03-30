<template>
    <nav
        class="Nav" 
        @click="toggleNav()"
    >
        <div
            class="Nav__icon--container"
        >   
            <svg
                class="Nav__icon"
                :class="{ 'Nav__icon--inverse': this.iconArrowInverse }"  
                viewBox="0 0 512.011 512.011"
                style="enable-background:new 0 0 512.011 512.011;"
            >
                    <path
                    class="icon__arrow-down"
                    d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0
                        s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667
                        C514.096,145.416,514.096,131.933,505.755,123.592z"/>
            </svg>
        </div>
        <transition name="fade">
            <div
                v-if="showNav"
                class="Nav__container"
                :class="navigationClasses"
                v-click-outside="onClickOutside"
            >
                <router-link to="/home" class="Nav__a--first">
                    <div class="Nav__link">
                        <span>Home</span>
                    </div>
                </router-link>
                <span class="Nav__small-title">Projects</span>
                <router-link to="/projects/writtingMachine">
                    <div class="Nav__link">
                        <span>Writting Machine</span>
                    </div>
                </router-link>
                <router-link to="/projects/drumMachine">
                    <div class="Nav__link">
                        <span>Drum Machine</span>
                    </div>
                </router-link>
                <router-link to="/about">
                    <div class="Nav__link">
                        <span>About</span>
                    </div>
                </router-link>
            </div>
        </transition>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import WrittingMachine from '@/components/WrittingMachine'
import vClickOutside from 'v-click-outside'

export default {
    name: 'Nav',
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        navigationClasses () {
            return {
                'Nav__horizontal': this.direction === 'horizontal',
                'Nav__horizontal--show': this.iconArrowInverse && this.direction === 'horizontal'
            }
        },
        showNav () {
            return this.iconArrowInverse
        }
    },
    data () {
        return {
            iconArrowInverse: false
        }
    },
    methods: {
        toggleNav () {
            this.iconArrowInverse = !this.iconArrowInverse
        },

        onClickOutside (event) {
            this.toggleNav()
        }
    },
    props: {
        direction: String
    }
};
</script>

<style lang="less">
.Nav {
    font-family: 'Roboto', sans-serif;
    height: 3rem;
    width: 100vw;
    background-color: @portfolio-dark-blue;
    position: relative;
    font-size: 1.2rem;

    &__small-title {
        height: 2rem;
        padding-top: .3rem;
        background-color: @portfolio-blue;
        color: @portfolio-white;
    }
    &__a--first {
        margin-top: 2rem;
    }
    
    a {
        display: inline-block;
    }
    &__icon {
        height: 2rem;
        display: inline-block;

        &--container {
            right: 1rem;
            top: .5rem;
            position: absolute;
        }
        .icon__arrow-down {
            fill: @portfolio-white;
            stroke: @portfolio-white;
        }
        &--inverse {
            transform: rotateX(180deg);
        }
    }

    &__link {
        display: flex;
        height: 100%;
        border: 2px solid @portfolio-dark-blue;
        justify-content: center;
        align-items: center;
        background-color: @portfolio-dark-blue;
        color: #fff;
        border: none;
        height: 5rem;
        &:focus,
        &:hover {
            background-color: @portfolio-dark-blue;
            border: 2px solid #fff;
            color: #fff;
        }

    }
    &__horizontal {
        display: none;
        &--show {
            display: flex;
            flex-direction: column;
            height: max-content;
        }
        .Nav {
            &__link {
            }
        }
    }
}
@media screen and (min-width : 850px) {
    .Nav {
        padding-left: 2rem; 
        padding-right: 2rem;
        display: flex;
        justify-content: center;
        &__horizontal {
            flex-basis: 50%;
            height: max-content;
            font-size: 1.4rem;
        }
        &__icon {
            display: block;
        }
    }
}
</style>