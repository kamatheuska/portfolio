<template>
    <nav class="Nav">
        <div class="Nav__container" :class="navDirection">
            <router-link to="/home">
                <div class="Nav__link">
                    <span>Home</span>
                </div>
            </router-link>
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
    name: 'Intro',
    computed: {
        ...mapGetters([ 'isIntroDone' ]),
        navDirection () {
            return this.direction === 'horizontal'
                ? 'Nav__horizontal'
                : 'Nav__vertical'
        }
    },
    props: {
        direction: String
    }
};
</script>

<style lang="less">
.Nav {
    display: flex;
    align-items: center;
    justify-content: center;
    &__container {
        display: flex;
    }
    a {
        height: 100%;
        display: inline-block;
        margin-bottom: 5px;
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
        height: 3rem;
        justify-content: space-evenly;
        width: 100%;
        background-color: @portfolio-dark-blue;
        font-size: 1.4rem;
        flex-direction: row;
        padding-right: 10rem; 
        padding-left: 10rem;
        border-bottom: 2px solid @portfolio-dark-blue;

        .Nav {
            &__link {
                color: #fff;
                background-color: @portfolio-dark-blue;
                border: none;
                min-width: 20rem;
            }
        }
    }
    &__vertical {
        font-size: 2rem;
        height: 70vh;
        flex-direction: column;
        min-width: 50rem;
        max-width: 80rem; 
    }
}
</style>