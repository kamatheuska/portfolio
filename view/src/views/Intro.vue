<template>
    <div class="Intro">
        <nav class="a__nav" v-show="showIntroStatus">
            <router-link to="/home">Skip intro</router-link>
        </nav>
        <WrittingMachine
            :textToType=textForIntro
            />
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import WrittingMachine from '@/components/WrittingMachine'

export default {
    name: 'Intro',
    data() {
        return {
            textForIntro: [
                {
                    text: 'My\nname\nis\nNicolas\nRamirez',
                    delay: 1000
                },
                {
                    text: 'and\nI am a\nSoftware\nDeveloper',
                    delay: 1000
                },
                {
                    text: 'Welcome\nto my\nsite!',
                    delay: 1000
                }
            ]
        }
    },
    computed: {
        ...mapGetters([ 'showIntroStatus' ])
    },
    components: {
        WrittingMachine
    }
};
</script>

<style lang="less">

.Intro {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%
}

.a__nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>