<template>
    <div class="Intro"
        :class="changeBackgroundColor">
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
                    text: 'My\nname\nis\nNicolas\nRamirez\n',
                    delay: 400,
                    maxTime: 350,
                    reset: true,
                    callback: this.testingCb,
                    minTime: 80
                },
                {
                    text: 'and\nI am a\nSoftware\nDeveloper',
                    delay: 1000,
                    maxTime: 150,
                    reset: true,
                    callback: null,
                    minTime: 80
                },
                {
                    text: 'Welcome\nto my\nsite!',
                    delay: 1000,
                    maxTime: 100,
                    reset: true,
                    callback: null,
                    minTime: 80
                }
            ],
            backgroundColor: 'light'
        }
    },
    methods: {
        testingCb () {
            console.log(`Printing- - - - this.backgroundColor:`, this.backgroundColor)
            this.backgroundColor = 'dark'
        }
    },
    computed: {
        ...mapGetters([ 'showIntroStatus' ]),

        changeBackgroundColor() {
            return this.backgroundColor === 'dark' ? 'Intro__dark' : 'Intro__light'
        }
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
    height: 100%;
    font-size: 2rem;
}
.Intro__dark {
    background-color: #000;
    color: #fff;
    transition-delay: 100ms;
    transition-duration: 2100ms;
    transition-property: background-color, color;

}
.Intro__light {
    background-color: #fff;
    color: #000
}

.a__nav {
    padding: 10px;
    font-size: 0.8rem;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>