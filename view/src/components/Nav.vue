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
}
.Nav__link {
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-delay: 50ms;
    transition-duration: 800ms;
    transition-property: background-color, color;

}
.Nav__link:hover {
    background-color: #2c3e50;
    color: #fff;
}
.Nav__horizontal {
    height: 5rem;
    padding: 15px 0;
    justify-content: space-evenly;
    width: 100%;
    flex-direction: row;
}
.Nav__vertical {
    height: 3rem;
    padding: 10px 0;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}
</style>