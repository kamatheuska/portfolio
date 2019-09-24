<template>
    <div class="Intro"
        :class="introColor">
        <nav class="Intro__nav" >
            <router-link v-show="isIntroDone" to="/home">Skip intro</router-link>
            <router-link to="/projects">Projects</router-link>
        </nav>
        <WrittingMachine
            :v-if="isIntroDone"
            :textToType="textForIntro"
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
                    maxTime: 250,
                    reset: true,
                    callback: this.changeBackgroundColor,
                    minTime: 80
                },
                {
                    text: 'and\nI am a\nSoftware\nDeveloper',
                    delay: 1000,
                    maxTime: 150,
                    reset: true,
                    callback: this.changeBackgroundColor,
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
        changeBackgroundColor () {
            switch (this.backgroundColor) {
                case 'dark':
                    this.backgroundColor = 'light'
                    break;
                case 'light':
                    this.backgroundColor = 'dark'
                    break;
            }
        }
    },
    computed: {
        ...mapGetters([ 'isIntroDone' ]),

        introColor() {
            switch (this.backgroundColor) {
                case 'dark':
                    return 'Intro__dark'
                default:
                    return 'Intro__light'
            }
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
    transition-delay: 100ms;
    transition-duration: 2100ms;
    transition-property: background-color, color;
}
.Intro__dark {
    background-color: #2c3e50;
    color: #fff;

}
.Intro__light {
    background-color: #fff;
    color: #2c3e50;
}

.Intro__nav {
    padding: 10px;
    font-size: 0.8rem;
    a {
        font-weight: bold;
        text-decoration: none;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>