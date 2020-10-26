<template>
    <div class="home">
        <div class="home__greeting">
            <h1>Welcome to my website</h1>
            <p>I am a software developer</p>
            <!-- <p>Click on the top bar to see my projects</p> -->
            <br>
            <br>
            <p><strong>...in maintenance for now...</strong></p>
        </div>
        <div
            class="bubble__container"
            :style="bubbleStyle(bubble)"
            v-for="(bubble, index) in bubbles"
            :key="`bubble${index}`"
        >
            <span class="bubble"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            bubble: {
                coordinates: {
                    x: '',
                    y: ''
                },
                height: ''
            },
            bubbles: []
        }
    },
    created () {
        this.$store.dispatch('setCurrentProject', '')
        let counter = 0
        this.recursiveBubbles(counter)
    },
    methods:{
        recursiveBubbles (counter) {
            const bubble = this.generateBubble()
            this.bubbles.push(bubble)
            counter++
            setTimeout(() => {
                if (counter <= 100) {
                    this.recursiveBubbles(counter)
                }
            }, 200);
        },
        randomNumber (max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomDecimal () {
            return Math.floor(Math.random() * 100) / 100;
        },
        generateBubble () {
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight
            const coordinates = {
                x: this.randomNumber(windowWidth, 10),
                y: this.randomNumber(windowHeight, 10)
            }

            return {
                coordinates,
                height: this.randomNumber(4, 1) + this.randomDecimal()
            }
        },
        bubbleStyle (bubble) {
            return `
                height: ${bubble.height}rem;
                width: ${bubble.height}rem;
                top: ${bubble.coordinates.y}px;
                left: ${bubble.coordinates.x}px;
            `
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    font-size: 1.4rem;
    width: 100%;
    height: max-content;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__greeting {
        color: @portfolio-dark-blue;
        padding: 3rem 6rem;
    }
}
.bubble {
    border-radius: 50%;
    animation-duration: 0.9s;
    animation-name: burst;
    &__container {
        position: absolute;
        top:0;
        left:0;
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -10;
    }
}

@keyframes burst {
    from {
        height: 0rem;
        width: 0rem;
        background-color: @portfolio-dark-blue;
    }
    to {
        height: 100%;
        width: 100%;
        background-color: lighten(@portfolio-dark-blue, 40%);
    }
}

</style>
