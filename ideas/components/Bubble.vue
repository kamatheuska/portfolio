<template>
        <div
            class="bubble"
            :style="bubbleStyle"
        >
            <span class="bubble__drop"></span>
        </div>
</template>

<script>

export default {
    name: 'Bubble',

    props: {
        diameter: {
            type: Number,
            required: true
        },
        coordinates: {
            type: Object,
            required: true
        }
    },

    computed: {

        bubbleStyle () {
            return `
                height: ${this.diameter}rem;
                width: ${this.diameter}rem;
                top: ${this.coordinates.y}px;
                left: ${this.coordinates.x}px;
            `
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/animations';

.bubble {

    position: absolute;
    top:0;
    left:0;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    &__drop {
        border-radius: 50%;
        animation-duration: 0.9s;
        animation-name: burst;
    }
}
</style>