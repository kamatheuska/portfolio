<template>
    <div class="bubbles">
        <Bubble
            v-for="(bubble, index) in bubbles"
            :key="`bubble${index}`"
            :diameter="bubble.diameter"
            :coordinates="bubble.coordinates"
        />
    </div>
</template>

<script>
import Bubble from '@/components/Bubble.vue';

export default {
    components: {
        Bubble
    },


    data() {
        return {
            bubbles: [],
            counter: 0,
            windowWidth: 0,
            windowHeight: 0
        }
    },

    created() {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        this.initRecursiveBubbles()
    },

    methods: {

        initRecursiveBubbles () {
            const bubble = this.generateBubble()
            this.bubbles.push(bubble)
            this.counter++
            setTimeout(() => {
                if (this.counter <= 100) {
                    this.initRecursiveBubbles()
                }
            }, 200);
        },
        randomInteger (max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomDecimal () {
            return Math.floor(Math.random() * 100) / 100;
        },
        generateBubble () {
            const coordinates = {
                x: this.randomInteger(this.windowWidth, 10),
                y: this.randomInteger(this.windowHeight, 10)
            }

            return {
                coordinates,
                diameter: this.randomInteger(4, 1) + this.randomDecimal()
            }
        },
    }
}
</script>