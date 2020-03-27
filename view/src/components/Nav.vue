<template>
    <nav class="Nav"
        :class="navDirection">
            <router-link to="/home">
                <div class="Nav__link">
                    <span>Home</span>
                </div>
            </router-link>
            <router-link to="/projects">
                <div class="Nav__link">
                    <span>Projects</span>
                </div>
            </router-link>
            <router-link to="/about">
                <div class="Nav__link">
                    <span>About</span>
                </div>
            </router-link>
            <router-link to="/">
                <div class="Nav__link">
                    <span>Intro</span>
                </div>
            </router-link>
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
    font-size: 1.2rem;
    align-items: stretch;
    a {
        height: 100%;
        display: inline-block;
        margin-bottom: 5px;
    }
    &__link {
        display: flex;
        height: 100%;
        border: 2px solid #2c3e50;
        justify-content: center;
        align-items: center;
        transition-delay: 50ms;
        transition-duration: 800ms;
        transition-property: background-color, color;
        &:focus,
        &:hover {
            background-color: #2c3e50;
            border: 2px solid #fff;
            color: #fff;
        }

    }
    &__horizontal {
        height: 9rem;
        justify-content: space-evenly;
        width: 100%;

        flex-direction: row;
        padding-right: 10rem; 
        padding-left: 10rem;
        border-bottom: 2px solid #2c3e50;


        .Nav {
            &__link {
                border: none;
                min-width: 20rem;
            }
        }
    }
    &__vertical {
        flex-direction: column;
        justify-content: space-evenly;
        height: 70%;
        justify-content: stretch;
        padding-right: 10rem; 
        padding-left: 10rem;
    }
}
</style>