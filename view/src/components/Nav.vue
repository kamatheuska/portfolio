<template>
    <nav class="Nav">
        <div
            class="Nav__icon--container"
            @click="toggleNav()"
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
    
        <div class="Nav__container" :class="navigationClasses">
            <router-link to="/home">
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
            <router-link to="/about">
                <div class="Nav__link">
                    <span>About</span>
                </div>
            </router-link>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import WrittingMachine from '@/components/WrittingMachine'

export default {
    name: 'Nav',
    computed: {
        navigationClasses () {
            return {
                'Nav__horizontal': this.direction === 'horizontal',
                'Nav__vertical': this.direction !== 'horizontal',
                'Nav__horizontal--show': this.iconArrowInverse && this.direction === 'horizontal'
            }
        },
    },
    data () {
        return {
            iconArrowInverse: false
        }
    },
    methods: {
        toggleNav () {
            this.iconArrowInverse = !this.iconArrowInverse
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
    &__container {
        display: none;
    }
    &__small-title {
        height: 3rem;
        padding-top: 1rem;
        background-color: @portfolio-blue;
        color: @portfolio-white;
    }
    a {
        height: 100%;
        display: inline-block;
        margin-bottom: 5px;
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
        background-color: #fff;
        justify-content: center;
        align-items: center;
        transition-delay: 50ms;
        transition-duration: 800ms;
        transition-property: background-color, color;
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
            display: block;
            display: flex;
            flex-direction: column;
            height: max-content;
        }


        
        .Nav {
            background-color: @portfolio-dark-blue;
            &__link {
                background-color: @portfolio-dark-blue;
                color: #fff;
                border: none;
                min-width: 20rem;
                height: 6rem;
            }
        }
    }
    &__vertical {
        height: 70vh;
        flex-direction: column;
        min-width: 50rem;
        max-width: 80rem; 
    }
}
@media screen and (min-width : 850px) {
    .Nav {

        &__horizontal {
            height: 3rem;
            font-size: 1.4rem;
        }
        &__icon {
            display: none;
        }
        &__container {
            display: block
        }
    }
}
</style>