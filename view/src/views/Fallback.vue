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
        <Bubbles />
    </div>
</template>

<script>
import Bubbles from '@/components/Bubbles.vue'

export default {
    name: 'Home',

    components: {
        Bubbles
    },
    
    created () {
        this.$store.dispatch('setCurrentProject', '')
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/color';

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
        color: $portfolio-dark-blue;
        padding: 3rem 6rem;
    }
}


</style>
