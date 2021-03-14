<template>
    <v-container class="fallback fill-height" fluid>
        <v-row>
            <v-col align="center">

                <div class="fallback__greeting">
                    <h1>Welcome to my website</h1>
                    <p>I am a software developer</p>
                    <!-- <p>Click on the top bar to see my projects</p> -->
                    <br>
                    <br>
                    <p><strong>...in maintenance for now...</strong></p>
                </div>

            </v-col>
        </v-row>
        <Bubbles />
    </v-container>
</template>

<script>
import Bubbles from '@/components/Bubbles.vue'

export default {
    name: 'Fallback',

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

.fallback {
    font-size: 1.4rem;
    position: relative;
    &__greeting {
        color: $portfolio-dark-blue;
        padding: 3rem 6rem;
    }
}


</style>
