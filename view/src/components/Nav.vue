<template>
    <nav class="Nav"
        :class="navDirection">
            <div class="Nav__link">
                <router-link to="/home">Home</router-link>
            </div>
            <div class="Nav__link">
                <router-link to="/projects">Projects</router-link>
            </div>
            <div class="Nav__link">
                <router-link to="/about">About</router-link>
            </div>
            <div class="Nav__link">
                <router-link to="/">Intro</router-link>
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
                ? true : false
        }
    },
    props: {
        direction: String
    }
};
</script>

<style lang="less">
.Nav {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
}
.Nav__link {
    height: 3rem
}
</style>